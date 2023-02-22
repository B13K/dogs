import { useState } from "react";



const SortBar = ({orderBy}) => {

    const [ order, setOrder ] = useState(
        {
            sort: "default",
            type: "name"
        }
    )


    const orderHandler = (e) => {
        const { name, value } = e.target
        setOrder({...order, [name]: value})
        orderBy({...order, [name]: value})
    }

    return (
        <div>
            <div>
                <select name="sort" value={order.sort} onChange={orderHandler}>
                    <option value="default">Ninguno</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
            <div>
                <select name="type" value={order.type} onChange={orderHandler}>
                    <option value="name">Nombre</option>
                    <option value="weight">Peso</option>
                </select>

            </div>
        </div>
    )
}

export default SortBar;