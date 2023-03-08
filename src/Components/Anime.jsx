import React from 'react'
import { Link } from 'react-router-dom'

function Anime({image, title, id, year}) {

  return (
    <Link to={`/anime/${id}`} className='anime-icon shadow'>
        <img loading='lazy' src={image} alt={title}/>
        <p className='anime-title'>{title}</p>
        <span className='anime-year'>Year: {year || 'unknown'}</span>
    </Link>
  )
}

export default Anime
