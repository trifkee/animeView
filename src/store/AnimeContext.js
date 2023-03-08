import { createContext, useState } from "react";

const AnimeContext = createContext()

export function AnimeProvider({children}){

    // NAVIGATION
    const [openNav, setOpenNav] = useState(false)

    const handleNav = () => {
        setOpenNav(prevState => !prevState)
    }

    const handleCloseNav = () => {
        setOpenNav(false)
    }

    // SAVED ANIMES
    let saved = JSON.parse(localStorage.getItem('favorites'))

    const [favorites, setFavorites] = useState(!saved ? [] : saved)

    const removeFavorite = (e, id) => {
        const filtered = favorites.filter(el => el !== id)
        setFavorites(filtered)   
    }
    
    return (
        <AnimeContext.Provider value={{openNav, handleNav, handleCloseNav, favorites, setFavorites, removeFavorite}}>{children}</AnimeContext.Provider>
    )
}

export default AnimeContext
