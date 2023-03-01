import React from 'react'
import Popular from '../Components/Popular'
import { useQuery } from 'react-query'
import axios from 'axios'

function Genres() {

  const { data:genreData } = useQuery('genres',()=> {
    return axios.get(`https://api.jikan.moe/v4/genres/anime`)
  })

  return (
        <div className='genre-showcase'>
            <div className="genres-list carousel">
                {/* <a href="#" className='genre-link shadow'>Genre</a> //Test BTN */}
                {genreData?.data.data.map(genre => (
                  <button key={genre.mal_id} className='genre-link shadow'>{genre.name}</button>
                ))}
            </div>

            <Popular />
        </div>
  
  )
}

export default Genres