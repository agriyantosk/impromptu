import Navbar from "@/components/NavbarLogin";
import useStore from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import slide from './detail.module.css'


export default function AddJournal() {
  const router = useRouter();

  const {id} = router.query
  // console.log(id);
 

  const [name,updateName] = useStore((state)=>[
    state.name,
    state.updateName
  ])
  const [expenses,updateExpenses] = useStore((state)=>[
    state.expenses,
    state.updateExpenses
  ])
  const [notes,updateNotes] = useStore((state)=>[
    state.notes,
    state.updateNotes
  ])
  const [location,updateLocation] = useStore((state)=>[
    state.location,
    state.updateLocation
  ])
  // console.log(name);

  const addJournal = useStore((state)=> state.addJournal)

  useEffect(()=>{
    updateName('')
    updateExpenses('')
    updateNotes('')
    updateLocation('')

  },[])

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await addJournal(id)      
      router.push(`/listrooms/${router.query.id}/journal`);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
    <Navbar />
    <div className={slide.section1}>

      <h2 className="flex justify-center mt-11" style={{ fontSize: "25px" }}>
        Add New Journal
      </h2>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 ">
                <div className="mb-5">
                  <label
                    for="fName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="fName"
                    placeholder="Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={name}
                    onChange={(e)=>{
                      updateName(e.currentTarget.value)
                    }}
                  />
                </div>
              </div>
              <div className="w-full px-3 ">
                <div className="mb-5">
                  <label
                    for="lName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Expenses
                  </label>
                  <input
                    type="number"
                    name="expenses"
                    id="lName"
                    placeholder="$"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={expenses}
                    onChange={(e)=>{
                      updateExpenses(e.currentTarget.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                for="guest"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Notes
              </label>
              <input
                type="text"
                name="notes"
                id="guest"
                placeholder="-"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={notes}
                onChange={(e)=>{
                  updateNotes(e.currentTarget.value)
                }}
              />
            </div>
            <div className="mb-5">
              <label
                for="guest"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="guest"
                placeholder="-"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={location}
                onChange={(e)=>{
                  updateLocation(e.currentTarget.value)
                }}
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
