import styles from "./journal.module.css";
import button from "./detail.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStore from "@/store";
import Navbar from "@/components/NavbarLogin";

export default function Journal() {
  const router = useRouter();
  const { id } = router.query;
  // console.log(router.query)
  // console.log(id);
  const fetchJournalById = useStore((state) => state.fetchJournalById);
  const journals = useStore((state) => state.journals);
  const deleteJournal = useStore((state)=> state.deleteJournal)
  const [updated, setUpdated] = useState(false)

  async function handleDelete(journalId){
    try {
      const result = await deleteJournal(journalId,id)
      
      if(result === 'success delete'){
        // fetchJournalById(id)
        setUpdated(true)
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    fetchJournalById(id);
  }, [updated]);

  // console.log(journals, "ini Journalssssssssssssssssssssssssssssssssssss");

  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-11">
        <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>Journal</h2>
      </div>
      <div className={styles.container}>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-teal-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Expenses
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Notes
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {/* looping ini */}
              {journals?.map((el) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {el.name}
                    </th>
                    <td className="px-6 py-4">${el.expenses}</td>
                    <td className="px-6 py-4">{el.notes}</td>
                    <td className="px-6 py-4">{el.location}</td>
                    <td className="flex px-6 py-4">
                      <button
                        onClick={() => {
                          router.push(
                            `/listrooms/${router.query.id}/journal/edit/${el._id}`
                          );
                        }}
                        className={`${button.editButton}`}
                      >
                        <span className="material-icons">edit</span>
                        Edit
                      </button>
                      <button onClick={()=>{
                        handleDelete(el._id)
                      }}>
                        
                        <span className="material-icons">delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={() => {
              router.push(`/listrooms/${router.query.id}/journal/addJournal`);
            }}
            className={`${button.addBudgetButton}`}
          >
            <span className="material-icons">add_circle</span>
            JOURNAL
          </button>
        </div>
      </div>
    </>
  );
}
