import styled from 'styled-components'
import Header from '../components/common/header';
import { format, addMonths, subMonths } from "date-fns";
import { useState } from 'react';
import Days from '../components/Calender/days';
import Cells from '../components/Calender/Cells/cells';
import { MdOutlineNavigateNext } from "react-icons/md"
import { MdOutlineNavigateBefore } from "react-icons/md";

const Main = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const onDateClick = (day) => {
        setSelectedMonth(day);
    };
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    return (
        <>
        <Header />
        <MainContainer>
            <CalenderContainer>
                <CalenderHeader>
                    <DateBox>
                        <Month>{format(currentMonth, "M")}월</Month>
                        <Year>{format(currentMonth, "yyyy")}</Year>
                    </DateBox>
                    <Buttons>
                        <MdOutlineNavigateBefore size={"3vw"} color={"#6C63FF"} onClick={prevMonth} />
                        <MdOutlineNavigateNext size={"3vw"} color={"#6C63FF"} onClick={nextMonth} />
                    </Buttons>
                </CalenderHeader>
                
                <Days />
                <Cells currentMonth={currentMonth} selectedDate={selectedMonth} onDateClick={ondblclick} />
            </CalenderContainer>
        </MainContainer>
        </>
    )
}

const MainContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 95px);
    margin-top: 95px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CalenderContainer = styled.div`
    width: 70%;
    height: 90%;
    /* background-color: blue; */
`
const CalenderHeader = styled.div`
    width: 91%;
    display: flex;
    justify-content: space-between;
    margin: auto;
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
`

const DateBox = styled.div`
    display: flex;
    align-items: center;
`

const Month = styled.div`
    font-size: 4vw;
    color: #6C63FF;
`
const Year = styled.div`
    font-size: 2vw;
    color: #6C63FF;
`

export default Main;