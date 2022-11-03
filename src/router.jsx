import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';
import SignUp from './pages/signUp';
import MyPage from './pages/myPage';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/myPage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
