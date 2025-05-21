import React, { PropsWithChildren } from 'react'

const InnerLayout = ({children} : PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 sm:p-8 md:p-10 lg:p-12">
      {children}
    </div>
  )
}

export default InnerLayout
