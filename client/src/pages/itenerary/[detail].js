import { useRouter } from "next/router";

import styles from "./detail.module.css";

export default function Detail({ params }) {
    const router = useRouter();

    return (
        <>
            <div>
                <h3 className={styles.head}>Nama Hotel</h3>
            </div>

            <div className="mt-9" style={{ maxWidth: "80%", margin: "auto" }}>
                <h2 className={styles.day}>Day 1</h2>
                <div className={styles.list}>
                    <h3 className={styles.title}>Monas</h3>
                    <div className="flex flex-row">
                        <button className={styles.editButton}>Edit</button>
                        <button className={styles.deleteButton}>Delete</button>
                    </div>
                </div>
                <div className={styles.list}>
                    <h3 className={styles.title}>Taman Safari</h3>
                    <div className="flex flex-row">
                        <button className={styles.editButton}>Edit</button>
                        <button className={styles.deleteButton}>Delete</button>
                    </div>
                </div>
                <div className={styles.list}>
                    <h3 className={styles.title}>Pantai Ancol</h3>
                    <div className="flex flex-row">
                        <button className={styles.editButton}>Edit</button>
                        <button className={styles.deleteButton}>Delete</button>
                    </div>
                </div>
                <div className={styles.list}>
                    <h3 className={styles.title}>Hambalang</h3>
                    <div className="flex flex-row">
                        <button className={styles.editButton}>Edit</button>
                        <button className={styles.deleteButton}>Delete</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-11">
                <button
                    onClick={() => {
                        router.push("/addPlaces");
                    }}
                    type="button"
                    class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    Add Places
                </button>
            </div>
            <div className="flex justify-center mt-5">
                <button
                    type="button"
                    class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    Let's GOO
                </button>
            </div>
        </>
    );
}
