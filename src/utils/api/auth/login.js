import axios from 'axios';
import { saveToken, saveUserData } from '../../functions/token/toeken';

export const loginApi = ({ authId, password }) => {
  axios
    .post(`http://13.209.36.143:8081/auth/login`, {
      authId,
      password,
    })
    .then((res) => {
      const { accessToken, refreshToken } = res.data;
      saveToken(accessToken, refreshToken);
      saveUserData(authId);
    })

    .catch((err) => {
      throw new Error(err);
    });
};
