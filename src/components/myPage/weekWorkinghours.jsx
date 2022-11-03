import styled from 'styled-components';

const WeekWorkinghours = () => {
  return (
    <WeekWorkinghoursSection>
      <Title>이번주 누적 근무시간</Title>
      <ProgressWrap>
        <Progress max="960" value={900}></Progress>
        <Time>2시간 30분(150분)</Time>
      </ProgressWrap>
    </WeekWorkinghoursSection>
  );
};

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
`;

export default WeekWorkinghours;
