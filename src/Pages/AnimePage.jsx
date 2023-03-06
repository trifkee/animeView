import loading from '../assets/loading.gif'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import Anime from '../Components/Anime'
import axios from 'axios'

function AnimePage() {
    
    let { animeId:id } = useParams()

    const {isFetching, isLoading, data:anime, refetch:refetchAnime} = useQuery('anime', () => {
        return axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
    })

    const {data:recommended, refetch:refetchRecommended} = useQuery('recommended', () => {
        return axios.get(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
    })

    useEffect(()=>{
        refetchAnime()
        refetchRecommended()
        setTimeout(()=>{
            window.scrollTo(0,0, 'smooth')
        }, 500)
    }, [id])

    if(isFetching || isLoading){
        return  (
            <div className='loading-gif'>
                    <img src={loading} alt="loading gif" />
            </div>
        )
    }

    if(anime.data.data === undefined){
        return(
            <section className='searched-anime-404'>
                <h2>Sorry. 🤕</h2>
                <p>We could not find data for this Anime</p>
                <code>Status code: {anime?.data.status}</code>
                <Link to='/' className='searched-go-back shadow' style={{display:'flex', alignItems:'center', gap:'1rem',}}><ion-icon name="home-sharp"></ion-icon> home page</Link>
            </section>
        )
    }
  
    let duration = anime?.data.data.duration && anime?.data.data.duration.split(' ')[0]
    let rating = anime?.data.data.rating && anime?.data.data.rating.split(' ')[0]
    let score = anime?.data.data.score && anime?.data.data.score.toFixed(1)
    let url = anime?.data.data.streaming

    console.log(duration)

    const style = {
        backgroundImage: `linear-gradient(to top, #dfdfdf, rgba(233,233,233,.75), rgba(233,233,233,.95)),url(${anime?.data.data.images.webp.image_url})`
    }

    return (
        <section className='anime-page'>
            <div className="anime-page-main">
                <div className="anime-page-heading"  style={style}>
                    <img loading='lazy' className='anime-page-image shadow' alt={anime?.data.data.title_english || anime?.data.data.titles[1] || anime?.data.data.title_japanese } src={anime?.data.data.images.webp.image_url} />
                    {url[0] && <a href={url[0].url} rel="noreferrer" target="_blank" style={{padding:'.5rem 1rem'}} className="featured-watch shadow">WATCH NOW <ion-icon name="play-sharp"></ion-icon></a>}
                </div>
                <div className="anime-page-test">
                    <h2>{anime?.data.data.title_english || anime?.data.data.titles[0].title || anime?.data.data.title_japanese || 'Unknown'}</h2>
                    <div className="anime-page-info">
                        {<p className='shadow rating'><ion-icon name="film-sharp"></ion-icon> {rating || 'unkown'}</p>}
                        {<p className='shadow score'><ion-icon name="star"></ion-icon> {score || 'unkown'}</p>}
                        {<p className='shadow duration'><ion-icon name="time-sharp"></ion-icon> {duration === 'Unknown' ? ' ? min' : `${duration > 0 || duration < 3 ? `${duration} hr` : `${duration} min`}`}</p>}
                    </div>
                    <p className='anime-page-desc'>{anime?.data.data.synopsis || 'There is no description for this anime.'}</p>
                </div>
            </div>
            <div className="anime-page-recommended">
               { 
                <><h3 style={{display:'flex', alignItems:'center', gap:'.5rem'}}>Similar to this <ion-icon name="play-forward-sharp"></ion-icon></h3>
                <div className="recommended-animes">
                {recommended?.data.data ? recommended?.data.data.map(recommendedAnime => <Anime id={recommendedAnime.entry.mal_id} key={recommendedAnime.entry.mal_id} title={recommendedAnime.entry.title || recommendedAnime.entry.title_japanese || 'Unknown'} image={recommendedAnime.entry.images.webp.image_url}/>) : <p>We could not find any similar Anime to this...</p>}
                </div></>
               }
            </div>
        </section>
    )
}

export default AnimePage
