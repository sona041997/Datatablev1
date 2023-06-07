import React from 'react'

export default function mainDetails({name,address}) {
  return (
    <>
     <section className='flex flex-col item-end justify-end'>
     <h2 className=' font-bold text-xl uppercase md-1 md:text-2xl'>{name} </h2>
     <p>{address}</p>
    </section>
    </>
  )
}
