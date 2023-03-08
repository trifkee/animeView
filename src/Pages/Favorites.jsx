import React, { useContext } from 'react'
import Anime from '../Components/Anime'
import AnimeContext from '../store/AnimeContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import loading from '../assets/loading.gif'
import { useQueries } from 'react-query'

function Favorites() {
    const { favorites, removeFavorite } = useContext(AnimeContext)

    const fetchFavorites = id => {
        return axios.get(`https://api.jikan.moe/v4/anime/${id}`)
    }

    const result = useQueries(
        favorites.map(favId => {
            return {
                queryKey: ['anime', favId],
                queryFn: () => fetchFavorites(favId)
            }
        })
    )

    localStorage.setItem('favorites', JSON.stringify(favorites))

    return (
        <section className='popular-section'>
                
            <div style={{margin:'5rem 0 1rem 0', display:'flex', flexDirection:'column'}} className="heading">
                <h2 style={{marginBottom:'0', lineHeight:'.55'}}>Favorites <br /><span style={{fontSize:'1rem', fontWeight:'400'}}>Collection of liked Anime</span></h2>
            </div>
            { result.length ? 
                ( 
                    <div className="popular-catalog">
                        {result.map(anime => {
                            if(anime?.isFetched){
                                return (
                                    <div key={anime.data.data.data.mal_id}  style={{display:'flex', flexDirection:'column', width:'100%',justifyContent:'space-between'}}>
                                        <Anime key={anime.data.data.data.mal_id} id={anime.data.data.data.mal_id} image={anime.data.data.data.images.jpg.image_url} title={anime.data.data.data.title_english || anime.data.data.data.title_japanese || 'unknown' } year={anime.data.data.data.year} props={anime} />
                                        <button onClick={(e) => removeFavorite(e, anime.data.data.data.mal_id)} className='anime-favorite shadow'>Dislike<ion-icon className='shadow' name='heart-dislike-sharp'></ion-icon></button>
                                    </div>
                                )
                            } else {
                                return(
                                    <div className='loading-gif'>
                                        <p>Loading.</p>
                                        <img src={loading} alt="loading gif" />
                                    </div>    
                                )
                            }
                        })}
                    </div>
                ) : 
                (
                    <section className='searched-anime-404' style={{height:'70vh'}}>
                        <h2 style={{fontSize:'2rem'}}>Oops! Looks like your favorite list is empty.</h2>
                        <p style={{fontSize:'1rem'}}>Add your favorite anime to the list</p> 
                        <Link to='/' className='searched-go-back shadow' style={{display:'flex', alignItems:'center', gap:'1rem',}}><ion-icon name="home-sharp"></ion-icon> home page</Link>
                    </section>
                )
            }
        </section>
    )
}

export default Favorites
