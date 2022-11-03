import axios from "axios";
import { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../components/common/header"

const CommutedList = () => {
    const [list, setList] = useState([]);
    const [allCount, setAllCount] = useState();
    const [commutedCount, setCommutedCount] = useState();
    useEffect(() => {
        axios.get("http://13.209.36.143:8081/user/list", {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            }})
        .then(res => {
            console.log(res.data);
            setList(res.data.data);
            setCommutedCount(res.data.count);
        })
        axios.get("http://13.209.36.143:8081/user/all", {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            }})
        .then(res => {
            console.log(res.data.count);
            setAllCount(res.data.count);
        })
    }, []);
    return(
        <>
        <Header>
            
        </Header>
        <Container>
                <Title>현재 출근 중인 직원 명단&nbsp;&nbsp;&nbsp;{commutedCount} / {allCount}</Title>
                {list.map((data, index) => (
                    <UserBox>
                        <Img src={data.imgUrl}></Img>
                        <NameBox>{data.name}</NameBox>
                        <DepartmentBox>({data.department})</DepartmentBox>
                    </UserBox>
                ))}
         </Container>
        </>
    )
}



const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 95px);
    margin-top: 95px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title = styled.div`
    font-size: 3vw;
    font-weight: bold;
    margin-top: 4%;
`
const UserBox = styled.div`
    width: 350px;
    height: 90px;
    background-color: black;
    display: flex;
    align-items: center;
    margin-top: 2%;
    border-radius: 20px;
`
const Img = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 20px;
`
const NameBox = styled.div`
    font-size: 20px;
    margin-left: 10px;
    font-weight: bold;
    color: white;
`
const DepartmentBox = styled.div`
    color:white;
`

export default CommutedList;