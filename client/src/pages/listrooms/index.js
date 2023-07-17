import Navbar from "@/components/Navbar";
import NavbarLogin from "@/components/NavbarLogin";
import useStore from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function index() {
  const router = useRouter();
  const [rooms, setRooms] = useState();
  const [loading, setLoading] = useState(true);

  // async function fetchRooms() {
  //   try {
  //     const data = await fetch("/api/findroom");
  //     const jsonData = await data.json();
  //     setRooms(jsonData.roomData);
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const fetchRooms = useStore((state) => state.fetchRooms);
  const deleteTripById = useStore((state) => state.deleteTripById);
  const fetchData = async () => {
    try {
      const roomData = await fetchRooms();
      setRooms(roomData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router?.query?.id]);
  return (
    <div>
      <NavbarLogin />
      <h1 className="text-center font-bold text-xl mt-2">List of Your Rooms</h1>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-screen-lg sm:mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-2xl text-gray-600">Loading gan...</div>
              <div className="ml-2">
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c3.042 0 5.824-1.135 7.938-3l-2.647-3A7.962 7.962 0 0112 16v4zm5.291-14H12V0c4.418 0 8 3.582 8 8h-2.647A5.985 5.985 0 0012 4.709V6h-1.291A7.962 7.962 0 0116 12z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            rooms?.map((room, idx) => (
              <div
                className="flex flex-col items-center py-4 transition duration-300 transform rounded-lg sm:px-10 lg:flex-row bg-blue-50 sm:hover:translate-x-4 sm:hover:bg-blue-200 my-4"
                key={room.id}
              >
                <div className="mb-4 lg:mb-0 w-full ">
                  <div className="relative pr-8">
                    <h5 className="mb-4 text-xl font-bold leading-none sm:text-2xl px-5 md:px-0">
                      {room.tripName}
                    </h5>
                  </div>
                </div>
                <div className="flex w-96 lg:justify-end px-10 md:px-0">
                  <Link
                    href={`/listrooms/${room._id}`}
                    aria-label=""
                    className="inline-flex font-semibold transition-colors duration-200 text-teal-300 hover:text-teal-500"
                  >
                    Enter Room
                    <svg
                      className="inline-block w-3 ml-2"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                    </svg>
                  </Link>
                  <span>
                    <button
                      onClick={() => {
                        deleteTripById(room._id);
                        fetchRooms();
                        location.reload()
                      }}
                      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
