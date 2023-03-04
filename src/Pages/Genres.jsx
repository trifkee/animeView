import React, { useState, useEffect } from 'react'
import Popular from '../Components/Popular'
import { useQuery } from 'react-query'
import loading from '../assets/loading.gif'
import axios from 'axios'

function Genres() {

  const [selectedGenre, setSelectedGenre] = useState(1)
  const [genreTitle, setGenreTitle] = useState('Action')

  const { data:genreData } = useQuery('genres',()=> {
    return axios.get(`https://api.jikan.moe/v4/genres/anime`)
  })

  const {data:genreList, isFetching, refetch} = useQuery('animeByGenre', () => {
    return axios.get(`https://api.jikan.moe/v4/anime?genres=${selectedGenre}`)
  })

  const handleClick = (e, genreId) => {
    setGenreTitle(e.target.textContent)
    setSelectedGenre(genreId)
  }

  useEffect(() =>{
    refetch()
  }, [selectedGenre])

  
  if(isFetching){
    return (
      <div className='loading-gif'>
        <p>Loading.</p>
        <img src={loading} alt="loading gif" />
      </div>
    )
  }

  return (
        <div className='genre-showcase'>
            <div className="genres-list carousel">
                {/* <a href="#" className='genre-link shadow'>Genre</a> //Test BTN */}
                {genreData?.data.data.map(genre => (
                  <button key={genre.mal_id} onClick={(e) => handleClick(e, genre.mal_id)} className='genre-link shadow'>{genre.name}</button>
                ))}
            </div>

            <Popular title={genreTitle} genreList={genreList}/>
        </div>
  
  )
}

export default Genres
