import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function index() {
    const router = useRouter()
    const [budget,setBudget] = useState()

    function handleChange(e) {
        setBudget(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        router.push(`/listrooms/${router.query.id}/${router.query.detail}`)
        console.log(budget);
    }
  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                Add Budget
              </h2>
            </div>
            <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
            <input
              placeholder="ex:1000000"
              required
              type="number"
              name='budget'
              value={budget}
              onChange={handleChange}
              className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-teal-300 focus:outline-none focus:shadow-outline"
            />
            <button
              type='submit'
              className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto  bg-teal-300 hover:bg-teal-500  focus:shadow-outline focus:outline-none"
            >
              Add
            </button>
          </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
