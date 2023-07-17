import Navbar from "@/components/NavbarLogin";
import useStore from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AddPlaces() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        placeToVisit: "",
        description: "",
        address: "",
        toDo: "",
    });

    const addActivity = useStore((state) => state.addActivity);

    function handleAdd(e) {
        e.preventDefault();
        if (router.query.detail) {
          formData.dayIndex = router.query.detail
          if (router.query.id) {
            addActivity(router.query.id, formData)
            router.push(`/listrooms/${router.query.id}/${router.query.detail}`)
          }
        }
        // return router.push(`/listrooms/${router.query.id}/${router.query.detail}`)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <>
        <Navbar />
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl">
                    <div className="text-center">
                        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                                <span className="relative inline-block">
                                    <svg
                                        viewBox="0 0 52 24"
                                        fill="currentColor"
                                        className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                                    >
                                        <rect
                                            fill="url(#b039bae0-fdd5-4311-b198-8557b064fce0)"
                                            width="52"
                                            height="24"
                                        />
                                    </svg>
                                    <span className="relative">Add</span>
                                </span>{" "}
                                New Places
                            </h2>
                        </div>
                        <form
                            className="flex flex-col items-center w-full mb-4 md:px-16"
                            onSubmit={handleAdd}
                        >
                            <div className="flex flex-col w-full max-w-md">
                                <label
                                    htmlFor="placeToVisit"
                                    className="mb-1 text-gray-800"
                                >
                                    Places
                                </label>
                                <input
                                    placeholder="Places"
                                    type="text"
                                    id="placeToVisit"
                                    name="placeToVisit"
                                    className="w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    onChange={handleChange}
                                    value={formData.placeToVisit}
                                />
                                <label
                                    htmlFor="description"
                                    className="mb-1 text-gray-800"
                                >
                                    Description
                                </label>
                                <input
                                    placeholder="Description"
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    onChange={handleChange}
                                    value={formData.description}
                                />
                                <label
                                    htmlFor="address"
                                    className="mb-1 text-gray-800"
                                >
                                    Address
                                </label>
                                <input
                                    placeholder="Address"
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    onChange={handleChange}
                                    value={formData.address}
                                />
                                <label
                                    htmlFor="toDo"
                                    className="mb-1 text-gray-800"
                                >
                                    To Do
                                </label>
                                <input
                                    placeholder="To Do"
                                    type="text"
                                    id="toDo"
                                    name="toDo"
                                    className="w-full h-12 px-4 mb-8 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                    onChange={handleChange}
                                    value={formData.toDo}
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-300 hover:bg-teal-400 focus:shadow-outline focus:outline-none"
                                >
                                    Add
                                </button>
                            </div>
                        </form>

                        <p className="max-w-md mx-auto mb-10 text-xs text-gray-600 sm:text-sm md:mb-16">
                            Add places you want to add to your list!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
