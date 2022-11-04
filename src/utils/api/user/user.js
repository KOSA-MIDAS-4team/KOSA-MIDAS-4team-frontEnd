import axios from 'axios';
import { getAccessToken } from '../../functions/token/toeken';

export const getUserData = async () => {
  return await axios
    .request({
      url: 'http://13.209.36.143:8081/user',
      headers: { Authorization: getAccessToken() },
    })
    .then((res) => res.data);
};
