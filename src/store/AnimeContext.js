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
    // ....

    return (
        <AnimeContext.Provider value={{openNav, handleNav, handleCloseNav}}>{children}</AnimeContext.Provider>
    )
}

export default AnimeContext