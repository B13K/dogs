
import { useSelector } from "react-redux"
import Card from "../Card/Card"
import style from "./CardContainer.module.css"
const CardContainer = () => {

    const dogs = useSelector(state => state.dogs) //Traemos los dogs desde el store
    return (
        <div className={style.container}>
            {
                dogs.map(e => <Card 
                                key={e.id}
                                id = {e.id}
                                name = {e.name}
                                height = {e.height}
                                weight = {e.weight}
                                temperament = {e.temperament}
                                image = {e.image}
                    
                            />)
            }
        </div>
    )
}

export default CardContainer;