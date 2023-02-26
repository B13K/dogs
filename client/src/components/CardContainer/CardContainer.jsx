
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import Card from "../Card/Card"
import style from "./CardContainer.module.css"
import Pagination from "../Pagination/Pagination"
import { getDogById } from "../../redux/actions"


const CardContainer = () => {
    const dispatch = useDispatch()

    const dogsAll = useSelector(state => state.dogs) // Traemos los dogs desde el store sin modificar
    const sortDogs = useSelector(state => state.sortDogs) // traemos las condiciones del sort
    const filterDogs = useSelector(state => state.filterDogs) // traemos las condiciones del filtrado
        
    const [ dogs, setDogs ] = useState([])
    
    
    //Paginacion
    const [ currentPage, setCurrentPage ] = useState(1) //Pagina actual
    const [ dogsPerPage ] = useState(9) //Cuartos dogs habra por pagina

    const indexOfLastDogs = currentPage * dogsPerPage;
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDogs = dogs.slice(indexOfFirstDogs, indexOfLastDogs)

    const paginate = pageNumber => setCurrentPage(pageNumber)
    //End Pagination

    

    // useEffect( () => {        
    //     setDogs(dogsAll)
    //     setCurrentPage(1) //Se posiciona en la pagina uno cada vez que realiza un filtro
    // },[dogsAll,])

    useEffect( () => {
        // let data = filterDB(dogsAll, filterDogs.db)
        // data = filterTemperaments(data, filterDogs.temperament)
        // data = createSort(data, sortDogs)
        // setDogs(data)
        // setCurrentPage(1)
        filterSort();
    }, [dogsAll, filterDogs])

    useEffect( () => {
        let data = createSort(dogs, sortDogs)
        setDogs(data)
        setCurrentPage(1)
    }, [sortDogs])

    const filterSort = () => {
        let data = filterDB(dogsAll, filterDogs.db)
        data = filterTemperaments(data, filterDogs.temperament)
        data = createSort(data, sortDogs)
        setDogs(data)
        setCurrentPage(1)

    }


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

    // Funcion para ordenar por nombre o por peso
    const createSort = (data, orderBy) => {
        const sortDogsAll = [...data]
        switch (orderBy.sort){
            case "asc":
                sortDogsAll.sort( (a,b) => {
                    if(Number(a[orderBy.type]) > Number(b[orderBy.type])){
                        return 1
                    }                        
                    if(Number(a[orderBy.type]) < Number(b[orderBy.type])){
                        return -1
                    }
                    return 0
                });
                return sortDogsAll
            case "desc":
                sortDogsAll.sort( (a,b) => {
                    if(Number(a[orderBy.type]) > Number(b[orderBy.type])){
                        return -1
                    }                        
                    if(Number(a[orderBy.type]) < Number(b[orderBy.type])){
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

    const handlerDetail = (id) => {
        dispatch(getDogById(id))
    }
    return (
        <div className={style.container}>
        <div>
            <Pagination dogsPerPage={dogsPerPage} totalDogs = {dogs.length} paginate={paginate}/>
        </div>
            <div className={style.cardContainer}>
                {
                    currentDogs.map(e => 
                        <Link key={e.id} to={`/detail/${e.id}`} onClick={() => handlerDetail(e.id)}>
                            <Card 
                                id = {e.id}
                                name = {e.name}
                                weight = {e.weightMax}
                                temperament = {e.temperament}
                                image = {e.image}         
                            />
                            
                        </Link>)
                }
            </div>
        </div>
    )
}

export default CardContainer;