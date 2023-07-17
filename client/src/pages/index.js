import { Poppins } from "next/font/google";
const inter = Poppins({ subsets: ["latin"], weight: "400" });
const interBold = Poppins({ subsets: ["latin"], weight: "700" });
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useState, useRef, Fragment,  useContext, useEffect} from "react";
import { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";
import { AuthContext } from "@/context/auth-context";

export default function App() {
  let [isOpen, setIsOpen] = useState(false);

  const alignCenter = { display: "flex", alignItems: "center" };
  const parallax = useRef(null);
  const [textColor, setTextColor] = useState("text-[#feffea]");
  const authContext = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");

    authContext.setAuthState({
        access_token: "",
    });
}

  const handleScroll = () => {
    if (
      (parallax.current?.current > 681 && parallax.current?.current < 2200) ||
      parallax.current?.current > 3200
    ) {
      console.log(parallax.current);
      console.log(parallax.current?.current);
      setTextColor("text-black");
    } else setTextColor("text-[#feffea]");
  };
  // const handleNav = () => {
  //   if (parallax.current?.current > 100) {
  //     setOpacity("");
  //   } else setOpacity("opacity-0");
  // };

  const router = useRouter();

  useEffect(() => {
    const container = document.querySelector(".my-class-name");
    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <main className={`${inter.className}`}>
        <Parallax pages={5} className="my-class-name" ref={parallax}>
          <ParallaxLayer offset={2.2} factor={1.1} className="bg-[#46605a]" />
          <ParallaxLayer offset={4.6} factor={1} className="bg-[#46605a]" />
          <ParallaxLayer offset={3.9} >
            <div className="flex justify-center items-center">
                <h2 className="text-9xl font-bold transform transition-transform hover:scale-105 cursor-pointer" onClick={() => {
                  if (!localStorage.access_token) router.push("/login");
                  else router.push("/createtrip");
                }}>Get Started.</h2>
            </div>
          </ParallaxLayer>
          <ParallaxLayer sticky={{ start: 0, end: 0.4 }}>
            {!isOpen ? (
              <h2 className="absolute top-0 flex flex-col justify-center items-end text-end p-4 w-[100%] h-[100%] text-9xl font-bold tracking-tight text-[#feffea]">
                Traveling
                <br />
                Made
                <br />
                Easy
              </h2>
            ) : (
              ""
            )}
          </ParallaxLayer>
          <ParallaxLayer sticky={{ start: 0, end: 0 }}>
            <div
              className={`absolute top-0 flex flex-col justify-start items-start p-4 w-[100%] h-[100%] text-5xl font-bold tracking-tight ${textColor} z-50 relative cursor-pointer`}
              onClick={() => {
                if (!isOpen) setIsOpen(true);
                if (isOpen) setIsOpen(false);
              }}
            >
              {!isOpen ? "Impromptu" : ""}
              {isOpen && (
                <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50"></div>
              )}
              {isOpen && (
                <>
                  <div className="flex flex-col justify-center items-start p-10 z-50 gap-12">
                    <h2
                      className="text-9xl hover:scale-105 transform transition-transform"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Home
                    </h2>
                    <h2
                      className="hover:scale-105 transform transition-transform"
                      onClick={(e) => {
                        if (!localStorage.access_token) router.push("/login");
                        else router.push("/listrooms");
                      }}
                    >
                      My Trips
                    </h2>
                    <h2
                      className="hover:scale-105 transform transition-transform"
                      onClick={(e) => {
                        if (!localStorage.access_token) router.push("/login");
                        else router.push("/createtrip");
                      }}
                    >
                      Create Trip
                    </h2>
                    <h2
                      className="hover:scale-105 transform transition-transform"
                      onClick={() => {
                        if (!localStorage.access_token) router.push("/login");
                        else router.push("/friends");
                      }}
                    >
                      Friends
                    </h2>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {!localStorage.access_token && (
                      <div className="flex flex-col gap-6">
                        <h2
                          className="hover:scale-105 transform transition-transform"
                          onClick={() => {
                            router.push("/register");
                          }}
                        >
                          Register
                        </h2>
                        <h2
                          className="hover:scale-105 transform transition-transform"
                          onClick={() => {
                            router.push("/login");
                          }}
                        >
                          Login
                        </h2>
                      </div>
                    )}
                    {localStorage.access_token && (
                      <h2
                      className="hover:scale-105 transform transition-transform"
                      onClick={(e) => {
                        e.preventDefault()
                        handleLogout()
                      }}
                    >
                      Logout
                    </h2>
                    )}
                  </div>
                </>
              )}
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={0} speed={0.5}>
            <div className={`w-[100%] h-screen ${inter.className}`}>
              <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-20"></div>
              <video
                src={require("../public/video.mp4")}
                autoPlay
                loop
                muted
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
          </ParallaxLayer>

          <ParallaxLayer sticky={{ start: 0.9, end: 1.29 }}>
            <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
              <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                <h2
                  className={`p-6 rounded-xl mb-2 text-8xl tracking-tight font-extrabold bg-blue-gray-700 text-[#fffffe] sm:leading-none`}
                >
                  WHY CHOOSE
                  <br />
                </h2>
                <h2 className="pl-6 mb-5 font-sans text-8xl font-bold tracking-tight text-blue-gray-700 sm:text-8xl sm:leading-none">
                  US ?
                </h2>
                {/* <div className="flex items-center"></div> */}
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={1.5}
            style={{ ...alignCenter, justifyContent: "flex-end" }}
          >
            <div className="flex justify-start items-center p-5 w-[40%] mr-[10%] bg-white rounded-2xl shadow-xl bg-opacity-70">
              <div className="flex">
                {/* <img
                  src="https://uploads-ssl.webflow.com/6327547b5d9308ec5ae8092b/6327547b5d9308e7eae80c2a_solo%2520travel-p-800.jpeg"
                  className="w-1/3 rounded-xl object-cover"
                /> */}
                <Player
                  autoplay
                  loop
                  src="https://assets7.lottiefiles.com/packages/lf20_ogx9s7qo.json"
                  style={{ height: "200px", width: "200px" }}
                ></Player>
                <div className="text-left p-5">
                  <h2 className="mb-5 font-sans text-xl font-bold tracking-tight text-blue-gray-700 sm:leading-none">
                    <span className={` ${interBold.className}`}>
                      Tailored Itineraries
                    </span>{" "}
                    for Unforgettable Experiences
                  </h2>
                  <p className="mb-3 text-sm text-gray-900">
                    Our AI-powered travel planner app offers tailored
                    itineraries for unforgettable experiences. Our advanced
                    algorithms analyze your preferences to craft personalized
                    journeys that match your unique travel style. Discover
                    destinations, attractions, and activities aligned with your
                    interests for an extraordinary adventure.
                  </p>
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.3}
            speed={1.5}
            style={{ ...alignCenter, justifyContent: "flex-end" }}
          >
            <div className="flex justify-start items-center p-5 w-[40%] mr-[10%] bg-white rounded-2xl shadow-xl bg-opacity-70">
              <div className="flex">
                <Player
                  autoplay
                  loop
                  src="https://assets7.lottiefiles.com/packages/lf20_Tdoufu.json"
                  style={{ height: "200px", width: "200px" }}
                ></Player>
                <div className="text-left p-5">
                  <h2 className="mb-5 font-sans text-xl font-bold tracking-tight text-blue-gray-700 sm:leading-none">
                    <span className={` ${interBold.className}`}>
                      Comprehensive Destination Insights
                    </span>
                  </h2>
                  <p className="mb-3 text-sm text-gray-900">
                    Explore with confidence using our app's comprehensive
                    destination insights. Unlock valuable information about
                    popular tourist spots, hidden gems, and local
                    recommendations.
                  </p>
                </div>
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1.6}
            speed={1.5}
            style={{ ...alignCenter, justifyContent: "flex-end" }}
          >
            <div className="flex justify-start items-center p-5 w-[40%] mr-[10%] bg-white rounded-2xl shadow-xl bg-opacity-70">
              <div className="flex">
                <Player
                  autoplay
                  loop
                  src="https://assets6.lottiefiles.com/private_files/lf30_yjwwflqe.json"
                  style={{ height: "200px", width: "200px" }}
                ></Player>
                <div className="text-left p-5">
                  <h2 className="mb-5 font-sans text-xl font-bold tracking-tight text-blue-gray-700 sm:leading-none">
                    <span className={` ${interBold.className}`}>
                      Seamless User Experience for Effortless Travel Planning
                    </span>{" "}
                  </h2>
                  <p className="mb-3 text-sm text-gray-900">
                    Our AI-powered travel planner app offers a seamless user
                    experience, making travel planning effortless and enjoyable.
                    With an intuitive interface and user-friendly design,
                    navigating through destinations, creating itineraries, and
                    collaborating with travel companions is a breeze.
                  </p>
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer sticky={{ start: 2.3, end: 2.7 }}>
            <div className="relative flex flex-col items-end w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
              <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                <h2 className="mb-5 font-sans text-8xl font-bold tracking-tight text-[#feffea] sm:text-8xl sm:leading-none">
                  About
                  <br />
                  <span className="mb-5 font-sans text-8xl font-bold tracking-tight text-black sm:text-8xl sm:leading-none">
                    US
                  </span>
                </h2>
                <div className="flex items-center"></div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.2}
            speed={1.5}
            style={{ ...alignCenter, justifyContent: "flex-start" }}
          >
            <div className="flex justify-center items-center p-5 w-[25%] h-[23vh] ml-[20%] bg-[#feffea] rounded-full shadow-xl">
              <div className="flex flex-col">
                <Player
                  autoplay
                  loop
                  src="https://assets7.lottiefiles.com/packages/lf20_8pL7DHZXvo.json"
                  style={{ height: "150px", width: "200px" }}
                ></Player>
                <div className="text-center p-5">
                  <h2 className="mb-5 font-sans text-xl font-bold tracking-tight text-blue-gray-700 sm:leading-none">
                    <span className={` ${interBold.className}`}>Rocky</span>{" "}
                  </h2>
                  <p className="mb-3 text-sm text-gray-900">
                    Frontend Developer
                  </p>
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.45}
            speed={1.5}
            style={{ ...alignCenter, justifyContent: "flex-start" }}
          >
            <div className="flex justify-center items-center p-5 w-[25%] h-[23vh] ml-[20%] bg-[#feffea] rounded-full shadow-xl">
              <div className="flex flex-col">
                <Player
                  autoplay
                  loop
                  src="https://assets7.lottiefiles.com/packages/lf20_NODCLWy3iX.json"
                  style={{ height: "170px", width: "200px" }}
                ></Player>
                <div className="text-center p-5">
                  <h2 className="mb-5 font-sans text-xl font-bold tracking-tight text-blue-gray-700 sm:leading-none">
                    <span className={` ${interBold.className}`}>Griyan</span>{" "}
                  </h2>
                  <p className="mb-3 text-sm text-gray-900">
                    Frontend Developer
                  </p>
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.7}
            speed={1.5}
            style={{ ...alignCenter, justifyContent: "flex-start" }}
          >
            <div className="flex justify-center items-center p-5 w-[25%] h-[23vh] ml-[20%] bg-[#feffea] rounded-full shadow-xl">
              <div className="flex flex-col">
                <Player
                  autoplay
                  loop
                  src="https://assets7.lottiefiles.com/packages/lf20_8pL7DHZXvo.json"
                  style={{ height: "150px", width: "200px" }}
                ></Player>
                <div className="text-center p-5">
                  <h2 className="mb-5 font-sans text-xl font-bold tracking-tight text-blue-gray-700 sm:leading-none">
                    <span className={` ${interBold.className}`}>Sarido</span>{" "}
                  </h2>
                  <p className="mb-3 text-sm text-gray-900">
                    Frontend Developer
                  </p>
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.95}
            speed={1.5}
            style={{ ...alignCenter, justifyContent: "flex-start" }}
          >
            <div className="flex justify-center items-center p-5 w-[25%] h-[23vh] ml-[20%] bg-[#feffea] rounded-full shadow-xl">
              <div className="flex flex-col">
                <Player
                  autoplay
                  loop
                  src="https://assets7.lottiefiles.com/packages/lf20_NODCLWy3iX.json"
                  style={{ height: "170px", width: "200px" }}
                ></Player>
                <div className="text-center p-5">
                  <h2 className="mb-5 font-sans text-xl font-bold tracking-tight text-blue-gray-700 sm:leading-none">
                    <span className={` ${interBold.className}`}>Al</span>{" "}
                  </h2>
                  <p className="mb-3 text-sm text-gray-900">
                    Frontend Developer
                  </p>
                </div>
              </div>
            </div>
          </ParallaxLayer>
        </Parallax>
      </main>
    </div>
  );
}

{
  /* <Navbar /> */
}
{
  /* <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
              <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                <svg
                  className="absolute left-0 hidden h-full text-[#feffea] transform -translate-x-1/2 lg:block"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  preserveAspectRatio="none slice"
                >
                  <path d="M50 0H100L50 100H0L50 0Z" />
                </svg>
                <img
                  className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                  src="https://lh3.googleusercontent.com/odWomoR0qxcQLEtz3EC6YiK-IYcCMdKpMGbUqwrY8OoFOcPO85w4y-fff0yIlEImPucjhWizixL2T66mittY1e99CT-v_wPX_EMCiQMD"
                  alt=""
                />
              </div>
              <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                  <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                    Make Traveling <span className="text-tosca-light">easier</span>{" "}
                    and <span className="text-tosca-light">happier</span> with
                    everyone you want
                  </h2>
                  <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                    Discover seamless travel experiences on our user-friendly
                    website. Plan itineraries,explore hidden gems, and connect
                    with fellow travelers. Handpicked options for all budgets.
                    Join us now and unlock a world of possibilities!
                  </p>
                  <div className="flex items-center">
                    <a
                      href="/"
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-tosca-light hover:bg-tosca-hover focus:shadow-outline focus:outline-none"
                    >
                      Get started
                    </a>
                    <a
                      href="/"
                      aria-label=""
                      className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-tosca-hover"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div> */
}

{
  /* <ParallaxLayer
            offset={1}
            speed={1.5}
            style={{
              ...alignCenter,
              justifyContent: "flex-end",
              position: "relative",
              zIndex: 2,
            }}
            className="bg-white"
          >
            <div className="flex flex-col justify-start items-center p-5 w-[40%] h-[20rem] mr-[10%]">
              <div>
                <h2 className="mb-5 font-sans text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-none text-center">
                  Test 1
                </h2>
                <p className="mb-3 text-sm text-gray-900">Testing</p>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            sticky={{ start: 1, end: 1.4 }}
            className="bg-[#61c3fe]"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
              <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                <h2 className="mb-5 font-sans text-8xl font-bold tracking-tight text-white sm:text-8xl sm:leading-none">
                  WHY CHOOSE
                  <br />
                  <span className="text-black">US ?</span>
                </h2>
                <div className="flex items-center"></div>
              </div>
            </div>
          </ParallaxLayer> */
}

{
  /* <ParallaxLayer
            offset={0.9999}
            speed={1}
            factor={2.5}
            style={{ backgroundColor: "#e3f6f5" }} //#61c3fe
          /> */
}
