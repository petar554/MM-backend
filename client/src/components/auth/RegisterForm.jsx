import { useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser, onAuthChange, loginWithGoogle } from '../../services/authService';

const AuthForm = ({ formState, handleInputChange, handleSubmit, isRegister }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formState.email}
      onChange={handleInputChange}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formState.password}
      onChange={handleInputChange}
      required
    />
    <button type="submit">{isRegister ? "Register" : "Login"}</button>
  </form>
);

const AuthComponent = () => {
  const [authState, setAuthState] = useState(null); // tracking authentication state
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [isRegister, setIsRegister] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setAuthState(user);
      } else {
        setAuthState(null);
        setFormState({ email: '', password: '' }); 
      }
    });
    return () => unsubscribe(); // cleanup subscription on unmount
  }, []);

  // handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    const { email, password } = formState;

    try {
      if (isRegister) {
        const newUser = await registerUser(email, password);
        setAuthState(newUser);
      } else {
        const loggedInUser = await loginUser(email, password);
        setAuthState(loggedInUser);
      }
    } catch (error) {
      console.error(`${isRegister ? 'Registration' : 'Login'} error:`, error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await loginWithGoogle();
      setAuthState(googleUser);
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthState(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div>
      {!authState ? (
        <div>
          <h3>{isRegister ? "Register" : "Login"}</h3>
          <AuthForm 
            formState={formState} 
            handleInputChange={handleInputChange} 
            handleSubmit={handleSubmit} 
            isRegister={isRegister} 
          />
          <button onClick={handleGoogleLogin}>Login with Google</button>
          <button onClick={() => setIsRegister(!isRegister)}>
            Switch to {isRegister ? "Login" : "Register"}
          </button>
        </div>
      ) : (
        <div>
          <h3>Welcome, {authState.email}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
