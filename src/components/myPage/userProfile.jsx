import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMultitagOfFile } from '../../utils/api/profile/profile';
import { getUserData } from '../../utils/api/user/user';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    department: '',
    imgUrl: '',
  });

  const getData = async () => {
    const data = await getUserData();
    setUserData({
      name: data.name,
      department: data.department,
      imgUrl: data.imgUrl,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onFileChange = async ({ target: { files } }) => {
    const theFile = files[0];

    // 서버로 전송하기 위한 파일 formData
    const formData = new FormData();
    formData.append('image', theFile);

    getMultitagOfFile(formData);

    // 화면에 띄우기 위한 변환작업
    // const reader = new FileReader();
    // reader.onloadend = (finishedEvent) => {
    //   const {
    //     currentTarget: { result },
    //   } = finishedEvent;

    //   setImgView(result);
    // };
    // await reader.readAsDataURL(theFile);
  };

  return (
    <UserProfileWrap>
      <Profile img={userData.imgUrl} />
      <UserInfoWrap>
        <Name>{userData.name}</Name>
        <Department>{userData.department}</Department>
      </UserInfoWrap>
      <MyDataPatch htmlFor="profileFileInput">프로필 사진 변경</MyDataPatch>
      <input
        id="profileFileInput"
        accept="image/*"
        onChange={onFileChange}
        type="file"
        style={{ display: 'none' }}
      />
    </UserProfileWrap>
  );
};

const MyDataPatch = styled.label`
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  border: none;
  color: #777;
  position: absolute;
  bottom: 5px;
  right: 0px;
  cursor: pointer;
  font-size: 16px;
`;

const Name = styled.p`
  margin: 0;
  font-size: 50px;
`;

const Department = styled.p`
  margin: 0;
  font-size: 30px;
`;

const UserInfoWrap = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
const Profile = styled.div`
  width: 160px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #d9d9d9;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const UserProfileWrap = styled.section`
  width: 100%;
  height: fit-content;
  position: relative;

  display: flex;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid black;
  padding: 60px 0;
`;

export default UserProfile;
