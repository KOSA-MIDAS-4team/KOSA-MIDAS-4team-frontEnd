export const saveUserData = (authId) => {
  localStorage.setItem('authId', authId);
};

export const saveToken = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
