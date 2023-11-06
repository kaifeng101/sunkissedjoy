import { CircularProgress } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { toast } from "react-hot-toast";
import { AiFillGoogleCircle } from "react-icons/ai";
import useAppStore from "../../hooks/useAppStore";
import { APP_AUTH_KEY } from "../../hooks/useAuth";
import {
  useGoogleLoginUser,
  useGoogleRegister,
} from "../../hooks/useGoogleOAuth";

const GoogleLoginButtonComponent = ({ className, handleClose, isLogin, ...props }) => {
  const setIsLoggedin = useAppStore((state) => state.setIsLoggedin);
  const setUser = useAppStore((state) => state.setUser);

  const loginSuccess = (user, token) => {
    if (!user || !token) return;
    console.log(`Setting login state`);
    localStorage.setItem(APP_AUTH_KEY, JSON.stringify({ user, token }));
    setIsLoggedin(true);
    setUser(user);
    handleClose();
  };

  const { register: googleRegister, isLoading: googleRegisterLoading } =
    useGoogleRegister((data) => {
      loginSuccess(data?.user, data?.token);
      toast.success("Registered Successfully!");
    });
  const { login: googleLogin, isLoading: googleLoginLoading } =
    useGoogleLoginUser((data) => {
      loginSuccess(data?.user, data?.token);
      toast.success("Logged in Successfully!");
    });

  const loginToGoogle = () => {
    if (isLogin) {
      googleLogin();
    } else {
      googleRegister();
    }
  };

  return (
    <div
      onClick={loginToGoogle}
      {...props}
      className={`${className} flex w-full cursor-pointer relative items-center justify-center`}
    >
      {googleLoginLoading || googleRegisterLoading ? (
        <CircularProgress  className="text-white" color='inherit' size={32}/>
      ) : (
        <AiFillGoogleCircle size={32} className="absolute left-3 text-white" />
      )}
      <button
        type="button"
        className="w-full py-[10px] text-white rounded-md bg-[#c54238]"
      >
        {false ? "Loading.." : isLogin?"Sign in with google":"Register with google"}
      </button>
    </div>
  );
};


const GoogleLoginButton = ({...props})=>{
    return (
      <GoogleOAuthProvider clientId="870238092579-3mkjbvaqvcp2hoedi2f54i0c0jdtkead.apps.googleusercontent.com">
        <GoogleLoginButtonComponent {...props}/>
      </GoogleOAuthProvider>
    )
}

export default GoogleLoginButton;
