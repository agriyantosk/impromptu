import useStore from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "@/components/NavbarLogin";
import slide from '../detail.module.css'


export default function EditJournal() {
  const router = useRouter();
  const fetchOneJournal = useStore((state) => state.fetchOneJournal);
  const editJournal = useStore((state) => state.editJournal);
  const [journal, updateJournal] = useStore((state) => [
    state.journal,
    state.updateJournal,
  ]);


  const { journal_id } = router.query;
  const { id } = router.query;
  // console.log(journal_id);

  const [name, updateName] = useStore((state) => [
    state.name,
    state.updateName,
  ]);
  const [expenses, updateExpenses] = useStore((state) => [
    state.expenses,
    state.updateExpenses,
  ]);
  const [notes, updateNotes] = useStore((state) => [
    state.notes,
    state.updateNotes,
  ]);
  const [location, updateLocation] = useStore((state) => [
    state.location,
    state.updateLocation,
  ]);



  useEffect(() => {
    if (journal_id) {
      fetchOneJournal(journal_id);
    }
  }, [journal_id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await editJournal(journal_id,id)
      if(result == 'succes edit') {
        router.push(`/listrooms/${router.query.id}/journal`);
      }
    } catch (error) {
      console.log(error);
    }
    
    
  }

  // console.log(journal, "INI JOURNAL SEBIJIIIII");

  return (
    <>
      {/* <pre>{journal}</pre> */}
      <Navbar />

      <div className={slide.section1}>

      <h2 className="flex justify-center mt-11" style={{ fontSize: "25px" }}>
        Edit Journal
      </h2>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 ">
                <div className="mb-5">
                  <label
                    for="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={name}
                    onChange={(e) => {
                      updateName(e.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full px-3 ">
                <div className="mb-5">
                  <label
                    for="expense"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Expenses
                  </label>
                  <input
                    type="number"
                    name="expenses"
                    id="expenses"
                    value={expenses}
                    onChange={(e) => {
                      updateExpenses(e.currentTarget.value);
                    }}
                    placeholder="your money here"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                for="notes"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Notes
              </label>
              <input
                type="text"
                name="notes"
                id="notes"
                value={notes}
                onChange={(e) => {
                  updateNotes(e.currentTarget.value);
                }}
                placeholder="Ex: saya ke bandung buat cari jodoh"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                for="location"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={(e) => {
                  updateLocation(e.currentTarget.value);
                }}
                placeholder="Jakartaaaaa"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div>
              <button className="hover:bg-teal-400 active:bg-teal-200 rounded-md bg-teal-200  py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>

    </>
  );
}
