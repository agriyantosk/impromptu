import { AuthContext } from "@/context/auth-context";
import "@/styles/globals.css";
import "material-icons/iconfont/material-icons.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [authState, setAuthState] = useState({
    access_token: ""
  });

  const setAuthInfo = (access_token) => {
    // console.log(access_token, ">>>>>>>>");
    //  localStorage.setItem("access_token",access_token)

    setAuthState({
      access_token: localStorage.getItem("access_token"),
    });
  };

  const isUserAuthenticated = () => {
    if (!authState.token) {
      console.log("tidak bisa masuk");
      return false;
    }
    console.log("bisa masuk");
    return true;
  };

  useEffect(()=>{
    const access_token = localStorage.getItem("access_token")
    
    if(access_token){
      setAuthState(()=>{
        return {access_token}
      })
      console.log("go home");
      console.log(router);
      
      // window.location = window.location.href
      const link = window.location.href

      const links = link.split("/")

      let _link = ""

      for (let index = 3; index < links.length; index++) {
        _link = _link + "/" + links[index];
      
      }
      router.push(_link)
      // console.log(_link);
    }
      
    
  },[])
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (access_token) => setAuthState(access_token),
        isUserAuthenticated,
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
