import Navbar from "@/components/NavbarLogin";
import useStore from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function index() {
    const router = useRouter();
    const [pathId, setPathId] = useState("");
    const [trip, setTrip] = useState(true);
    const path = router.pathname;
    const fetchTripById = useStore((state) => state.fetchTripById);
    const tripById = useStore((state) => state.tripById);

    const [menus, setMenu] = useState([
        {
            title: "Add Member",
            emoji: "🗿",
            href: `/addmember`,
            isChildren: true,
        },
        {
            title: "Group Chat",
            emoji: "👄",
            href: `/chat`,
            isChildren: true,
        },
        {
            title: "Generate Trip",
            emoji: "🚌",
            href: `/formtrip`,
            isChildren: true,
        },
        // {
        //     title: "Letzzz Goooo",
        //     emoji: "🔥",
        //     href: "/listrooms",
        //     isChildren: false,
        // },
    ]);

    const [roomDetail, setRoomDetail] = useState(null);
    const [itinerary, updateItinerary] = useStore((state) => [
        state.itinerary,
        state.updateItinerary,
    ]);

    const fetchTripDetail = useStore((state) => state.fetchTripDetail);
    const removeParticipant = useStore((state) => state.removeParticipant);
    const fetchTrip = async () => {
      try {
          const fetchData = await fetchTripDetail(router.query.id);
          setRoomDetail(fetchData);
          if (fetchData[0].itenararies.itinerary) {
              const newMenus = menus.map((menu) => {
                  if (menu.title == "Generate Trip") {
                      menu.title = "Journal";
                      menu.emoji = "📚";
                      menu.href = "/journal";
                  }
                  return menu;
              });
              setMenu(newMenus);
          }
      } catch (error) {
          console.log(error);
      }
  };

    useEffect(() => {
        if (router.query.id) {
            setPathId(router.query.id);
            fetchTripById(router?.query?.id);
            fetchTrip();
        }
    }, [router.query.id]);
    return (
        <section>
            {roomDetail && (
                <>
                    <div>
                        <Navbar />
                        {/* <pre>
              {JSON.stringify(roomDetail[0], null, 2)}
            </pre> */}
                        <h1 className="text-center mb-2 font-bold text-xl mt-2">
                            {roomDetail[0].tripName}
                        </h1>
                        <div className="px-3 md:px-6  py-10 justify-center flex flex-wrap w-full  md:w-2/3 m-auto ">
                            {menus.map((menu) => {
                                return (
                                    <div
                                        className="w-1/2 p-4 sm:w-1/4  text-center"
                                        key={menu.title}
                                    >
                                        <Link
                                            href={
                                                menu.isChildren
                                                    ? `/listrooms/${pathId}${menu.href}`
                                                    : menu.href
                                            }
                                            className="text-center shadow-md  block font-medium tracking-wide text-white transition duration-200 rounded  focus:shadow-outline focus:outline-none "
                                        >
                                            <span className=" p-3  text-3xl rounded-3xl bg-blue-100 ">
                                                {menu.emoji}
                                            </span>
                                            <button className="w-full  h-10 px-4 mt-3  text-teal-300 rounded">
                                                {menu.title}
                                            </button>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        {/* <div className="px-6  md:py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
              <div className="flex flex-col items-center py-4 transition duration-300 transform rounded-lg sm:px-10 lg:flex-row bg-blue-50 my-4">
                <div className="mb-4 lg:mb-0 w-full">
                  <div className="relative pr-8">
                    <h5 className="mb-4 text-xl font-bold leading-none sm:text-2xl px-5 md:px-0">
                      {roomDetail[0].participants[0].name}
                    </h5>
                  </div>
                </div>
                <div className="flex w-full   lg:justify-end px-10 md:px-0">
                  <p
                    aria-label=""
                    className="inline-flex w-full flex md:items-center md:justify-center md:w-40 h-12 px-6 font-medium tracking-wide text-red-500"
                  >
                    Master Room
                  </p>
                </div>
              </div>
            </div> */}
                        <br />
                        <section className="flex flex-wrap md:w-4/5 m-auto">
                            <div className="w-full md:w-1/2 p-5">
                                <h1 className="mb-2 font-bold text-xl mt-2">
                                    <span className="text-2xl">🎫</span>
                                    Itinerary
                                </h1>

                                <div className="bg-teal-50 p-6 md:w-full m-auto rounded-2xl ">
                                    <h2 className="text-center mb-3 text-lg font-bold">
                                        {roomDetail.length > 0 &&
                                        roomDetail[0].itenararies &&
                                        roomDetail[0].itenararies.accommodation
                                            ? roomDetail[0].itenararies
                                                  .accommodation.placeToStay
                                            : ""}
                                    </h2>

                                    <div className="w-full m-auto flex flex-wrap md:flex-col items-center">
                                        {roomDetail.length > 0 &&
                                        roomDetail[0].itenararies &&
                                        roomDetail[0].itenararies.itinerary &&
                                        roomDetail[0].itenararies.itinerary
                                            .length > 0 ? (
                                            roomDetail[0].itenararies.itinerary.map(
                                                (itinerary, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            router.push(
                                                                `/listrooms/${pathId}/${index}`
                                                            );
                                                        }}
                                                        className="bg-blue-200 w-full mb-8 md:w-4/5"
                                                    >
                                                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                                Day {index + 1}
                                                            </h5>
                                                            <div
                                                                className="flex flex-row justify-between"
                                                                style={{
                                                                    overflow:
                                                                        "hidden",
                                                                }}
                                                            >
                                                                {itinerary?.day?.map(
                                                                    (
                                                                        place,
                                                                        i
                                                                    ) => (
                                                                        <React.Fragment
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            <a
                                                                                style={{
                                                                                    fontWeight:
                                                                                        "bold",
                                                                                }}
                                                                                className="font-normal text-gray-700 dark:text-gray-400"
                                                                            >
                                                                                {
                                                                                    place.placeToVisit
                                                                                }
                                                                            </a>
                                                                            {i !==
                                                                                itinerary
                                                                                    ?.day
                                                                                    ?.length -
                                                                                    1 && (
                                                                                <p className="font-large text-black dark:text-gray-400">
                                                                                    |
                                                                                </p>
                                                                            )}
                                                                        </React.Fragment>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p>No itinerary available.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2  p-5">
                                <h1 className="mb-2 font-bold text-xl mt-2">
                                    <span className="text-2xl">👯</span>
                                    Members
                                </h1>
                                <div>
                                    <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-2">
                                        {roomDetail[0].participants.map(
                                            (participant) => (
                                                <div
                                                    className="flex flex-row md:flex-col items-center py-4 transition duration-300 transform rounded-lg sm:px-10 lg:flex-row bg-blue-50 my-4"
                                                    key={participant.id}
                                                >
                                                    <div className="mb-4 lg:mb-0 w-1/2">
                                                        <div className="relative pr-8 flex flex-row items-center gap-3">
                                                            <img
                                                                src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${participant.name}`}
                                                                className="rounded-full w-20 h-20 ml-5 md:ml-0"
                                                            />
                                                            <div>
                                                                <h5 className=" text-xl font-bold leading-none sm:text-2xl px-5 md:px-0">
                                                                    {
                                                                        participant.name
                                                                    }
                                                                </h5>
                                                                <p className="opacity-50 mt-2 md:mt-0 leading-none md:text-base px-5 md:px-0">
                                                                    {
                                                                        participant.phoneNumber
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex w-1/2 justify-end px-5 md:px-0  ">
                                                        {participant._id !==
                                                        roomDetail[0]
                                                            .tripMaster ? (
                                                            <button
                                                                onClick={async () => {
                                                                    if (
                                                                        router
                                                                            .query
                                                                            .id
                                                                    ) {
                                                                        await removeParticipant(
                                                                            router
                                                                                .query
                                                                                .id,
                                                                            participant._id
                                                                        );
                                                                        await fetchTrip()
                                                                    }
                                                                }}
                                                                aria-label=""
                                                                className="inline-flex items-center justify-center w-36 h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-accent-400 hover:bg-red-accent-700 focus:shadow-outline focus:outline-none"
                                                            >
                                                                Kick
                                                            </button>
                                                        ) : (
                                                            <span className="text-3xl">
                                                                👑
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </section>
    );

    //   return (
    //     <>
    //         <div>
    //             <Navbar />
    //             <h1 className="text-center mb-2 font-bold text-xl mt-2">
    //                 {tripById[0]?.tripName}
    //             </h1>
    //             <div className="px-3 md:px-6  py-10 justify-center flex flex-wrap w-full  md:w-2/3 m-auto ">
    //                 {menus.map((menu) => {
    //                     return (
    //                         <div className="w-1/2 p-4 sm:w-1/4  text-center">
    //                             <a
    //                                 href={
    //                                     menu.isChildren
    //                                         ? `/listrooms/${pathId}${menu.href}`
    //                                         : menu.href
    //                                 }
    //                                 className="text-center shadow-md  block font-medium tracking-wide text-white transition duration-200 rounded  focus:shadow-outline focus:outline-none "
    //                             >
    //                                 <span className=" p-3  text-3xl rounded-3xl bg-blue-100 ">
    //                                     {menu.emoji}
    //                                 </span>
    //                                 <button className="w-full  h-10 px-4 mt-3  text-teal-300 rounded">
    //                                     {menu.title}
    //                                 </button>
    //                             </a>
    //                         </div>
    //                     );
    //                 })}
    //             </div>
    //             {tripById ? (
    //                 tripById[0]?.participants?.map((el) => {
    //                     return (
    //                         <div className="px-6 md:py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
    //                             <div className="flex flex-col items-center py-4 transition duration-300 transform rounded-lg sm:px-10 lg:flex-row bg-blue-50 my-4">
    //                                 <div className="mb-4 lg:mb-0 w-full">
    //                                     <div className="relative pr-8">
    //                                         <h5 className="mb-4 text-xl font-bold leading-none sm:text-2xl px-5 md:px-0">
    //                                             {el.name}
    //                                         </h5>
    //                                     </div>
    //                                 </div>
    //                                 <div className="flex w-full lg:justify-end px-10 md:px-0">
    //                                     <p
    //                                         aria-label=""
    //                                         className="inline-flex w-full flex md:items-center md:justify-center md:w-40 h-12 px-6 font-medium tracking-wide text-red-500"
    //                                     >
    //                                         Master Room
    //                                     </p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     );
    //                 })
    //             ) : (
    //                 <p>Loading participants...</p>
    //             )}

    //             <br />
    //             <section className="flex flex-wrap md:w-4/5 m-auto">
    //                 <div className="w-full md:w-1/2 p-5">
    //                     <h1 className="mb-2 font-bold text-xl mt-2">
    //                         <span className="text-2xl">🎫</span>
    //                         Itinerary
    //                     </h1>
    //                     <div className="bg-teal-50 p-6 md:w-full m-auto rounded-2xl ">
    //                         <h2 className="text-center mb-3">
    //                             Hotel Citra Lestari
    //                         </h2>
    //                         <div className="w-full m-auto   flex flex-wrap md:flex-col items-center">
    //                             {/* card 1 */}
    //                             {/* <div
    //                                 onClick={() => {
    //                                     router.push(`/listrooms/${pathId}/1`);
    //                                 }}
    //                                 className="bg-blue-200 w-full md:w-4/5"
    //                             > */}
    //                             {tripById[0]?.itenararies?.itinerary.map(
    //                                 (el, index) => {
    //                                     return (
    //                                         <Link
    //                                             href={`/listrooms/${pathId}/${index}`}
    //                                         >
    //                                             <div className=" w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    //                                                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //                                                     Day {index + 1}
    //                                                 </h5>
    //                                                 <span>
    //                                                     <div
    //                                                         className="flex flex-row justify-between"
    //                                                         style={{
    //                                                             overflow:
    //                                                                 "hidden",
    //                                                         }}
    //                                                     >
    //                                                         <p
    //                                                             style={{
    //                                                                 fontWeight:
    //                                                                     "bold",
    //                                                             }}
    //                                                             className="font-normal text-gray-700 dark:text-gray-400"
    //                                                         >
    //                                                             {tripById[0]?.itenararies?.itinerary[
    //                                                                 index
    //                                                             ].day.map(
    //                                                                 (
    //                                                                     el,
    //                                                                     idx
    //                                                                 ) => {
    //                                                                     if (
    //                                                                         idx ===
    //                                                                         tripById[0]
    //                                                                             ?.itenararies
    //                                                                             ?.itinerary[
    //                                                                             index
    //                                                                         ]
    //                                                                             .day
    //                                                                             .length -
    //                                                                             1
    //                                                                     ) {
    //                                                                         return `${el.placeToVisit}`;
    //                                                                     } else {
    //                                                                         return `${el.placeToVisit}, `;
    //                                                                     }
    //                                                                 }
    //                                                             )}
    //                                                         </p>
    //                                                     </div>
    //                                                 </span>
    //                                             </div>
    //                                         </Link>
    //                                     );
    //                                 }
    //                             )}
    //                             {/* HARUSNYA DISINI BISA DI LOOP BUAT DAY SAMA KEGIATAN PER HARI NYA */}
    //                             {/* </div> */}
    //                         </div>
    //                     </div>
    //                 </div>

    //                 {/* <div className="w-full md:w-1/2  p-5">
    //                     <h1 className="mb-2 font-bold text-xl mt-2">
    //                         <span className="text-2xl">👯</span>
    //                         Members
    //                     </h1>
    //                     <div>
    //                         <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-2">
    //                             <div className="flex flex-row md:flex-col items-center py-4 transition duration-300 transform rounded-lg sm:px-10 lg:flex-row bg-blue-50 my-4">
    //                                 <div className="mb-4 lg:mb-0 w-1/2">
    //                                     <div className="relative pr-8 flex flex-row items-center gap-3">
    //                                         <img
    //                                             src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Rocky"
    //                                             className="rounded-full w-20 h-20 ml-5 md:ml-0"
    //                                         />
    //                                         <div>
    //                                             <h5 className=" text-xl font-bold leading-none sm:text-2xl px-5 md:px-0">
    //                                                 Rocky
    //                                             </h5>
    //                                             <p className="opacity-50 mt-2 md:mt-0 leading-none md:text-base px-5 md:px-0">
    //                                                 123133132
    //                                             </p>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div className="flex w-1/2 justify-end px-5 md:px-0  ">
    //                                     <button
    //                                         aria-label=""
    //                                         className="inline-flex items-center justify-center w-36 h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-accent-400 hover:bg-red-accent-700 focus:shadow-outline focus:outline-none"
    //                                     >
    //                                         Kick
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div> */}
    //             </section>
    //         </div>
    //     </>
    // );
}
