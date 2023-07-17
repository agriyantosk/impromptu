import useStore from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function index() {
  const router = useRouter();

  const [name, updateName] = useStore((state) => [
    state.name,
    state.updateName,
  ]);
  const [email, updateEmail] = useStore((state) => [
    state.email,
    state.updateEmail,
  ]);
  const [password, updatePassword] = useStore((state) => [
    state.password,
    state.updatePassword,
  ]);
  const [dateOfBirth, updateDateOfBirth] = useStore((state) => [
    state.dateOfBirth,
    state.updateDateOfBirth,
  ]);
  const [address, updateAddress] = useStore((state) => [
    state.address,
    state.updateAddress,
  ]);
  const [phoneNumber, updatePhoneNumber] = useStore((state) => [
    state.phoneNumber,
    state.updatePhoneNumber,
  ]);

  const register = useStore((state) => state.register);

  return (
    <div className="overflow-hidden bg-gray-900">
      <div
        className="bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12">
              <h1 className="max-w-lg mb-6 font-sans font-bold tracking-tight text-black sm:text-4xl sm:leading-none" style={{fontSize: 60}}> IMPROMPTU</h1>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                Explore the world effortlessly{" "}
                <br className="hidden md:block" />
                with our{" "}
                <span className="text-teal-accent-400">AI-powered</span> travel
                planner
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                Discover new destinations and plan your perfect getaway with
                ease, thanks to our advanced AI technology. Say goodbye to the
                hassle of trip planning and let our travel planner create a
                personalized itinerary just for you.
              </p>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="relative">
                <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full" />
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-accent-400 lg:w-32 lg:-mr-16 sm:block"
                >
                  <defs>
                    <pattern
                      id="766323e1-e594-4ffd-a688-e7275079d540"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#766323e1-e594-4ffd-a688-e7275079d540)"
                    width="52"
                    height="24"
                  />
                </svg>
                <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Sign up
                  </h3>
                  <form onSubmit={register}>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="name"
                        className="inline-block mb-1 font-medium"
                      >
                        Name
                      </label>
                      <input
                        placeholder="John Doe"
                        required
                        value={name}
                        onChange={(e) => {
                          updateName(e.currentTarget.value);
                        }}
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        E-mail
                      </label>
                      <input
                        placeholder="john.doe@example.org"
                        required
                        type="text"
                        value={email}
                        onChange={(e) => {
                          updateEmail(e.currentTarget.value);
                        }}
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
                        Password
                      </label>
                      <input
                        placeholder="john.doe@example.org"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => {
                          updatePassword(e.currentTarget.value);
                        }}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="dateOfBirth"
                        className="inline-block mb-1 font-medium"
                      >
                        Date Of Birth
                      </label>
                      <input
                        required
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => {
                          updateDateOfBirth(e.currentTarget.value);
                        }}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="dateOfBirth"
                        name="dateOfBirth"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="address"
                        className="inline-block mb-1 font-medium"
                      >
                        Address
                      </label>
                      <input
                        placeholder="Your address here"
                        required
                        type="text"
                        value={address}
                        onChange={(e) => {
                          updateAddress(e.currentTarget.value);
                        }}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="address"
                        name="address"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="phoneNumber"
                        className="inline-block mb-1 font-medium"
                      >
                        Phone Number
                      </label>
                      <input
                        placeholder="12345567890"
                        required
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => {
                          updatePhoneNumber(e.currentTarget.value);
                        }}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="phoneNumber"
                        name="phoneNumber"
                      />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          register();
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Success Register",
                            showConfirmButton: false,
                            timer: 1000,
                          });
                          router.push("/login");
                        }}
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-tosca-light hover:bg-tosca-hover focus:shadow-outline focus:outline-none"
                      >
                        Sign Up
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 sm:text-sm text-center">
                      Already have an account?{" "}
                      <Link href="/login" style={{ textDecoration: "none" }}>
                        Sign in
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
