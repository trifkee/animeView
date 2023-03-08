import loading from '../assets/loading.gif'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Anime from '../Components/Anime'
import axios from 'axios'
import AnimeContext from '../store/AnimeContext'

function AnimePage() {

    // GET ANIME ID TROUGHT PARAMS ( URL )
    let { animeId:id } = useParams()

    // USING CONTEXT
    const { favorites, setFavorites } = useContext(AnimeContext)

    // GET ANIME BY ID
    const {isFetching, isLoading, data, refetch:refetchAnime} = useQuery('anime', () => {
        return axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
    })

    // RECOMMENDED ANIMES BASED ON PARSED ID 
    const {data:recommended, refetch:refetchRecommended} = useQuery('recommended', () => {
        return axios.get(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
    })

    // REFETCH DATA FOR ANIME ON CHANGE (id)
    useEffect(()=>{
        refetchAnime()
        refetchRecommended()
        setTimeout(()=>{
            window.scrollTo(0,0, 'smooth')
        }, 500)
    }, [id])

    // IF DATA IS FETCHING OR LOADING, SET LOADING SCREEN
    if(isFetching || isLoading){
        return  (
            <div className='loading-gif'>
                    <img src={loading} alt="loading gif" />
            </div>
        )
    }

    // INITIALIZATION
    let anime = data?.data.data
    
    let duration = anime?.duration && anime?.duration.split(' ')[0]
    let rating = anime?.rating && anime?.rating.split(' ')[0]
    let score = anime?.score && anime?.score.toFixed(1)
    let url = anime?.streaming
    
    
    // HANDLE FAVORITE ( REMOVE OR ADD TO ARRAY ID OF ANIME )
    let isFavorite = favorites.some(el => el === anime?.mal_id)

    const handleFavorite = (e, id) => {
    
        if(!isFavorite){
            return setFavorites(prevFav => [...prevFav, id])
        } 
    
        const filtered = favorites.filter(el => el !== id)
        setFavorites(filtered)   
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))

    //BASIC STYLE AND JSX 
    const style = {
        backgroundImage: `linear-gradient(to top, #dfdfdf, rgba(233,233,233,.75), rgba(233,233,233,.95)),url(${anime?.images.webp.image_url})`
    }

    return (
        <section className='anime-page'>
            <div className="anime-page-main">
                <div className="anime-page-heading"  style={style}>
                    <img loading='lazy' className='anime-page-image shadow' alt={anime?.title_english || anime?.titles[1] || anime?.title_japanese } src={anime?.images.webp.image_url}/>
                    <div style={{display:'flex', gap:'1rem', width:'100%',justifyContent:'space-between'}}>
                    {url[0] && <a href={url[0].url} rel="noreferrer" target="_blank" style={{padding:'.5rem 1rem', width:'100%', fontWeight:'800'}} className="featured-watch shadow">WATCH NOW <ion-icon name="play-sharp"></ion-icon></a>}
                    <button className='anime-favorite shadow' onClick={(e) => handleFavorite(e, anime?.mal_id)}>{!isFavorite ? 'Like' : 'Dislike'}<ion-icon className='shadow' name={!isFavorite ? 'heart-sharp' : 'heart-dislike-sharp'}></ion-icon></button>

                    </div>
                </div>
                <div className="anime-page-test">
                    <h2>{anime?.title_english || anime?.titles[0].title || anime?.title_japanese || 'Unknown'}</h2>
                    <div className="anime-page-info">
                        <p className='shadow rating'><ion-icon name="film-sharp"></ion-icon> {rating || 'unkown'}</p>
                        <p className='shadow score'><ion-icon name="star"></ion-icon> {score || 'unkown'}</p>
                        <p className='shadow duration'><ion-icon name="time-sharp"></ion-icon>  {duration === 'Unknown' ? ' ? min' : `${duration === '1' || duration === '2' ? `${duration}hr` : `${duration}min`}`}</p>
                    </div>
                    <p className='anime-page-desc'>{anime?.synopsis || 'There is no description for this anime.'}</p>
                </div>
            </div>
            <div className="anime-page-recommended">
               { 
                <>
                    <h3 style={{display:'flex', alignItems:'center', gap:'.5rem'}}>Similar to this <ion-icon name="play-forward-sharp"></ion-icon></h3>
                    <div className="recommended-animes">
                    {recommended?.data.data ? recommended?.data.data.map(recommendedAnime => <Anime id={recommendedAnime.entry.mal_id} key={recommendedAnime.entry.mal_id} title={recommendedAnime.entry.title || recommendedAnime.entry.title_japanese || 'Unknown'} image={recommendedAnime.entry.images.webp.image_url}/>) : <p>We could not find any similar Anime to this...</p>}
                    </div>
                </>
               }
            </div>
        </section>
    )
}

export default AnimePage
