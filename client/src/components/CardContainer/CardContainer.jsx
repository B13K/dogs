
import { useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import Card from "../Card/Card"
import style from "./CardContainer.module.css"
import Pagination from "../Pagination/Pagination"
import SortBar from "../SortBar/SortBar"


const CardContainer = () => {

    const dogsAll = useSelector(state => state.dogs) //Traemos los dogs desde el store sin modificar
        
    const [dogs, setDogs] = useState([])
    
    
    //Paginacion
    const [ currentPage, setCurrentPage ] = useState(1) //Pagina actual
    const [ dogsPerPage ] = useState(10) //Cuartos dogs habra por pagina

    const indexOfLastDogs = currentPage * dogsPerPage;
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDogs = dogs.slice(indexOfFirstDogs, indexOfLastDogs)

    const paginate = pageNumber => setCurrentPage(pageNumber)
    //End Pagination

    

    useEffect( () => {
        setDogs(dogsAll)
        setCurrentPage(1) //Se posiciona en la pagina uno cada vez que realiza un filtro
    },[dogsAll])


    // Funcion para ordenar por nombre o por peso
    const createSort = (orderBy) => {
        const sortDogsAll = [...dogs]

        switch (orderBy.sort){
            case "asc":
                sortDogsAll.sort( (a,b) => {
                    if(a[orderBy.type] > b[orderBy.type]){
                        return 1
                    }                        
                    if(a[orderBy.type] < b[orderBy.type]){
                        return -1
                    }
                    return 0
                });
                
                setDogs(sortDogsAll)
                break;
            case "desc":
                sortDogsAll.sort( (a,b) => {
                    if(a[orderBy.type] > b[orderBy.type]){
                        return -1
                    }                        
                    if(a[orderBy.type] < b[orderBy.type]){
                        return 1
                    }
                    return 0
                });
                setDogs(sortDogsAll)
                break;
            default:
                setDogs([...dogsAll])
                
        }

    }
    // Finaliza la funcion para ordenar los perros

    return (
        <div className={style.container}>
            <div>
                <SortBar orderBy={createSort}/>
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