import { useState } from "react";
import styled from "styled-components"

const Days = () => {
    const [date, setDate] = useState(['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat']);
    return (
        <DaysRow>
        {date.map((data, index) => (
            <DayBox>{data}</DayBox>
        ))
        }
        </DaysRow>
    )
}

const DaysRow = styled.div`
    width: 100%;
    height: 7%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2%;
`

const DayBox = styled.div`
    width: 74%;
    text-align: center;
    font-size: 1.5vw;
`

export default Days;