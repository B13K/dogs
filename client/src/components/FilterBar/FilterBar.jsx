import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterDogs } from "../../redux/actions"
import style from "./FilterBar.module.css"



const FilterBar = () => {

    const dispatch = useDispatch()
    const temperamentsAll = useSelector(state => state.temperaments)
    const filterAll = useSelector(state => state.filterDogs)

    const [temperaments, setTemperaments] = useState([])

    const [filter, setFilter] = useState({
        db: "all",
        temperament: "all"

    })

    useEffect( () => {
        setTemperaments(temperamentsAll)
    },[temperamentsAll])


    useEffect( () => {
        setFilter(filterAll)
    }, [filterAll])


    const filterHandler = (e) => {
        const {name, value} = e.target
        setFilter({...filter, [name]: value})
        dispatch(filterDogs({...filter, [name]: value}))
    }


    return (
        <div className={style.filterBarContainer}>
            <div>
                <select name="temperament" value={filter.temperament} onChange={filterHandler}>
                    <option value="all">All</option>
                    {
                        temperaments.map((t,i) => (
                            <option key={i} value={t.name}>{t.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <select name="db" value={filter.db} onChange={filterHandler}>
                    <option value="all">All</option>
                    <option value="api">Api</option>
                    <option value="db">DataBase</option>
                </select>
            </div>
        </div>
    )
}

export default FilterBar