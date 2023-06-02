import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-[300px] flex flex-col justify-center items-center '>
        <div className='flex w-[60%] justify-between p-5 items-center max-small:flex-col max-small:space-y-6'>
            <h1 className='text-3xl '>SSaver</h1>
            <a className='text-2xl text-gray-800'  href='/'>link1</a>
            <a className='text-2xl text-gray-800' href='/'>link2</a>
            <a className='text-2xl text-gray-800' href='/'>link3</a>
        </div>
        <hr className='m-6  w-[80%] border border-red-900'/>
        <div className='w-full items-center text-center'>
        <small className='w-full py-6 text-center text-lg '>@2023 SSaver. all rights reserved.</small>

        </div>
    </div>
  )
}

export default Footer
