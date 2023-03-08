import React, { useContext, useState, useEffect } from 'react'
import AnimeContext from '../store/AnimeContext'
import { useQuery } from 'react-query'
import axios from 'axios'

function Favorites() {
    const { favorites } = useContext(AnimeContext)

    const [animeList, setAnimeList] = useState({})

    //console.log(favorites)
    // favorites.forEach( fav => {
    //     const {data} = useQuery('favAnime', () => {
    //         return axios (`https://api.jikan.moe/v4/anime/${fav}`)
    //     })

    //     setAnimeList(prevList => {prevList, data})
    // })

    // console.log(animeList)

    return (
        <section className='popular-section'>
                
            <h2>Favorites</h2>
            <div className="popular-catalog">
                { favorites?.map(anime => <p>{anime}</p>) }
                {/* {genreList?.data.data.map(anime => <Anime key={anime.mal_id} id={anime.mal_id} image={anime.images.jpg.image_url} title={anime.title_english || anime.title_japanese || 'unknown' } year={anime.year} props={anime}/>)} */}
            </div>
            
        </section>
    )
}

export default Favorites
