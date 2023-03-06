import logo from '../assets/logoBeli.svg'
import React, { useState, useContext } from 'react'
import AnimeContext from '../store/AnimeContext'
import Search from './Search'
import { Link } from 'react-router-dom'


function NavBar() {

    const {openNav, handleNav, handleCloseNav} = useContext(AnimeContext)

    const [color, setColor] = useState(false)

    // MENJA BOJU NAVIGACIJE
    const changeColor = () => {
        if(window.scrollY >= 1){
            return setColor(true)
        } 
        setColor(false)
    }

    window.addEventListener('scroll', changeColor)

    return (
        <> 
            <nav className={` nav-bar ${color ? 'active' : ''}`}>
                <div className={`nav-main ${color ? 'active' : ''}`}>
                    <Link to={'/'} className="nav-logo" >
                        <img src={logo} alt="animeVideo" />
                        <p>AnimeView</p>
                    </Link>
                    <div onClick={handleNav} className={`nav-toggle shadow ${openNav ? 'active' : ''}`}>
                        <ion-icon  name="add-sharp"></ion-icon>
                    </div>
                </div>

                <ul className={`nav-menu ${openNav ? 'active' : ''}`}>
                    <Search />
                    <div className="nav-links">
                    <Link to='/' onClick={handleCloseNav} className='nav-link'>home</Link>
                    <Link to='/genres' onClick={handleCloseNav} className='nav-link'>genres</Link>
                    <Link to='/discover' onClick={handleCloseNav} className='nav-link'>discover</Link> {/* discover */}
                    <Link to='/favorites' onClick={handleCloseNav} className='nav-link'>favorites</Link> {/*favorites */}
                    </div>
                </ul>
            </nav>

            <a href='#top' className={`to-top shadow ${color ? 'active' : ''}`}>
                <ion-icon name="chevron-up-sharp"></ion-icon>
            </a>
        </>
    )
}

export default NavBar
