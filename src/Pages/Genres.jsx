import React, { useState, useEffect } from 'react'
import Popular from '../Components/Popular'
import { useQuery } from 'react-query'
import loading from '../assets/loading.gif'
import axios from 'axios'

function Genres() {

  const [selectedGenre, setSelectedGenre] = useState(1) 
  const [genreTitle, setGenreTitle] = useState('Action')
  const [selectedGenrePage, setSelectedGenrePage] = useState(1)

  const { data:genreData } = useQuery('genres',()=> {
    return axios.get(`https://api.jikan.moe/v4/genres/anime?filter=genres`)
  })

  const {data:genreList, isFetching, refetch} = useQuery('animeByGenre', () => {
    return axios.get(`https://api.jikan.moe/v4/anime?genres=${selectedGenre}&page=${selectedGenrePage}&limit=10`)
  })

  const handleClick = (e, genreId) => {
    setGenreTitle(e.target.textContent)
    setSelectedGenre(genreId)
  }

  const handlePagination = (e) => {
    let choice = e.target.textContent
    switch(choice){
      case 'next >':
        setSelectedGenrePage(prevPage => prevPage + 1)
        break;
      
      case '< prev':
        if(selectedGenrePage === 1){
          return
        }

        setSelectedGenrePage(prevPage => prevPage - 1)
        break;
      
      default:
        break
    }
  }

  useEffect(() =>{
    refetch()
  }, [selectedGenre, selectedGenrePage])

  
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

            <div>
                <Popular title={genreTitle} genreList={genreList}/>
                <div className="anime-pagination" style={{display:'flex', gap:'1rem'}}>
                  <button onClick={handlePagination} className="shadow featured-watch">{`< prev`}</button>
                  <button className="shadow featured-watch">{selectedGenrePage}</button>
                  <button onClick={handlePagination} className="shadow featured-watch">{`next >`}</button>
                </div>
            </div>
        </div>
  
  )
}

export default Genres
