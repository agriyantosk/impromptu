// import Navbar from '@/components/NavbarLogin'
// import useStore from '@/store'
// import { update } from '@react-spring/web'
// import { useRouter } from 'next/router'
// import React, { useState } from 'react'

// export default function index() {
//     const router = useRouter()
//     const [tripName,updateTripName] = useStore((state)=>[
//       state.tripName,
//       state.updateTripName
//     ])
//     const createTrip = useStore((state)=> state.createTrip)
//     // function handleChange(e) {
//     //     setTripName(e.target.value)
//     // }

//     // function handleSubmit(e){
//     //     e.preventDefault();
//     //     router.push("/listrooms")
//     //     console.log(tripName);
//     // }

//   return (
//     <div>
//       <Navbar />
//       <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//         <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
//           <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
//             <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
//               <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
//                 Choose place you want to go
//               </h2>
//             </div>
//             <div>
//             <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
//             <input
//               placeholder="ex:bali"
//               required
//               type="text"
//               name='tripName'
//               value={tripName}
//               onChange={(e)=>{
//                 updateTripName(e.currentTarget.value)
//               }}
//               className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-teal-300 focus:outline-none focus:shadow-outline"
//             />
//             <button
//               onClick={(e)=>{
//                 e.preventDefault()
//                 createTrip()
//                 router.push("/listrooms")
                
//               }}
//               type='submit'
//               className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto  bg-teal-300 hover:bg-teal-500  focus:shadow-outline focus:outline-none"
//             >
//               Create
//             </button>
//           </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { Long_Cang, Montserrat, Poppins } from "next/font/google";
const inter = Poppins({ subsets: ["latin"], weight: "400" });
import useStore from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Select } from "flowbite-react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import React, { useEffect, useState } from "react";
import { useTransition, animated, config } from "@react-spring/web";

const Form = () => {
  const [step, setStep] = useState(1);

  const transitions = useTransition(step, {
    from: { opacity: 0, transform: "translateY(100%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(-100%)" },
    config: config.slow,
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!queryReady) getFlight();
    else {
      console.log(trip);
      await getItinerary();
      router.push("/createtrip/select");
    }
  };
  const [trip, updateTrip] = useStore((state) => [
    state.trip,
    state.updateTrip,
  ]);
  const [origin, updateOrigin] = useStore((state) => [
    state.origin,
    state.updateOrigin,
  ]);
  const [destination, updateDestination] = useStore((state) => [
    state.destination,
    state.updateDestination,
  ]);
  const [departure, updateDeparture] = useStore((state) => [
    state.departure,
    state.updateDeparture,
  ]);
  const [returnDate, updateReturn] = useStore((state) => [
    state.returnDate,
    state.updateReturn,
  ]);
  const [budget, updateBudget] = useStore((state) => [
    state.budget,
    state.updateBudget,
  ]);
  const [type, updateType] = useStore((state) => [
    state.type,
    state.updateType,
  ]);
  const [flightReady, updateFlightReady] = useStore((state) => [
    state.flightReady,
    state.updateFlightReady,
  ]);
  const [queryReady, updateQueryReady] = useStore((state) => [
    state.queryReady,
    state.updateQueryReady,
  ]);
  const [ticketPrice, updateTicket] = useStore((state) => [
    state.ticketPrice,
    state.updateTicket,
  ]);
  const [loading, updateLoading] = useStore((state) => [
    state.loading,
    state.updateLoading,
  ]);

  useEffect(() => {
    console.log(trip);
  }, [trip]);
  const getFlight = useStore((state) => state.getFlight);
  const getItinerary = useStore((state) => state.getItinerary);
  const createTrip = useStore((state) => state.createTrip);
  const router = useRouter();

  return (
    <>
      {loading ? (
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_RiLwoG.json"
          style={{
            height: "100vh",
            width: "1000px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        ></Player>
      ) : (
        <div>
          <div
            className={`w-[100%] h-screen justify-center items-center ${inter.className} absolute top-0 left-0`}
          >
            <h2
              className={`relative top-0 flex flex-col justify-start items-start p-5 text-5xl font-bold tracking-tight text-black z-50 cursor-pointer`}
              onClick={(e) => {
                router.push('/')
              }}
            >
              Impromptu
            </h2>
          </div>
          {transitions((props, item) =>
            item === 1 ? (
              <animated.form
                style={props}
                onSubmit={handleSubmit}
                className="flex justify-center items-center"
              >
                <div
                  className={`flex flex-col justify-center items-center mt-[20%] w-[30%] h-[20rem] bg-[#92b8af] rounded-full shadow-xl bg-opacity-90 hover:scale-[103%] transform transition-transform ${inter.className}`}
                >
                  <label
                    for="username"
                    className="flex justify-center mb-6 font-semibold text-4xl text-black w-full"
                  >
                    Trip
                  </label>
                  <div className="flex justify-center w-[80%] mb-10">
                    <input
                      id="username"
                      autocomplete="email"
                      name="EMAIL"
                      aria-required="true"
                      placeholder="Your Trip Name"
                      onChange={(e) => {
                        updateTrip(e.currentTarget.value);
                        // console.log(trip);
                      }}
                      value={trip}
                      type="text"
                      className="text-[#272343] text-xl flex w-[100%] h-16 justify-center mr-4 items-center px-4 transition duration-200 bg-white rounded-full shadow-lg appearance-none focus:outline-none focus:border-tosca focus:shadow-xl"
                    />
                    <a
                      href="#"
                      aria-label="Scroll down"
                      onClick={() => {
                        createTrip()
                        handleNext()
                      }}
                      className="shadow-lg flex items-center justify-center w-24 h-16 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        className="rounded-lg shadow-lg"
                        style={{ transform: "rotate(270deg)" }}
                      >
                        <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </animated.form>
            ) : item === 2 ? (
              <animated.form
                style={props}
                onSubmit={handleSubmit}
                className="flex justify-center items-center"
              >
                <div
                  className={`flex flex-col justify-center items-center mt-[20%] w-[30%] h-[20rem] bg-[#92b8af] rounded-full shadow-xl bg-opacity-90 hover:scale-[103%] transform transition-transform ${inter.className}`}
                >
                  <label
                    for="username"
                    className="flex justify-center mb-6 font-semibold text-4xl text-black w-full"
                  >
                    Origin
                  </label>
                  <div className="flex justify-center w-[80%] mb-10">
                    <input
                      id="username"
                      autocomplete="email"
                      name="EMAIL"
                      aria-required="true"
                      placeholder="Jakarta"
                      onChange={(e) => {
                        updateOrigin(e.currentTarget.value);
                        // console.log(trip);
                      }}
                      value={origin}
                      type="text"
                      className="text-[#272343] text-xl flex w-[100%] h-16 justify-center mr-4 items-center px-4 transition duration-200 bg-white rounded-full shadow-lg appearance-none focus:outline-none focus:border-tosca focus:shadow-xl"
                    />
                    <a
                      href="#"
                      aria-label="Scroll down"
                      onClick={handleNext}
                      className="shadow-lg flex items-center justify-center w-24 h-16 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        className="rounded-lg shadow-lg"
                        style={{ transform: "rotate(270deg)" }}
                      >
                        <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </animated.form>
            ) : item === 3 ? (
              <animated.form
                style={props}
                onSubmit={handleSubmit}
                className="flex justify-center items-center"
              >
                <div
                  className={`flex flex-col justify-center items-center mt-[20%] w-[30%] h-[20rem] bg-[#92b8af] rounded-full shadow-xl bg-opacity-90 hover:scale-[103%] transform transition-transform ${inter.className}`}
                >
                  <label
                    for="username"
                    className="flex justify-center mb-6 font-semibold text-4xl text-black w-full"
                  >
                    Destination
                  </label>
                  <div className="flex justify-center w-[80%] mb-10">
                    <input
                      id="username"
                      autocomplete="email"
                      name="EMAIL"
                      aria-required="true"
                      placeholder="Bali"
                      onChange={(e) => {
                        updateDestination(e.currentTarget.value);
                        // console.log(trip);
                      }}
                      value={destination}
                      type="text"
                      className="text-[#272343] text-xl flex w-[100%] h-16 justify-center mr-4 items-center px-4 transition duration-200 bg-white rounded-full shadow-lg appearance-none focus:outline-none focus:border-tosca focus:shadow-xl"
                    />
                    <a
                      href="#"
                      aria-label="Scroll down"
                      onClick={handleNext}
                      className="shadow-lg flex items-center justify-center w-24 h-16 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        className="rounded-lg shadow-lg"
                        style={{ transform: "rotate(270deg)" }}
                      >
                        <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </animated.form>
            ) : item === 4 ? (
              <animated.form
                style={props}
                onSubmit={handleSubmit}
                className="flex justify-center items-center"
              >
                <div
                  className={`flex flex-col justify-center items-center mt-[20%] w-[30%] h-[20rem] bg-[#92b8af] rounded-full shadow-xl bg-opacity-90 hover:scale-[103%] transform transition-transform ${inter.className}`}
                >
                  <label
                    for="username"
                    className="flex justify-center mb-6 font-semibold text-4xl text-black w-full"
                  >
                    Departure Date
                  </label>
                  <div className="flex justify-center w-[80%] mb-10">
                    <input
                      id="username"
                      autocomplete="email"
                      name="EMAIL"
                      aria-required="true"
                      // placeholder="Your Trip Name"
                      onChange={(e) => {
                        updateDeparture(e.currentTarget.value);
                        // console.log(trip);
                      }}
                      value={departure}
                      type="date"
                      className="text-[#272343] text-xl flex w-[100%] h-16 justify-center mr-4 items-center px-4 transition duration-200 bg-white rounded-full shadow-lg appearance-none focus:outline-none focus:border-tosca focus:shadow-xl"
                    />
                    <a
                      href="#"
                      aria-label="Scroll down"
                      onClick={handleNext}
                      className="shadow-lg flex items-center justify-center w-24 h-16 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        className="rounded-lg shadow-lg"
                        style={{ transform: "rotate(270deg)" }}
                      >
                        <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </animated.form>
            ) : item === 5 ? (
              <animated.form
                style={props}
                onSubmit={handleSubmit}
                className="flex justify-center items-center"
              >
                <div
                  className={`flex flex-col justify-center items-center mt-[20%] w-[30%] h-[20rem] bg-[#92b8af] rounded-full shadow-xl bg-opacity-90 hover:scale-[103%] transform transition-transform ${inter.className}`}
                >
                  <label
                    for="username"
                    className="flex justify-center mb-6 font-semibold text-4xl text-black w-full"
                  >
                    Return Date
                  </label>
                  <div className="flex justify-center w-[80%] mb-10">
                    <input
                      id="username"
                      autocomplete="email"
                      name="EMAIL"
                      aria-required="true"
                      // placeholder="Your Trip Name"
                      onChange={(e) => {
                        updateReturn(e.currentTarget.value);
                        // console.log(trip);
                      }}
                      value={returnDate}
                      type="date"
                      className="text-[#272343] text-xl flex w-[100%] h-16 justify-center mr-4 items-center px-4 transition duration-200 bg-white rounded-full shadow-lg appearance-none focus:outline-none focus:border-tosca focus:shadow-xl"
                    />
                    <a
                      href="#"
                      aria-label="Scroll down"
                      onClick={handleNext}
                      className="shadow-lg flex items-center justify-center w-24 h-16 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        className="rounded-lg shadow-lg"
                        style={{ transform: "rotate(270deg)" }}
                      >
                        <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </animated.form>
            ) : item === 6 ? (
              <animated.form
                style={props}
                onSubmit={handleSubmit}
                className="flex justify-center items-center"
              >
                <div
                  className={`flex flex-col justify-center items-center mt-[20%] w-[30%] h-[20rem] bg-[#92b8af] rounded-full shadow-xl bg-opacity-90 hover:scale-[103%] transform transition-transform ${inter.className}`}
                >
                  <label
                    for="username"
                    className="flex justify-center mb-6 font-semibold text-4xl text-black w-full"
                  >
                    Budget
                  </label>
                  <div className="flex justify-center w-[80%] mb-10">
                    <input
                      id="username"
                      autocomplete="email"
                      name="EMAIL"
                      aria-required="true"
                      placeholder="Rp.10.000.000,00"
                      onChange={(e) => {
                        updateBudget(e.currentTarget.value);
                        // console.log(trip);
                      }}
                      value={budget}
                      type="number"
                      className="text-[#272343] text-xl flex w-[100%] h-16 justify-center mr-4 items-center px-4 transition duration-200 bg-white rounded-full shadow-lg appearance-none focus:outline-none focus:border-tosca focus:shadow-xl"
                    />
                    <a
                      href="#"
                      aria-label="Scroll down"
                      onClick={handleNext}
                      className="shadow-lg flex items-center justify-center w-24 h-16 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        className="rounded-lg shadow-lg"
                        style={{ transform: "rotate(270deg)" }}
                      >
                        <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </animated.form>
            ) : item === 7 ? (
              <animated.form
                style={props}
                onSubmit={handleSubmit}
                className="flex justify-center items-center"
              >
                <div
                  className={`flex flex-col justify-center items-center mt-[20%] w-[30%] h-[20rem] bg-[#92b8af] rounded-full shadow-xl bg-opacity-90 hover:scale-[103%] transform transition-transform ${inter.className}`}
                >
                  <label
                    for="username"
                    className="flex justify-center mb-5 font-semibold text-2xl"
                  >
                    Type
                  </label>
                  <div className="flex justify-center w-[80%] mb-10">
                    <select
                      id="username"
                      autocomplete="email"
                      name="EMAIL"
                      aria-required="true"
                      onChange={(e) => {
                        updateType(e.currentTarget.value);
                      }}
                      value={type}
                      type="text"
                      className="text-[#272343] text-xl flex w-[100%] h-16 justify-center mr-4 items-center px-4 transition duration-200 bg-white rounded-full shadow-lg appearance-none focus:outline-none focus:border-tosca focus:shadow-xl"
                    >
                      <option value={"solo"}>Solo</option>
                      <option value={"romantic"}>Romantic</option>
                      <option value={"family"}>Family</option>
                      <option value={"adventurous"}>Adventurous</option>
                    </select>
                    <a
                      href="#"
                      aria-label="Scroll down"
                      onClick={handleNext}
                      className="shadow-lg flex items-center justify-center w-24 h-16 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        className="rounded-lg shadow-lg"
                        style={{ transform: "rotate(270deg)" }}
                      >
                        <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </animated.form>
            ) : (
              <animated.form
                style={props}
                onSubmit={handleSubmit}
                className="flex justify-center items-center"
              >
                <div
                  className={`flex flex-col justify-center items-center mt-[20%] w-[30%] h-[20rem] bg-[#92b8af] rounded-full shadow-xl bg-opacity-90 hover:scale-[103%] transform transition-transform ${inter.className}`}
                >
                  {flightReady && (
                    <div className="flex-col justify-center mb-10">
                      <label
                        for="username"
                        className="flex justify-center mb-5 font-semibold text-2xl"
                      >
                        Ticket Price
                      </label>
                      <input
                        id="ticket"
                        name="EMAIL"
                        aria-required="true"
                        placeholder="Rp. 5.000.000,00"
                        onChange={(e) => {
                          updateTicket(e.currentTarget.value);
                        }}
                        value={ticketPrice}
                        type="text"
                        className="flex w-[100%] mr-28 justify-center items-center h-12 px-4 transition duration-200 bg-white border border-gray-400 rounded-lg shadow-lg appearance-none focus:outline-none focus:border-tosca focus:shadow-xl"
                      />
                    </div>
                  )}
                  <div className="flex justify-center items-center ml-3">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="flex-col items-center justify-center w-[100%] h-12 px-6 mr-6 font-normal tracking-wide text-white bg-[#92b8af] border-none bg-opacity-0"
                    >
                      <h2 className="text-7xl font-bold text-[#feffea]">
                        {!flightReady && "Trippin" }
                      </h2>
                      <Player
                        autoplay
                        loop
                        src="https://assets9.lottiefiles.com/packages/lf20_mzhbplls.json"
                        style={{ height: "150px", width: "700px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      ></Player>
                    </button>
                  </div>
                  {flightReady && (
                    <div className="flex justify-center items-center ml-3 mt-5">
                      <Link href={flightReady} target="_blank">
                        <button
                          type="button"
                          className="flex items-center justify-center h-12 px-6 mr-6 font-normal tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-tosca hover:bg-tosca-hover focus:outline-none"
                        >
                          <p>Search for Flights</p>
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </animated.form>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Form;
