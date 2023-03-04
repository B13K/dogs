import { Link, useLocation } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css"
import imagen from "../../assets/perro5.svg"

const NavBar = () => {

    const location = useLocation()
    return (
        <nav className={style.navBarContainer}>
            <div className={style.menu}>
                <Link to="/home" className={style.link}>Home</Link>
                <Link to="/create" className={style.link}>Form</Link>
            </div>
            <object className={style.navBarIcon} data={imagen} type="image/svg+xml"/>
            {
                location.pathname !== "/create" && location.pathname !== `/detail/${location.pathname.split("/")[2]}` && <SearchBar/>

            }
        </nav>
    )
}

export default NavBar;