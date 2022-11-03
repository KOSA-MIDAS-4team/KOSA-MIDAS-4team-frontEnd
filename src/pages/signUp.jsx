import { useState } from 'react';
import styled from 'styled-components';
import { loginImg, TextMode, PwMode } from '../assets';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    department: 'personnel',
  });
  const [pwMode, setPwMode] = useState(true);
  const [pwCheckMode, setPwCheckMode] = useState(true);

  const changePwMode = () => setPwMode(!pwMode);

  const changePwCheckMode = () => setPwCheckMode(!pwCheckMode);

  const signUpDataFormat = (name, value) => {
    let newData = '';

    if (name === 'id') {
      newData = value.replace(/\W/, '');
    } else if (name === 'pw' || name === 'pwCheck') {
      newData = value.replace(/[^\w!@#$%.?\-_*]/, '');
    } else if (name === 'name') {
      newData = value.replace(/[^\wㄱ-ㅎ가-힣]/, '');
    } else if (name === 'department') {
      return value;
    }

    return newData;
  };

  const changeSignUpData = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    const newValue = signUpDataFormat(name, value);

    setSignUpData((pre) => ({ ...pre, [name]: newValue }));
  };

  const onSignUp = () => {
    if (signUpData.pw === signUpData.pwCheck) {
    }
  };

  return (
    <SignUpPage>
      <SignUpContanier>
        <SignUpImg img={loginImg} />
        <SignUpSection>
          <Title>회원가입</Title>
          <InputWrap>
            <Label>아이디</Label>
            <LoginInputWrap>
              <IdInput
                name="id"
                value={signUpData.id}
                onChange={changeSignUpData}
              />
            </LoginInputWrap>
          </InputWrap>
          <InputWrap>
            <Label>이름</Label>
            <LoginInputWrap>
              <IdInput
                name="name"
                value={signUpData.name}
                onChange={changeSignUpData}
              />
            </LoginInputWrap>
          </InputWrap>
          <InputWrap>
            <Label>비밀번호</Label>
            <LoginInputWrap>
              <PwInput
                name="pw"
                value={signUpData.pw}
                onChange={changeSignUpData}
                type={pwMode ? 'password' : 'text'}
              />
              <PwModeBtn pwMode={pwMode} onClick={changePwMode} />
            </LoginInputWrap>
          </InputWrap>
          <InputWrap>
            <Label>비밀번호 체크</Label>
            <LoginInputWrap>
              <PwInput
                name="pwCheck"
                value={signUpData.pwCheck}
                onChange={changeSignUpData}
                type={pwCheckMode ? 'password' : 'text'}
              />
              <PwModeBtn pwMode={pwCheckMode} onClick={changePwCheckMode} />
            </LoginInputWrap>
          </InputWrap>
          <InputWrap>
            <Label>부서</Label>
            <LoginInputWrap>
              <DepartmentSelect
                name="department"
                value={signUpData.department}
                onChange={changeSignUpData}
              >
                <option value="personnel">인사</option>
                <option value="marketing">마케팅</option>
                <option value="developer">개발</option>
              </DepartmentSelect>
            </LoginInputWrap>
          </InputWrap>
          <SignUpBtn onClick={onSignUp}>로그인</SignUpBtn>
        </SignUpSection>
      </SignUpContanier>
    </SignUpPage>
  );
};

const Title = styled.h1`
  font-size: 30px;
  margin: 0;
  margin-bottom: 30px;
`;

const SignUpBtn = styled.button`
  width: 100%;
  height: 50px;
  background-color: #6c63ff;
  color: white;
  font-size: 18px;
  margin-top: 10px;
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
  margin-bottom: 20px;
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

const DepartmentSelect = styled.select`
  outline: none;
  border: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;

  font-size: 16px;
  padding: 0 7px;

  background-color: white;
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

const SignUpSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpPage = styled.main`
  background-color: #cdcafd;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpContanier = styled.article`
  background-color: white;
  aspect-ratio: 1430/800;
  height: 80vh;
  padding: 0 150px 0 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SignUpImg = styled.div`
  background-image: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 47%;
  aspect-ratio: 6/5;
`;

export default SignUp;
