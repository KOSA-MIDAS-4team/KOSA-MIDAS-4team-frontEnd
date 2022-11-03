import { useState } from 'react';
import styled from 'styled-components';
import { loginImg, TextMode, PwMode } from '../assets';
import { loginApi } from '../utils/api/auth/login';

const Login = () => {
  const [loginData, setLoginData] = useState({
    authId: '',
    password: '',
  });
  const [pwMode, setPwMode] = useState(true);

  const changePwMode = () => setPwMode(!pwMode);

  const loginDataFormat = (name, value) => {
    let newData = '';

    if (name === 'authId') {
      newData = value.replace(/\W/, '');
    } else if (name === 'password') {
      newData = value.replace(/[^\w!@#$%.?\-_*]/, '');
    }

    return newData;
  };

  const changeLoginData = (e) => {
    if (e.target.name !== 'authId' && e.target.name !== 'password') {
      throw new Error('Unknown "name" value');
    }

    const { name, value } = e.target;

    const newValue = loginDataFormat(name, value);

    setLoginData((pre) => ({ ...pre, [name]: newValue }));
  };

  const onSignIn = () => {
    loginApi(loginData);
  };

  return (
    <LoginPage>
      <LoginContanier>
        <LoginImg img={loginImg} />
        <LoginSection>
          <Title>로그인</Title>
          <InputWrap>
            <Label>아이디</Label>
            <LoginInputWrap>
              <IdInput
                name="authId"
                value={loginData.authId}
                onChange={changeLoginData}
              />
            </LoginInputWrap>
          </InputWrap>
          <InputWrap>
            <Label>비밀번호</Label>
            <LoginInputWrap>
              <PwInput
                name="password"
                value={loginData.password}
                onChange={changeLoginData}
                type={pwMode ? 'password' : 'text'}
              />
              <PwModeBtn pwMode={pwMode} onClick={changePwMode} />
            </LoginInputWrap>
          </InputWrap>
          <SignIn onClick={onSignIn}>로그인</SignIn>
        </LoginSection>
      </LoginContanier>
    </LoginPage>
  );
};

const Title = styled.h1`
  font-size: 30px;
  margin: 0;
  margin-bottom: 60px;
`;

const SignIn = styled.button`
  width: 100%;
  height: 50px;
  background-color: #6c63ff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.08s ease-in-out;

  &:active {
    transform: scale(0.99);
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
`;

const Label = styled.p`
  margin: 0;
  margin-bottom: 4px;
  font-size: 18px;
`;

const LoginInputWrap = styled.div`
  border: 1px #000 solid;
  border-radius: 3px;
  width: 350px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IdInput = styled.input`
  outline: none;
  border: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;

  font-size: 16px;
  padding: 0 7px;
`;

const PwInput = styled(IdInput)`
  width: 318px;
`;

const pwImgChange = ({ pwMode }) =>
  pwMode
    ? `
    background-image: url(${PwMode});
    background-size: 25px 18px;
    `
    : `
    background-image: url(${TextMode});
    background-size: 21.6px 16px;
    `;

const PwModeBtn = styled.button`
  cursor: pointer;
  width: 27px;
  height: 18px;
  border: 0;
  padding: 0;
  margin-right: 5px;

  background-color: transparent;
  ${pwImgChange};
  background-position: center;
  background-repeat: no-repeat;
`;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginPage = styled.main`
  background-color: #cdcafd;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContanier = styled.article`
  background-color: white;
  aspect-ratio: 1430/800;
  height: 80vh;
  padding: 0 150px 0 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoginImg = styled.div`
  background-image: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 47%;
  aspect-ratio: 6/5;
`;

export default Login;
