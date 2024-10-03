export const useGetUserInfo = () => {
  const {
    name,
    profilePhoto,
    userId,
    isAuth,
  } = JSON.parse(localStorage.getItem('auth'))  || {}; // transforms a string back into an object

  return {
    name,
    profilePhoto,
    userId,
    isAuth
  };
}