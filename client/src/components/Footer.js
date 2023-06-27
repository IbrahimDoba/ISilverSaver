import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-[200px] bg-[#ffffff] flex flex-col justify-center items-center max-md:h-[300px] '>
        <div className='flex w-[60%] justify-between p-5 items-center max-small:flex-col max-small:space-y-6'>
            <a href='/' className='text-3xl hover:text-ACT '>SSaver</a>
            <a className='text-xl text-gray-800 hover:text-ACT'  href='/Contact'>contact</a>
            <a className='text-xl text-gray-800 hover:text-ACT' href='/privacy'>Privacy Policy</a>
            <a className='max-md:w-[200px] text-xl text-gray-800 hover:text-ACT' href='/termsandconditions'>Terms & Conditions</a>
        </div>
        <hr className='m-6  w-[80%] border border-ACT'/>
        <div className='w-full items-center text-center'>
        <small className='w-full py-6 text-center text-lg '>@2023 SSaver. all rights reserved.</small>

        </div>
    </div>
  )
}

export default Footer
