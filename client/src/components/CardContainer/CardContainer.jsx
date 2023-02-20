
import { useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import Card from "../Card/Card"
import style from "./CardContainer.module.css"
const CardContainer = () => {

    const dogsAll = useSelector(state => state.dogs) //Traemos los dogs desde el store
        
    const [dogs, setDogs] = useState({
        dogs:[],
    })

    useEffect( () => {
        setDogs({...dogs, dogs: dogsAll})
    },[dogsAll])
    

    return (
        <div className={style.container}>
            {
                dogs.dogs.map(e => <Card 
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