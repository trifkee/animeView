import React from 'react'
import Featured from '../Components/Featured'
import Popular from '../Components/Popular'
import banner from '../assets/banner.png'

function Home() {
  return (
    <>
        <Featured />
        <Popular />
        <div className="banner">
          <img src={banner} alt="explore-banner" />
        </div>
    </>
  )
}

export default Home