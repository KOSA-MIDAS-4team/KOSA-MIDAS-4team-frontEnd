import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse, format } from 'date-fns';
import { useEffect, useLayoutEffect, useState } from 'react';
import "./cells.style.css";
import axios from "axios"

const Cells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;

            // console.log(`${format(day, "yyyy")}-${format(day, "M")}-${formattedDate}`)
            days.push(
                <Day key={day} day={day} currentMonth={currentMonth} selectedDate={selectedDate} cloneDay={cloneDay} formattedDate={formattedDate} monthStart={monthStart}></Day>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }

    return <div className="body">{rows}</div>;
};

const Day = (props) => {
    const [workTime, setWorkTime] = useState({});
    
    useLayoutEffect(() => {
        async function draw() {
            if (isSameMonth(props.day, props.monthStart)) {
                var today = props.formattedDate
                if (today.length === 1) {
                    today = '0' + today;
                }
                const requestDay = `${format(props.day, "yyyy")}-${format(props.day, "M")}-${today}`
                // console.log(requestDay);
                await axios
                    .get(`http://13.209.36.143:8081/user/date?date=${requestDay}`, {
                        headers: {
                            Authorization: localStorage.getItem("accessToken"),
                        }
                    })
                    .then((res) => {
                        if(res.data.startedAt !== res.data.endedAt){
                            console.log(res.data.startedAt + " "+ res.data.endedAt + " " + requestDay);
                        }
                        setWorkTime(res.data)
                    })

                    .catch((err) => {
                        throw new Error(err);
                    });
            }
        }
        draw();
    }, []);
    // console.log(workTime.startedAt + " asd");
    return (
        <div
            className={`col cell ${!isSameMonth(props.day, props.monthStart)
                ? 'disabled'
                : isSameDay(props.day, props.selectedDate)
                    ? 'selected'
                    : 'valid'
                }`}
            key={props.day}
        >
            <span
                className={
                    format(props.currentMonth, 'M') !== format(props.day, 'M')
                        ? 'text not-valid'
                        : ''
                }
            >
                {props.formattedDate}

            </span>
            {workTime.startedAt !== undefined ? <><div>
                {workTime.startedAt !== undefined ? `출근시간 ${workTime.startedAt.substring(11)}` : <></>}
            </div>
                
                    {workTime.endedAt !== undefined && workTime.startedAt !== workTime.endedAt ? <div>퇴근시간 {workTime.endedAt.substring(11)}</div> : <></>}
                </>
                : <></>}

        </div>
    )
}

export default Cells