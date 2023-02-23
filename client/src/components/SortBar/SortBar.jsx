import { useState } from "react";
import { useDispatch } from "react-redux"
import { sortDogs } from "../../redux/actions";



const SortBar = () => {

    const dispatch = useDispatch()

    const [ order, setOrder ] = useState(
        {
            sort: "default",
            type: "name"
        }
    )


    const orderHandler = (e) => {
        const { name, value } = e.target
        setOrder({...order, [name]: value})
        dispatch(sortDogs({...order, [name]: value}))
    }

    return (
        <div>
            <div>
                <select name="sort" value={order.sort} onChange={orderHandler}>
                    <option value="default">Default</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
            <div>
                <select name="type" value={order.type} onChange={orderHandler}>
                    <option value="name">Nombre</option>
                    <option value="weightMax">Peso</option>
                </select>

            </div>
        </div>
    )
}

export default SortBar;