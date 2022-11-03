import styled from 'styled-components';
import UserProfile from '../components/myPage/userProfile';
import WeekWorkinghours from '../components/myPage/weekWorkinghours';

const MyPage = () => {
  return (
    <MyPageContainer>
      <UserProfile />
      <WeekWorkinghours />
    </MyPageContainer>
  );
};

const MyPageContainer = styled.main`
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 0 120px;
`;

export default MyPage;
