import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { googleAuthAPI } from "../api/auth.api"
import useAppStore from "./useAppStore";
import { APP_AUTH_KEY } from "./useAuth";

export const useGoogleAuth = ()=>{
    const setIsLoggedin = useAppStore(state=>state.setIsLoggedin);
    const setUser = useAppStore(state=>state.setUser);
    const navigate = useNavigate();

    const setLoginState = (user, token) => {
        if (!user || !token) return;
        console.log(`Setting login state`);
        localStorage.setItem(APP_AUTH_KEY, JSON.stringify({ user, token }));
        setIsLoggedin(true);
        setUser(user);
      };


    const {isLoading, mutateAsync : googleSuccessCall,isError,error} = useMutation(googleAuthAPI, {
        onSuccess: (data)=>{
            console.log(data);
            setLoginState(data.user, data.token);
            toast.success('Google login verified!');
            
        },
        onError : (error)=>{
            console.log(error);
            toast.error('Google login failed!');
        },
        onSettled : ()=>{
            setTimeout(()=>{
                navigate('/');
            }, 1000)
        }
    })

    return {
        googleSuccessCall,
        isLoading,
        isError,
        error
    }
}