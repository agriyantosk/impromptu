import Navbar from '@/components/NavbarLogin'
import ListFriends from '@/components/ListFriends'
import { useRouter } from 'next/router'
import React from 'react'
import InviteFriend from '@/components/InviteFriend'

export default function index() {
  const router = useRouter()

  function toListRooms(){
    return router.push(`/listrooms/${router.query.id}`)
  }
  return (
    <div>
        <Navbar/>
        <InviteFriend />
        <div className='text-center px-6'>
          <button
                type='button' onClick={toListRooms}
                className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto hover:text-deep-purple-900 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700  focus:shadow-outline focus:outline-none"
              >
                Done
          </button>
        </div>
    </div>
  )
}
