import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyPage from './pages/myPage';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/myPage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
