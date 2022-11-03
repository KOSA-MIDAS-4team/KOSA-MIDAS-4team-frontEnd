import styled from "styled-components"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios"
import { format } from "date-fns";
const Header = () => {
    const [IsCommuted, setIsCommuted] = useState(true);
    const [todayInfo, setTodayInfo] = useState({});
    const imgSrc = '';
    async function commute() {
        await axios.post("http://13.209.36.143:8081/commute?where=HOME", {}, {headers: {
                Authorization: localStorage.getItem("accessToken"),
            }}
        )
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    async function quite() {
        await axios.put("http://13.209.36.143:8081/commute", {}, {headers: {
                Authorization: localStorage.getItem("accessToken"),
            }}
        )
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
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
            if(res.data.startedAt === res.data.endedAt || res.data.startedAt === undefined){
                setIsCommuted(false)
            }
            else{
                setIsCommuted(true)
            }
        })
    }, []);
    return (
        <HeaderContainer>
            <Items>
                <Logo>CMMS</Logo>
                {!IsCommuted ?
                    <>
                        <CommuteButton color="#8CE99A" onClick={commute}>출근</CommuteButton>
                        <TimeBox></TimeBox>
                    </>
                    :
                    <>
                        <CommuteButton color="#FF6B6B" onClick={quite}>퇴근</CommuteButton>
                        <TimeBox>출근한지&nbsp;&nbsp;01:20:30</TimeBox>
                    </>}
                <Nav>
                    <Link>
                        출근 인원
                    </Link>
                </Nav>
                <User src={imgSrc === '' ? 'https://audition.hanbiton.com/images/common/img_default.jpg' : imgSrc}></User>
            </Items>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 95px;
    position: fixed;
    top: 0;
    border-bottom: 2px solid #E2E2E2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    z-index: 7;
`

const Items = styled.div`
    width: 64%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;  
`

const Logo = styled.div`
    font-size: 60px;
    font-weight: 700;
    color: #6C63FF;
`



const CommuteButton = styled.button`
    width: 130px;
    height: 55px;
    color: white;
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    background: ${(props) => (props.color)};
    border-radius: 8px;
    border: none;
`

const TimeBox = styled.div`
    font-weight: 400;
    font-size: 30px;
`

const Nav = styled.div`
    a{
        text-decoration: none;
        color: black;
    }
`

const User = styled.img`
    border-radius: 50%;
    width: 3vw;
    height: 3vw;
`
export default Header;