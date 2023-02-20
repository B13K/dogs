
import { useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import Card from "../Card/Card"
import style from "./CardContainer.module.css"
import Pagination from "../Pagination/Pagination"


const CardContainer = () => {

    const dogsAll = useSelector(state => state.dogs) //Traemos los dogs desde el store

        
    const [dogs, setDogs] = useState([])
    
    
    //Paginacion
    const [ currentPage, setCurrentPage ] = useState(1) //Pagina actual
    const [ dogsPerPage ] = useState(10) //Cuarbos dogs habra por pagina
    // End pagination

    useEffect( () => {
        setDogs(dogsAll)
        setCurrentPage(1) //Se posiciona en la pagina uno cada vez que realiza un filtro
    },[dogsAll])
    
    //Pagination
    const indexOfLastDogs = currentPage * dogsPerPage;
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDogs = dogs.slice(indexOfFirstDogs, indexOfLastDogs)

    const paginate = pageNumber => setCurrentPage(pageNumber)
    //End Pagination

    return (
        <div className={style.container}>
            <div>
                <Pagination dogsPerPage={dogsPerPage} totalDogs = {dogs.length} paginate={paginate}/>
            </div>
            {
                currentDogs.map(e => <Card 
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