import React, { createContext, useState } from 'react'

const AuthContext = createContext()
    // const {Provider} = AuthContext

const AuthProvider = ({children})=>{
    const [authState,setAuthState] = useState({
        access_token:''
    })

    const setAuthInfo = (access_token)=>{
         access_token = localStorage.setItem("access_token",access_token)

         setAuthState({
            access_token
        })
    }

    const isUserAuthenticated = ()=>{
        if(!authState.token){
            return false
        }

    }
    return (
        <AuthContext.Provider 
            value={{
                authState,
                setAuthState:(access_token)=>setAuthInfo(access_token),
                isUserAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider}