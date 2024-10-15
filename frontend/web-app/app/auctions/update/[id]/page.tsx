import React from 'react'
import AuctionForm from '../../AuctionForm';
import Heading from '@/app/components/Heading';
import { getDetailedViewData } from '@/app/actions/auctionsAction';

export default async function Update({params}: {params: {id: string}}) {
  const data = await getDetailedViewData(params.id);
  
  return (
    <div className='mx-auto p-4 shadow-lg max-w-[75%] bg-white rounded-lg'>
      <Heading title='Sell you car!' subtitle='Please enter details of your car' />
      <AuctionForm auction={data} />
    </div>
  )
}
