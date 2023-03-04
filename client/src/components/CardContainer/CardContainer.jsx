
import { useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import Card from "../Card/Card"
import style from "./CardContainer.module.css"
import Pagination from "../Pagination/Pagination"


const CardContainer = () => {

    const dogsAll = useSelector(state => state.dogs) // Traemos los dogs desde el store sin modificar
    const sortDogs = useSelector(state => state.sortDogs) // traemos las condiciones del sort
    const filterDogs = useSelector(state => state.filterDogs) // traemos las condiciones del filtrado
        
    const [ dogs, setDogs ] = useState([])
    
    
    //Paginacion
    const [ currentPage, setCurrentPage ] = useState(1) //Pagina actual
    const [ dogsPerPage ] = useState(8) //Cuartos dogs habra por pagina

    const indexOfLastDogs = currentPage * dogsPerPage;
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDogs = dogs.slice(indexOfFirstDogs, indexOfLastDogs)

    const paginate = pageNumber => setCurrentPage(pageNumber)
    //End Pagination



    useEffect( () => {
       
        filterSort();
    }, [dogsAll, filterDogs, sortDogs])

    // useEffect( () => {
    //     let data = createSort(dogs, sortDogs)
    //     setDogs(data)
    //     setCurrentPage(1)
    // }, [sortDogs])



    const filterTemperaments = (data, filter) => {
        const newDogsFilter = [...data];
        if(filter === "all"){
            return newDogsFilter;
        }
        const newDogsContains = newDogsFilter.filter(d => {
            if(d.temperament?.includes(filter)){
                return true
            } else {
                return false
            }
        })
        return newDogsContains;
    }

    const filterDB = (data, filter) => {
        let newDogFilter = []
        switch(filter){
            case "api":
                newDogFilter = [...data].filter(d => !!Number(d.id))
                return newDogFilter;
            case "db":
                newDogFilter = [...data].filter(d => !Number(d.id))
                return newDogFilter;
            default:
                return data;
        }
    }

    
    const filterSort = () => {
        let data = filterDB(dogsAll, filterDogs.db)
        data = filterTemperaments(data, filterDogs.temperament)
        data = createSort(data, sortDogs)
        setDogs(data)
        setCurrentPage(1)

    }
    // Funcion para ordenar por nombre o por peso
    const createSort = (data, orderBy) => {
        const sortDogsAll = [...data]
        switch (orderBy.sort){
            case "asc":
                sortDogsAll.sort( (a,b) => {
                    if((a[orderBy.type]) > (b[orderBy.type])){
                        return 1
                    }                        
                    if((a[orderBy.type]) < (b[orderBy.type])){
                        return -1
                    }
                    return 0
                });
                return sortDogsAll
            case "desc":
                sortDogsAll.sort( (a,b) => {
                    if((a[orderBy.type]) > (b[orderBy.type])){
                        return -1
                    }                        
                    if((a[orderBy.type]) < (b[orderBy.type])){
                        return 1
                    }
                    return 0
                });
                return sortDogsAll
            default:
                return sortDogsAll
                
        }

    }
    // Finaliza la funcion para ordenar los perros

    
    return (
        <div className={style.container}>
            <div className={style.cardContainer}>
                {
                    currentDogs.map(e => 
                            <Card 
                                key={e.id}
                                id = {e.id}
                                name = {e.name}
                                weight = {e.weightMax}
                                temperament = {e.temperament}
                                image = {e.image}         
                            />)
                }
            </div>
            <div>
                <Pagination dogsPerPage={dogsPerPage} totalDogs = {dogs.length} paginate={paginate}/>
            </div>
        </div>
    )
}

export default CardContainer;