import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getReaminTime } from '../../utils/api/reaminTime/reaminTime';

const WeekWorkinghours = () => {
  const [remainTime, setRemainTime] = useState({ h: 0, m: 0 });
  const [allWorkingTime, setAllWorkingTime] = useState(0);
  const [workingTime, setWorkingTime] = useState({ h: 0, m: 0 });
  const [allTime, setAllTime] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    getReaminTime().then(({ remainingMinutes }) =>
      setAllTime(remainingMinutes),
    );
    setShowProgress(true);
  }, []);

  useEffect(() => {
    setRemainTime({
      h: Math.floor(allTime / 60),
      m: allTime % 60,
    });

    const workAll = 2400 - allTime;
    setAllWorkingTime(workAll);
    setWorkingTime({
      h: Math.floor(workAll / 60),
      m: workAll % 60,
    });
  }, [allTime]);

  return (
    <WeekWorkinghoursSection>
      <Title>
        이번주 누적 근무시간 |{' '}
        <RTemainTime>
          {allTime === 0
            ? '이번 주 근무시간을 모두 채웠습니다'
            : `${remainTime.h}시간${
                remainTime.m ? ` ${remainTime.m}분` : ''
              }의 근무시간이 부족합니다`}
        </RTemainTime>
      </Title>
      {showProgress ? (
        <ProgressWrap>
          <Progress max="2400" value={2400 - allTime}></Progress>
          <Time>
            {workingTime.h}시간 {workingTime.m}분({allWorkingTime}분)
          </Time>
        </ProgressWrap>
      ) : (
        <></>
      )}
    </WeekWorkinghoursSection>
  );
};

const RTemainTime = styled.b`
  font-weight: normal;
`;

const ProgressWrap = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
`;

const Time = styled.p`
  margin: 0;
  font-size: 20px;
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translate(0%, -50%);
  font-weight: bold;
`;
const Progress = styled.progress`
  width: 100%;
  height: 100px;
  color: red;
  border: 1px solid #777;
  border-radius: 50px;

  overflow: hidden;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: white;

  &::-webkit-progress-bar {
    border-radius: 50px;
    background-color: white;
  }

  &::-webkit-progress-value {
    background-color: #6c63ff;
  }
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin: 25px 0 40px 0;
`;

const WeekWorkinghoursSection = styled.section`
  width: 100%;
  height: fit-content;
  margin-top: 80px;
`;

export default WeekWorkinghours;
