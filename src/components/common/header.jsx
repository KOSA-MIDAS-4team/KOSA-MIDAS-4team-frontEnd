import styled from "styled-components"
import { Link } from "react-router-dom"
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios"
import { format } from "date-fns";
const Header = () => {
    const [IsCommuted, setIsCommuted] = useState(false);
    const [startedAt, setStartedAt] = useState("");
    const [user, setUser] = useState({});
    const [nowTime, setNowTime] = useState(Date.now());
    const [flowTime, setFlowTime] = useState("0시간 0분 0초");
    const [isLoading, setIsLoading] = useState(true);
    async function commute() {
        await axios.post("http://13.209.36.143:8081/commute?where=HOME", {}, {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            }
        }
        )
            .then(res => {
                setStartedAt(res.data);
                window.location.replace("/")
            })
            .catch(err => {
                console.log(err);
            })
    }
    async function quite() {
        let confirmed;
        console.log(7 - parseInt(flowTime[0]) + "시간" + " " + 60 - parseInt(flowTime.slice(4, 6)) + "분" + " 미달했습니다. 퇴근하시겠습니까?");
        if (parseInt(parseInt(flowTime[0])) >= 8) {
            const time = (parseInt(flowTime[0]) - 8)
            const m = (parseInt(flowTime.slice(4, 6)))
            confirmed = window.confirm(time + "시간" + " " + m + "분" + " 초과했습니다. 퇴근하시겠습니까?");
        }
        else {
            const time = (7 - parseInt(flowTime[0]))
            const m = (60 - parseInt(flowTime.slice(4, 6)))
            confirmed = window.confirm(time + "시간" + " " + m + "분" + " 미달했습니다. 퇴근하시겠습니까?");
        }

        if (confirmed) {
            await axios.put("http://13.209.36.143:8081/commute", {}, {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                }
            }
            )
                .then(res => {
                    console.log(res.data);
                    window.location.replace("/")
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    useLayoutEffect(() => {
        setIsLoading(true)
        axios.get("http://13.209.36.143:8081/user", {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            }
        })
            .then(res => {
                console.log(res.data)
                setUser(res.data);
            })
        const nowDate = new Date();
        var today = format(nowDate, "d");
        if (today.length === 1) {
            today = '0' + today;
        }
        const requestDay = `${format(nowDate, "yyyy")}-${format(nowDate, "M")}-${today}`
        console.log(requestDay);
        axios.get(`http://13.209.36.143:8081/user/date?date=${requestDay}`, {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            }
        })
            .then(res => {
                if (res.data.startedAt === res.data.endedAt && res.data.startedAt !== undefined) {
                    setIsCommuted(true)
                }
                else {
                    setIsCommuted(false)
                }
            })
        setIsLoading(false)
        const interval = setInterval(() => {
            const nowDate = new Date();
            let st;
            var today = format(nowDate, "d");
            if (today.length === 1) {
                today = '0' + today;
            }
            const requestDay = `${format(nowDate, "yyyy")}-${format(nowDate, "M")}-${today}`
            console.log(requestDay);
            axios.get(`http://13.209.36.143:8081/user/date?date=${requestDay}`, {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                }
            })
                .then(res => {
                    if (res.data.startedAt === res.data.endedAt && res.data.startedAt !== undefined) {
                        setIsCommuted(true)
                        console.log("hear");
                        setStartedAt(res.data.startedAt);
                        st = res.data.startedAt;
                        console.log(res.data.startedAt + "h");
                        const now = new Date();
                        console.log(now);
                        const startTime = new Date(st.replace('T', ' '));
                        console.log(startedAt);
                        let duration = now.getTime() - startTime.getTime();
                        console.log(duration)
                        setFlowTime(parseInt((duration / (1000 * 60)) / 60) + "시간" + " " + parseInt((duration / (1000 * 60)) % 60) + "분" + " " + parseInt((duration / 1000) % 60) + "초");
                        console.log(parseInt((duration / (1000 * 60)) / 60) + "시간" + " " + parseInt((duration / (1000 * 60)) % 60) + "분" + " " + parseInt((duration / 1000) % 60) + "초");
                    }
                    else {
                        setIsCommuted(false)
                    }
                })

        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <>
        {!isLoading ? 
            <HeaderContainer>
            <Items>
                <Link style={{ textDecoration: "none" }} to="/"><Logo>CMMS</Logo></Link>
                {!IsCommuted ?
                    <>
                        <CommuteButton color="#8CE99A" onClick={commute}>출근</CommuteButton>
                        <TimeBox></TimeBox>
                    </>
                    :
                    <>
                        <CommuteButton color="#FF6B6B" onClick={quite}>퇴근</CommuteButton>
                        <TimeBox>출근한지&nbsp;&nbsp;{flowTime}</TimeBox>
                    </>}
                <Nav>
                    <Link>
                        출근 인원
                    </Link>
                </Nav>
                <UserBox>
                    <Link to="/myPage"><User src={user.imgUrl === null ? 'https://audition.hanbiton.com/images/common/img_default.jpg' : user.imgUrl}></User></Link>
                    {user.name}
                </UserBox>
            </Items>
        </HeaderContainer>
        :
        <></>
        }
    </>
    )
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 95px;
  position: fixed;
  top: 0;
  border-bottom: 2px solid #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 7;
`;

const Items = styled.div`
  width: 64%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 60px;
  font-weight: 700;
  color: #6c63ff;
`;

const CommuteButton = styled.button`
  width: 130px;
  height: 55px;
  color: white;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  background: ${(props) => props.color};
  border-radius: 8px;
  border: none;
`;

const TimeBox = styled.div`
  font-weight: 400;
  font-size: 30px;
`;

const Nav = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
`;

const User = styled.img`
    border-radius: 50%;
    width: 3vw;
    height: 3vw;
    margin-bottom: 5px; 
`
const UserBox = styled.div`
    display: flex;
    flex-direction: column;
`

export default Header;

