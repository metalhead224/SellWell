import Heading from '@/app/components/Heading'
import React from 'react'
import AuctionForm from '../AuctionForm'

export default function Create() {
  return (
    <div className='mx-auto p-4 shadow-lg max-w-[75%] bg-white rounded-lg'>
      <Heading title='Sell you car!' subtitle='Please enter details of your car' />
      <AuctionForm />
    </div>
  )
}
