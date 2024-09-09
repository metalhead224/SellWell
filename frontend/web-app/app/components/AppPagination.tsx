'use client'

import { Pagination } from 'flowbite-react'
import React from 'react'

type Props = {
    currentPage: number
    pageCount: number
    pageChanged: (pageNumber: number) => void
}

export default function AppPagination({pageChanged, currentPage, pageCount}: Props) {

  return (
    <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={e => pageChanged(e)}
        layout='pagination'
        showIcons={true}
        className='text-blue-500 mb-5'
    />
  )
}
