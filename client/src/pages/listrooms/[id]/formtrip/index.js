import { useRouter } from 'next/router'
import React from 'react'

export default function index() {
    const router = useRouter()

    function generateTrip(){
        // generate tripnya
        
        router.push(`/listrooms/${router.query.id}`)
    }

  return (
    <div>
        <h1>Form Input</h1>
        <button type='submit'onClick={generateTrip}>Submit</button>
    </div>
  )
}
