import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // to change from login to home page

export const Auth = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    // Sign in with Google
    const results = await signInWithPopup(auth, provider); // async call
    const authInfo = {
      userId: results.user.uid,
      name: results.user.displayName,
      isAuth: true, // to check that the user is logged in
    }
    localStorage.setItem('auth', JSON.stringify(authInfo)); // because we can't store objects in local storage
    navigate('/expenses'); // redirect to home page
  };

  return (
    <div className="login-page">
      <p> Login with Google </p>
      <button className="login-button" onClick={signInWithGoogle}> Login </button>
    </div>
  );
};