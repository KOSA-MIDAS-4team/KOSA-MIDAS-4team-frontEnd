import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
