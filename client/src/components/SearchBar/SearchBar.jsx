import { useState } from "react"
import { useDispatch } from "react-redux"
import { getFilterDogs } from "../../redux/actions"



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
        <div>
            <input type="search" onChange={searchHandler} />
            <button onClick={() => dispatch(getFilterDogs(search.name))}>Search</button>

        </div>
    )
}



export default SearchBar