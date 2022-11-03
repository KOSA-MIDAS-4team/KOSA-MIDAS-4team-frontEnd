import styled from "styled-components"     
import { Link } from "react-router-dom"
import { useState } from "react";

const Header = () => {
    const [IsCommuted, setIsCommuted] = useState(false);
    const imgSrc  = '';
    return (
        <HeaderContainer>
            <Items>
                <Logo>CMMS</Logo>
                {!IsCommuted ?
                <>
                <CommuteButton color="#8CE99A" onClick={() => {setIsCommuted(!IsCommuted)}}>출근</CommuteButton> 
                <TimeBox></TimeBox>
                </>
                : 
                <>
                <CommuteButton color="#FF6B6B" onClick={() => {setIsCommuted(!IsCommuted)}}>퇴근</CommuteButton>
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