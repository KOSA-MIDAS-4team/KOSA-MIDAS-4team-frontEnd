import axios from 'axios';
import { getAccessToken } from '../../functions/token/toeken';

export const getMultitagOfFile = async (file) => {
  return await axios
    .request({
      url: `http://13.209.36.143:8081/user/update/img`,
      method: 'PUT',
      headers: {
        'content-Type': 'multipart/form-data',
        Authorization: getAccessToken(),
      },
      data: file,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
