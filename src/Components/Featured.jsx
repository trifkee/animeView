import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'
import loading from '../assets/loading.gif'

function Featured() {
    let randAnime, randNum, animeList

    const {isFetching, isLoading, isFetched, isError, data}  = useQuery('featured-anime', () => {
        return axios.get(`https://api.jikan.moe/v4/top/anime`)
    })

    if(isFetching || isLoading){
        return  (
            <div className='loading-gif'>
                    <img src={loading} alt="loading gif" />
            </div>
        )
    }

    if(isError){
        return <h2>Sorry, we were unable to show data.</h2>
    }

    if(isFetched){
        animeList = data?.data.data

        randNum = Math.floor(Math.random() * animeList.length)

        randAnime = animeList[randNum]
    }

    const style = {
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1), rgba(233,233,233,.4)), url(${randAnime?.images.webp.large_image_url})`
    }

  return (
    <>
    <section className='featured-section' style={style}>
        <div className="featured-info">
            <h2>{randAnime?.title_english || randAnime?.titles[1].title}</h2>
            <p>{randAnime?.synopsis}</p>
        </div>
        <div className="featured-cta">
            <Link to={`/anime/${randAnime?.mal_id}`} className="featured-watch shadow">Read more <ion-icon name="eye-sharp"></ion-icon></Link>
            {randAnime?.trailer.url ? <a href={randAnime?.trailer.url} target="_blank" className="featured-trailer shadow">watch trailer <ion-icon name="videocam-sharp"></ion-icon></a> : null}
        </div>
    </section>
    </>
  )
}

export default Featured
