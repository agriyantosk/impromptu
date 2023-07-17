import React, { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import selectStyles from "./selectStyles.module.css";
import useStore from "@/store";
import { Montserrat, Poppins } from "next/font/google";
const inter = Poppins({ subsets: ["latin"], weight: "400" });
import { useRouter } from "next/router";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Image from "next/image";

// const duration = 3;
const { hotels, places, duration, factory, loading } = useStore.getState();
const temp = Array.from({ length: duration }, () => []);
let tempHotel = "";

const Page = ({ offset, gradient, onClick }) => {
  const { hotels, places, duration } = useStore.getState();
  // console.log(temp);
  return (
    <>
      <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
        <div className={selectStyles.slopeBegin} />
      </ParallaxLayer>

      <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
        <div className={`${selectStyles.slopeEnd} ${selectStyles[gradient]}`} />
      </ParallaxLayer>

      <ParallaxLayer
        className={`${selectStyles.text} ${selectStyles.number}`}
        offset={offset}
        speed={0.3}
      ></ParallaxLayer>

      <ParallaxLayer offset={offset}>
        {offset === 0 ? (
          <>
          <div className="flex justify-center items-center">
            <div className="flex-col">
              <h2 className="p-6 text-8xl font-bold tracking-tight text-[#272343] sm:text-8xl sm:leading-none text-center mb-10 text-opacity-70">
                Hotels
              </h2>
              <ul class="grid w-full h-[60vh] gap-10 grid-cols-2 justify-center items-center mb-[15%]">
                {hotels.map((el, idx) => {
                  return (
                    <li
                      onClick={(e) => {
                        tempHotel = e.target.id;
                        console.log(tempHotel);
                      }}
                    >
                      <input
                        type="radio"
                        id={idx}
                        name="hotels"
                        value={idx}
                        class="hidden peer"
                        required
                      />
                      <label
                        htmlFor={idx}
                        class="inline-flex max-w-xl px-4 h-[37vh] w-[190%] items-center justify-center p-5 text-[#272343] shadow-xl rounded-xl cursor-pointer hover:text-[#272343] bg-[#f3d2c1]  peer-checked:bg-[#ffc7ab] peer-checked:text-[#272343] hover:bg-[#ffc7ab] hover:shadow-xl hover:scale-[102%] transform transition-transform"
                      >
                        <h2 className="p-6  mb-2 text-3xl font-bold tracking-tight  text-[#272343] text- sm:text-3xl sm:leading-none ">
                          {el.placeToStay}
                        </h2>
                        <div class="block">
                          <div class="w-full text-lg font-semibold">
                            {el.description}
                          </div>
                          <br />
                          <br />
                          <div class="w-full">@ {el.address}</div>
                          <br />
                          <div class="w-full">
                            Rp {el.pricePerNight.toLocaleString("id")}/night
                          </div>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
            <button type="button" onClick={onClick} className="ml-10 mb-24 shadow-lg flex items-center justify-center w-24 h-20 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      style={{ transform: "rotate(270deg)" }}
                    >
                      <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                    </svg>
            </button>
            </div>
          </div>
          </>
        ) : (
          <>
            <h2 className="p-6 mb-2 text-9xl opacity-70 font-bold tracking-tight text-[#272343] text-start sm:text-8xl sm:leading-none mr-[5%]">
              D
              <br />
              A
              <br />
              Y
              <br />
              <br />
              {offset}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = e.target.elements.places;
                console.log(e.target.elements.places, '<<<<<<<<<<<<')
                console.log(data)
                console.log(e.target.elements.places);
                for (let i = 0; i < data.length; i++) {
                  const value = +data[i].value;
                  if (data[i].checked === true) {
                    if (!temp[offset - 1].includes(value)) {
                      temp[offset - 1].push(value);
                    }
                  } else {
                    const index = temp[offset - 1].indexOf(value);
                    if (index !== -1) {
                      temp[offset - 1].splice(index, 1);
                    }
                  }
                  if(data.length - 1) factory(tempHotel, temp)
                }
                console.log(temp);
              }}
              className="flex justify-center items-center"
            >
              <ul className="grid w-full h-[15vh] gap-10 grid-cols-3 justify-center items-center mb-[50%]">
                {places.map((el, idx) => (
                  <>
                    <li key={idx} className="relative w-full">
                      <input
                        type="checkbox"
                        name="places"
                        value={idx}
                        className="peer absolute top-0 bottom-0 left-0 right-0 z-50 w-full h-full opacity-0"
                      />
                      <label
                        htmlFor="places"
                        className={`inline-flex w-full flex-col gap-4 p-10 max-w-xl h-[25vh] justify-center text-[#272343] shadow-xl rounded-xl cursor-pointer hover:text-[#272343] bg-[#f3d2c1]  peer-checked:bg-[#ffc7ab] peer-checked:text-[#272343] hover:bg-[#ffc7ab] hover:shadow-xl hover:scale-[102%] transform transition-transform`}
                      >
                        <h2 className="mb-2 text-4xl font-bold tracking-tight text-[#272343] text-sm:text-3xl sm:leading-none">
                          {el.placeToVisit}
                        </h2>
                        <div className="block">
                          <div className="w-full text-lg font-semibold mb-2">
                            {el.description}
                          </div>
                          <div className="w-full">@ {el.address}</div>
                        </div>
                      </label>
                    </li>
                  </>
                ))}
              </ul>
            <button type="submit" onClick={onClick} className="ml-10 mb-24 shadow-lg flex items-center justify-center w-24 h-20 mx-auto text-gray-600 duration-300 transform border bg-white border-gray-400 rounded-full hover:text-tosca hover:border-tosca-hover hover:shadow hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      style={{ transform: "rotate(270deg)" }}
                    >
                      <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
                    </svg>
            </button>
            </form>
          </>
        )}
      </ParallaxLayer>
    </>
  );
};

export default function MyComponent() {
  const router = useRouter();
  const parallax = useRef(null);
  const {duration, loading} = useStore.getState();
  const data = [];
  for (let i = 0; i < duration; i++) {
    data.push(i + 1);
  }

  const scroll = (to) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
    }
  };

  const factory = useStore((state) => state.factory);
  return (
    <>
      <div
      style={{ background: "#dfdfdf" }}
      className={`${inter.className} h-screen`}
    >
        <Parallax
          className={selectStyles.container}
          ref={parallax}
          pages={duration + 1}
          horizontal
        >
          {data.map((el, idx) => {
            return (
              <Page
                offset={idx + 1} //!
                gradient="pink"
                onClick={() => {
                  scroll(idx + 2);
                  console.log(data.length, idx, '>>>>>>>>>>>>><<<<<<<<<<<<<<');
                  if (idx == data.length - 1) {
                    router.push("/itinerary");
                  }
                  if (idx == 3 && data.length == 2) {
                    router.push("/itinerary");
                  }
                }}
              ></Page>
            );
          })}
          <Page offset={0} gradient="pink" onClick={() => scroll(1)} />
          <Page offset={1} gradient="teal" onClick={() => scroll(2)} />
          <Page offset={2} gradient="tomato" onClick={() => scroll(3)} />
        </Parallax>
      {/* <div className="bg-white fixed bottom-0 left-0 right-0 m-10 mx-32 h-[7vh] rounded-xl shadow-xl outline-none">
        Wizard
      </div> */}
    </div>
    </>
  );
}
