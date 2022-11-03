import axios from 'axios';

export const signUpApi = ({
  authId,
  name,
  password,
  checkPassword,
  department,
}) => {
  console.log({ authId, name, password, checkPassword, department });
  axios
    .post(`http://13.209.36.143:8081/user`, {
      authId,
      name,
      password,
      checkPassword,
      department,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
