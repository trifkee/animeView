import React, { useContext } from 'react'
import magnify from '../assets/search-outline.svg'
import { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import AnimeContext from '../store/AnimeContext'

function Search() {

    const navigate = useNavigate()
    const {handleCloseNav} = useContext(AnimeContext)

    const [searchAnime, setSearchAnime] = useState('')

    const handleSearch = (e) => {
        setSearchAnime(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchAnime('')
        handleCloseNav()
        navigate(`/search/${searchAnime}`)
    }

    return (
            <form onSubmit={handleSubmit} className="search-comp">
                <h2>Search</h2>
                <input type="input" placeholder={`Search for anime... `} onSubmit={handleSubmit} onChange={handleSearch} value={searchAnime} className='search shadow' />
            </form>
        )
    }

export default Search