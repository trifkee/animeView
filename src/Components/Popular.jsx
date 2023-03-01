import React from 'react'
import Anime from './Anime'
import { useQuery } from 'react-query'
import axios from 'axios'
import loading from '../assets/loading.gif'

function Popular() {
  const {isFetching, data}  = useQuery('popular-animes', () => {
    return axios.get(`https://api.jikan.moe/v4/top/anime?limit=18`)
  })

  if(isFetching){
    return (
      <div className='loading-gif'>
        <p>Loading.</p>
        <img src={loading} alt="loading gif" />
      </div>
    )
  }

  return (
    <>
    <section className='popular-section'>
      
            <h2>MOST POPULAR</h2>
            <div className="popular-catalog">
                {data?.data.data.map(anime => <Anime key={anime.mal_id} id={anime.mal_id} image={anime.images.jpg.image_url} title={anime.title_english || anime.titles[2].title} year={anime.year} props={anime}/>)}
            </div>
            
    </section>
    
    </>
  )
}

export default Popular