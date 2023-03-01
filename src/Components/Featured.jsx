import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Featured() {

    const {isError, data} = useQuery('featured-anime', () => {
        return axios.get(`https://api.jikan.moe/v4/random/anime`)
    })

    if(isError){
        return <h2>Sorry, we were unable to show data.</h2>
    }

    const style = {
        backgroundImage: `linear-gradient(0deg, #dfdfdf 10%, rgba(0,0,0,0)), url(${data?.data.data.images.jpg.large_image_url})`
    }

  return (
    <>
    <section className='featured-section' style={style}>
        <div className="featured-info">
            <h2>{data?.data.data.title_english || data?.data.data.titles[1].title}</h2>
            <p>{data?.data.data.synopsis}</p>
        </div>
        <div className="featured-cta">
            <Link to={`/anime/${data?.data.data.mal_id}`} className="featured-watch shadow">Read more <ion-icon name="eye-sharp"></ion-icon></Link>
            {data?.data.data.trailer.url ? <a href={data?.data.data.trailer.url} target="_blank" className="featured-trailer shadow">watch trailer <ion-icon name="videocam-sharp"></ion-icon></a> : null}
        </div>
    </section>
    </>
  )
}

export default Featured