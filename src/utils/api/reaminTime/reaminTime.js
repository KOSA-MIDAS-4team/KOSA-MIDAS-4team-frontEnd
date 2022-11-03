import axios from 'axios';
import { getAccessToken } from '../../functions/token/toeken';

export const getReaminTime = async () => {
  let respone = 0;
  if (localStorage.getItem('authId')) {
    await axios
      .request({
        url: 'http://13.209.36.143:8081/user/remain',
        headers: { Authorization: getAccessToken() },
        data: {
          authId: localStorage.getItem('authId'),
        },
      })
      .then((res) => {
        respone = res.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  return respone;
};
