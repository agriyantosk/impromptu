import { Montserrat } from "next/font/google";
import useStore from "@/store";
import { Card, Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Route } from "next";
import { useRouter } from "next/router";

const inter = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [loading, updateLoading] = useStore((state) => [
    state.loading,
    state.updateLoading,
  ]);
  const [hotels, updateHotels] = useStore((state) => [
    state.hotels,
    state.updateHotels,
  ]);
  const [places, updatePlaces] = useStore((state) => [
    state.places,
    state.updatePlaces,
  ]);
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
  const [itineraries, updateItinerary] = useStore((state) => [
    state.itineraries,
    state.updateItinerary,
  ]);

  const saveItineraries = useStore(state => state.saveItineraries)
  // const getFlight = useStore((state) => state.getFlight);


  // const parallax = useRef(null);
  const router = useRouter()
  useEffect(() => {
    console.log(itineraries);
  }, [itineraries]);
  return (
    <main className={`my-16 ${inter.className}`}>
      {/* {loading ? (
        <h1 className="flex items-center justify-center mt-32 ">Loading Gan</h1>
      ) : ( */}
        <>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="p-5 shadow-xl bg-white rounded-3xl flex justify-center items-center w-[50%] h-full hover:shadow-xl hover:scale-[102%] transform transition-transform">
              <div className="mb-6">
                <Player
                  autoplay
                  loop
                  src="https://assets5.lottiefiles.com/packages/lf20_6u5usprt.json"
                  style={{ height: "150px", width: "150px" }}
                ></Player>
                <h2 className="flex flex-col justify-center items-center text-center p-4 text-5xl font-semibold tracking-tight text-[#272343] opacity-80">
                  {trip}
                </h2>
              </div>
            </div>
            <div className="p-5 shadow-xl bg-white rounded-3xl flex justify-evenly items-center w-[50%] h-[10vh] hover:shadow-xl hover:scale-[102%] transform transition-transform">
              <h2 className="p-10  text-2xl tracking-tight text-[#272343] opacity-80 font-semibold text-sm:text-3xl sm:leading-none">
                {origin.toUpperCase()}
              </h2>
              <Player
                autoplay
                loop={false}
                keepLastFrame
                src="https://assets5.lottiefiles.com/packages/lf20_x1bduhm5.json"
                style={{ height: "100px", width: "100px" }}
              ></Player>
              <h2 className="p-10  text-2xl tracking-tight text-[#272343] opacity-80 font-semibold text-sm:text-3xl sm:leading-none">
                {destination.toUpperCase()}
              </h2>
            </div>
            <div className="inline-flex justify-evenly shadow-xl bg-white rounded-3xl w-[50%] h-[20vh] items-center hover:shadow-xl hover:scale-[102%] transform transition-transform">
              <div className="flex justify-center w-full">
                <h2 className="p-10  text-3xl text-center tracking-tight text-[#272343] opacity-80 font-semibold text-sm:text-3xl sm:leading-none">
                  🏨 {itineraries?.accommodation?.placeToStay}
                </h2>
              </div>
              <div className="flex-col justify-center w-full">
                <h2 className="p-10  text-lg tracking-tight text-[#272343] opacity-80 text-sm:text-3xl sm:leading-none">
                  {itineraries?.accommodation?.description}
                </h2>
              </div>
            </div>
            {itineraries?.itinerary?.map((el, idx) => {
              return (
                <div className="flex-col justify-evenly shadow-xl bg-white rounded-3xl w-[50%] h-auto items-center p-10 hover:shadow-xl hover:scale-[102%] transform transition-transform">
                  <div className="flex justify-center w-full">
                    <h2 className=" text-4xl text-center tracking-tight text-[#272343] opacity-80 font-semibold text-sm:text-3xl sm:leading-none mb-5">
                      Day {idx + 1}
                    </h2>
                  </div>
                  <div className="grid w-full gap-10 grid-cols-3 justify-center items-center">
                    {itineraries?.itinerary[idx]?.day?.map((item, index) => {
                      return (
                        <div
                          className={`inline-flex w-full flex-col gap-4 p-10 max-w-xl h-[30vh] justify-center text-[#272343] shadow-xl rounded-3xl cursor-pointer hover:text-[#272343] bg-[#fae588] hover:bg-[#ffc7ab] hover:shadow-xl hover:scale-[105%] transform transition-transform bg-opacity-60`}
                        >
                          <h2 className="mb-2  text-2xl font-bold tracking-tight text-[#272343] text-opacity-80 text-sm:text-3xl sm:leading-none">
                            {item.placeToVisit}
                          </h2>
                          <div className="block">
                            <div className="w-full text-sm font-semibold mb-2">
                              {item.description}
                            </div>
                            <div className="w-full text-xs">
                              🕹️ {item.address}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <button onClick={() => {
              saveItineraries()
              router.push('/listrooms')
            }} className="hover:scale-105 transition-transform transform">
              <Player
                  autoplay
                  loop
                  src="https://assets5.lottiefiles.com/packages/lf20_7rgh30pc.json"
                  style={{ height: "200px", width: "200px" }}
                ></Player>
              <h2 className="text-2xl text-[#272343] font-semibold">Generate Itinerary</h2>
            </button>
          </div>
        </>
      {/* )} */}
    </main>
  );
}
