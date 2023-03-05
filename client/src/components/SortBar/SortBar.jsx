import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { sortDogs } from "../../redux/actions";
import style from "./SortBar.module.css"



const SortBar = () => {

    const dispatch = useDispatch()
    const orderDB = useSelector(state => state.sortDogs)

    const [ order, setOrder ] = useState(
        {
            sort: "asc",
            type: "name"
        }
    )

    useEffect( () => {
        setOrder(orderDB)
    }, [orderDB])
    


    const orderHandler = (e) => {
        const { name, value } = e.target
        setOrder({...order, [name]: value})
        dispatch(sortDogs({...order, [name]: value}))
    }

    return (
        <div className={style.sortBarContainer}>
            <div>
                <select name="sort" value={order.sort} onChange={orderHandler}>
                    {/* <option value="default">Default</option> */}
                    <option value="asc">Ascendent</option>
                    <option value="desc">Descendent</option>
                </select>
            </div>
            <div>
                <select name="type" value={order.type} onChange={orderHandler}>
                    <option value="name">Name</option>
                    <option value="weightMax">Weight</option>
                </select>

            </div>
        </div>
    )
}

export default SortBar;