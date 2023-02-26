import { Link, useLocation } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css"

const NavBar = () => {

    const location = useLocation()
    return (
        <nav className={style.navBarContainer}>
            <div className={style.menu}>
                <Link to="/home" className={style.link}>Home</Link>
                <Link to="/create" className={style.link}>Form</Link>
            </div>
            {
                location.pathname !== "/create" && <SearchBar/>

            }
        </nav>
    )
}

export default NavBar;