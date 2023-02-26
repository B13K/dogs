import CardContainer from "../../components/CardContainer/CardContainer"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions"
import FilterBar from "../../components/FilterBar/FilterBar";
import SortBar from "../../components/SortBar/SortBar";
import style from "./Home.module.css"


const Home = () => {

        
    //cuando se inicializa, tiene que hacer el dispatch

    //1.- Declaramos el dispatch
    const dispatch = useDispatch();

    //2.- Usamos el useEffect al inicializar el home

    useEffect( () => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [dispatch])


    

    return (
        <div className={style.homeContainer}>
            <div className={style.filterSort}>
                <FilterBar/>
                <SortBar />
            </div>
            <CardContainer/>
        </div>
    )
}

export default Home;