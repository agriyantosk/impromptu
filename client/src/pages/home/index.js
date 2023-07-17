import React, { useContext, useEffect, useState } from "react";

import {} from "@react-spring/web";

import Navbar from "@/components/NavbarLogin";
import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/router";

function HomeComponent() {
  const router = useRouter()
  const authContext = useContext(AuthContext)
  
  useEffect(()=>{
    // authContext.isUserAuthenticated()
    if(authContext.authState.access_token == "") router.push("/login")
    router.push("/home")
  },[])

  return (
    <>
      <Navbar />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl text-center font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                Choose place <br className="md:hidden" />
                you want to go
              </h2>
              <p className="text-center text-gray-700 md:text-lg">
                Based on your input, we will provide personalized
                recommendations of the finest places for you to explore.
              </p>
            </div>
            <div className="text-center">
              <a
                href="/createtrip"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-300 hover:bg-teal-500 focus:shadow-outline focus:outline-none"
              >
                Create Room
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function home() {
//   const router = useRouter();
  
//   const [authState,setAuthState] = useState({
//     access_token:localStorage.getItem("access_token")
// })

// const setAuthInfo = (access_token)=>{
//   console.log(access_token,">>>>>>>>");
//     //  localStorage.setItem("access_token",access_token)

//      setAuthState({
//         access_token : localStorage.getItem("access_token")
//     })
// }

// const isUserAuthenticated = ()=>{
//     if(!authState.token){
//       console.log("tidak bisa masuk");
//         return false
//     }
//     console.log("bisa masuk");
//     return true

// }

  return (
    // <AuthContext.Provider
    //   value={{
    //     authState,
    //     setAuthState: (access_token) => setAuthInfo(access_token),
    //     isUserAuthenticated,
    //   }}
    // >
      <HomeComponent />
    // </AuthContext.Provider>
  );
}
