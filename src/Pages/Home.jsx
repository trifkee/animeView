import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Featured from '../Components/Featured'
import Popular from '../Components/Popular'
import banner from '../assets/banner.png'

function Home() {
  const {isFetching, data}  = useQuery('popular-animes', () => {
    return axios.get(`https://api.jikan.moe/v4/top/anime?limit=18`)
  })

  return (
    <>
        <Featured />
        <Popular title='Most popular' genreList={data}/>
        <div className="banner">
          <img src={banner} alt="explore-banner" />
        </div>
    </>
  )
}

export default Home
