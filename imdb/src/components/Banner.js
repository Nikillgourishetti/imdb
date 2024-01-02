import React from 'react'

function Banner() {
  return (
    <div className='flex items-end h-[20vh] md:h-[60vh] bg-center bg-no-repeat ' style={{
        backgroundImage: "url(https://wallpapers.com/images/featured/naruto-characters-peo1d7c1aqugno3e.jpg)"

    }}>
        <div className='w-full text-xl md:text-3xl bg-gray-900 text-orange-600  text-center bg-opacity-60 font-bold '> Naruto</div>
        

    </div>
  )
}

export default Banner