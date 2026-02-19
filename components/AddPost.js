import React from 'react'
import { createPortal } from 'react-dom'

export default function AddPost({children}) {
  return createPortal(
    <div className='fixed inset-0 z-[9999]  flex items-center justify-center'>
      {children}
    </div>,
    document.body
  )
}


