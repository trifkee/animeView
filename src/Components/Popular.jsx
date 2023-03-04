import React from 'react'
import Anime from './Anime'

function Popular({title, genreList}) {  

  return (
    <>
    <section className='popular-section'>
      
            <h2>{title}</h2>
            <div className="popular-catalog">
                {genreList?.data.data.map(anime => <Anime key={anime.mal_id} id={anime.mal_id} image={anime.images.jpg.image_url} title={anime.title_english || anime.title_japanese || 'unknown' } year={anime.year} props={anime}/>)}
            </div>
            
    </section>
    
    </>
  )
}

export default Popular
