import axios from 'axios';

export const getUserData = async () => {
  return await axios
    .get('http://13.209.36.143:8081/user')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
};
