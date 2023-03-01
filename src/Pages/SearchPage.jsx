import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Anime from '../Components/Anime'
import { useQuery } from 'react-query'

function SearchPage() {
    const { anime } = useParams()

    const { data:listData, refetch } = useQuery('searched-anime', () => {
        return axios.get(`https://api.jikan.moe/v4/anime?q=${anime}`)
    })

    useEffect(()=>{
        refetch()
    }, [anime])
    
    if(listData?.data.data.length < 1){
        return(
            <section className='searched-anime-404'>
                <h2>Sorry. 🤕</h2>
                <p>we could not found any anime with name of <span style={{borderBottom:'3px solid black'}}>{anime}</span>.</p>
                <Link to='/' className='searched-go-back shadow' style={{display:'flex', alignItems:'center', gap:'1rem',}}><ion-icon name="home-sharp"></ion-icon> home page</Link>
            </section>
        )
    }

    return (
        <section className='searched-anime'>
            <h2>Results for: <span className='searched-title'>{anime}</span></h2>
            <div className="popular-catalog search-catalog">
                {listData?.data.data.map(anime => <Anime key={anime.mal_id} id={anime.mal_id} image={anime.images.jpg.image_url} title={anime.title_english || anime.titles[0].title} props={anime}/>)}
            </div>
        </section>
     )
}

export default SearchPage
