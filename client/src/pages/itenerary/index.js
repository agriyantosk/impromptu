import { useRouter } from "next/router";
import styles from "./detail.module.css";

export default function Itenerary() {
    const router = useRouter()
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <h1 className={styles.head}>Water Boom Room</h1>
      </div>

      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <div className={styles.list}>
          <div className={styles.titleMaster}>
            <img
              className="w-7 h-7 rounded-full"
              src="https://i.pinimg.com/originals/58/c3/94/58c394c44c33578ec3c0c06082a44786.jpg"
              alt="Rounded avatar"
            />
            <h3 style={{ marginLeft: "10px" }}>Rocky</h3>
          </div>
          <p style={{ fontSize: "large" }}>Master Room</p>
        </div>
      </div>

      <div className="bg-teal-50" style={{width:'40%',margin:'auto',borderRadius:'10px',marginBottom:'100px'}}>
        <h2 className="text-center" style={{fontSize:'25px',marginBottom: '20px'}}>Hotel Citra Lestari</h2>

          <div style={{ width: "40%", margin: "auto" }}>
            {/* card 1 */}
            <div onClick={()=>{
                router.push('/itenerary/1')
            }} style={{marginBottom: '15px'}}>
                <div
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Day 1
                </h5>

                <div
                    className="flex flex-row justify-between"
                    style={{ overflow: "hidden" }}
                >
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Monas
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Ancol
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Dufan{" "}
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    JIS
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Monas
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Ancol
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                </div>
                </div>
            </div>

            {/* card 2 */}

            <div className="py-10">
                <div
                onClick={()=>{
                    router.push('/itenerary/2')
                }}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Day 1
                </h5>
                <div
                    className="flex flex-row justify-between"
                    style={{ overflow: "hidden" }}
                >
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Monas
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Ancol
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Dufan{" "}
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    JIS
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Monas
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                    <a
                    style={{ fontWeight: "bold" }}
                    className="font-normal text-gray-700 dark:text-gray-400"
                    >
                    Ancol
                    </a>
                    <p className="font-large text-black dark:text-gray-400">|</p>
                </div>
                </div>
            </div>  

          
          </div>
      </div>

      <h2 className="text-center" style={{fontSize:'25px',marginBottom: '20px'}}>Member</h2>


      {/* member */}

      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <div className={styles.list}>
          <div className={styles.titleMaster}>
            <img
              className="w-7 h-7 rounded-full"
              src="https://i.pinimg.com/originals/58/c3/94/58c394c44c33578ec3c0c06082a44786.jpg"
              alt="Rounded avatar"
            />
            <h3 style={{ marginLeft: "10px" }}>Gryan</h3>
          </div>
          <p style={{ fontSize: "large" }}></p>
        </div>
      </div>

      {/* member */}

      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <div className={styles.list}>
          <div className={styles.titleMaster}>
            <img
              className="w-7 h-7 rounded-full"
              src="https://i.pinimg.com/originals/58/c3/94/58c394c44c33578ec3c0c06082a44786.jpg"
              alt="Rounded avatar"
            />
            <h3 style={{ marginLeft: "10px" }}>Al</h3>
          </div>
          <p style={{ fontSize: "large" }}></p>
        </div>
      </div>

      {/* member */}

      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <div className={styles.list}>
          <div className={styles.titleMaster}>
            <img
              className="w-7 h-7 rounded-full"
              src="https://i.pinimg.com/originals/58/c3/94/58c394c44c33578ec3c0c06082a44786.jpg"
              alt="Rounded avatar"
            />
            <h3 style={{ marginLeft: "10px" }}>Sarido</h3>
          </div>
          <p style={{ fontSize: "large" }}></p>
        </div>
      </div>




      <div className="flex flex-col text-center" style={{maxWidth:'30%',margin:'auto'}}>
        <a href="#" className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-teal-300 hover:bg-teal-500 focus:shadow-outline focus:outline-none" style={{marginBottom:'10px'}}>Chat Room</a>
        <a href="#" className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-teal-300 hover:bg-teal-500 focus:shadow-outline focus:outline-none"style={{marginBottom:'10px'}}>Journal</a>
        <a href="#" className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-teal-300 hover:bg-teal-500 focus:shadow-outline focus:outline-none"style={{marginBottom:'10px'}}>Let's GOOOO</a>
        <a href="#" className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-teal-300 hover:bg-teal-500 focus:shadow-outline focus:outline-none"style={{marginBottom:'10px'}}>Add Member</a>
      </div>
      
    </>
  );
}
