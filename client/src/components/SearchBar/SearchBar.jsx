import { useState } from "react"
import { useDispatch } from "react-redux"
import { getSearchDogs } from "../../redux/actions"
import style from "./SearchBar.module.css"


const SearchBar = () => {

    const dispatch = useDispatch()
    const [search, setSearch] = useState(
        {
            name: ""
        }
    )

    const searchHandler = (e) => {
        setSearch({...search, name: e.target.value})
    }

    return (
        <div className={style.searchBarContainer}>
            <input type="search" onChange={searchHandler} />
            <button onClick={() => dispatch(getSearchDogs(search.name))}>Search</button>

        </div>
    )
}



export default SearchBar