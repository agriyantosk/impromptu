import { useRouter } from "next/router";
import styles from "./detail.module.css";
import Link from "next/link";
import useStore from "@/store";
import { useEffect } from "react";
import ModalForm from "@/components/modalForm";
import Navbar from "@/components/NavbarLogin";

export default function Detail({ params }) {
    const router = useRouter();
    // function toAdd(place_id) {
    //     router.push(
    //         `/listrooms/${router.query.id}/${router.query.detail}/addbudget/${place_id}`
    //     );
    // }
    function toEdit(place_id) {
        router.push(
            `/listrooms/${router.query.id}/${router.query.detail}/editbudget/${place_id}`
        );
    }

    const tripById = useStore((state) => state.tripById);
    const fetchTripById = useStore((state) => state.fetchTripById);
    const deleteActivity = useStore((state) => state.deleteActivity);

    useEffect(() => {
        if (router.query.id) {
            fetchTripById(router?.query?.id);
        }
    }, [router.query.id]);
    const activity =
        tripById[0]?.itenararies?.itinerary[router.query.detail].day;
    return (
        <>
        <Navbar />
            {/* <div>
                <h3 className={styles.head}>Nama Hotel</h3>
            </div> */}

            <div className="mt-9" style={{ maxWidth: "80%", margin: "auto" }}>
                <h2 className={styles.day}>Day 1</h2>
                <h2 className={styles.day}>
                    Budget:{" "}
                    {tripById && Number(tripById[0]?.itenararies?.itinerary[
                        router?.query?.detail
                    ]?.budget).toLocaleString("id-ID", {style:"currency", currency:"IDR"})}
                </h2>
                <span>
                    <button
                        className={`${styles.editButton}`}
                        onClick={() => toEdit(1)}
                    >
                        <span className="material-icons">edit</span>
                        Edit
                    </button>
                </span>
                {activity?.map((el, index) => {
                    return (
                        <div className={styles.list}>
                            <h3 className={styles.title}>{el.placeToVisit}</h3>
                            <h3 className={styles.title}>{el.toDo}</h3>
                            <h3 className={styles.title}>{el.description}</h3>
                            <h3 className={styles.title}>{el.address}</h3>
                            <div className="flex flex-row">
                                <button
                                    className={`${styles.addBudgetButton}`}
                                    onClick={() => toAdd(1)}
                                >
                                    <span className="material-icons">
                                        add_circle
                                    </span>
                                    Budget
                                </button>
                                <button
                                    className={`${styles.editButton}`}
                                    onClick={() => toEdit(1)}
                                >
                                    <span className="material-icons">edit</span>
                                    Edit
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => {
                                        if (router.query.detail) {
                                            if (router.query.id) {
                                                deleteActivity(
                                                    router.query.id,
                                                    router.query.detail,
                                                    index
                                                );
                                                fetchTripById(
                                                    router?.query?.id
                                                );
                                            }
                                        }
                                    }}
                                >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="-18 0 60 40"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center mt-11">
                <button
                    onClick={() => {
                        router.push(
                            `/listrooms/${router.query.id}/${router.query.detail}/addPlaces`
                        );
                    }}
                    type="button"
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    Add Places
                </button>
            </div>
        </>
    );
}
