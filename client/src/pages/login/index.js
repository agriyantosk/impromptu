import { AuthContext } from "@/context/auth-context";
import useStore from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function index() {
  const router = useRouter();
  // const [userInput,setUserInput] = useState({
  //   email:"",
  //   password:""
  // })

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push("/home");
  }

  const [email, updateEmail] = useStore((state) => [
    state.email,
    state.updateEmail,
  ]);

  const [password, updatePassword] = useStore((state) => [
    state.password,
    state.updatePassword,
  ]);

  const login = useStore((state) => state.login);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(authContext.authState);
    if (authContext.authState.access_token !== "") {
      router.push("/");
    }
  }, [authContext.authState]);
  // console.log(authContext,">>>>>>>>>>>>>>>>>");

  return (
    <div className="relative flex flex-col py-16 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="flex flex-col justify-center items-center md:items-start w-full max-w-xl px-4 mx-auto lg:px-8 lg:max-w-screen-xl">
      <h1
        className="max-w-lg mt-[15%] font-sans font-bold tracking-tight text-black sm:text-4xl sm:leading-none"
        style={{ fontSize: 60 }}
      >
        {" "}
        IMPROMPTU
      </h1>
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
            <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
              Sign in for create trip
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="email"
                  className="inline-block mb-1 font-medium"
                >
                  Email
                </label>
                <input
                  placeholder="JohnDoe@email.com"
                  required
                  value={email}
                  onChange={(e) => {
                    updateEmail(e.currentTarget.value);
                  }}
                  type="email"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="password"
                  className="inline-block mb-1 font-medium"
                >
                  password
                </label>
                <input
                  placeholder="password here"
                  required
                  value={password}
                  onChange={(e) => {
                    updatePassword(e.currentTarget.value);
                  }}
                  type="password"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                />
              </div>
              <div className="mt-4 mb-2 sm:mb-4">
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await login();
                    authContext.setAuthState(
                      localStorage.getItem("access_token")
                    );
                    // router.push("/home")
                    // if(localStorage.getItem("access_token")){
                    //   Swal.fire({
                    //     position: 'center',
                    //     icon: 'success',
                    //     title: 'Success Login',
                    //     showConfirmButton: false,
                    //     timer: 1000
                    //   })
                    //   router.push("/home")
                    // }else{
                    //   router.push("/login")
                    // }
                  }}
                  type="submit"
                  className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-tosca-light hover:bg-tosca-hover focus:shadow-outline focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className="text-xs text-gray-600 sm:text-sm text-center">
                Dont have account ?{" "}
                <Link href="/register" style={{ textDecoration: "none" }}>
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="inset-y-0 right-0 w-full min-h-screen max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0 ">
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full hidden lg:block"
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww&w=1000&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
