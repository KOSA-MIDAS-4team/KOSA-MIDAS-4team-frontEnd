import styled from 'styled-components';
import Header from '../components/common/header';
import UserProfile from '../components/myPage/userProfile';
import WeekWorkinghours from '../components/myPage/weekWorkinghours';

const MyPage = () => {
  return (
    <>
      <Header />
      <MyPageContainer>
        <UserProfile />
        <WeekWorkinghours />
      </MyPageContainer>
    </>
  );
};

const MyPageContainer = styled.main`
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 0 120px;
  margin-top: 95px;
`;

export default MyPage;
