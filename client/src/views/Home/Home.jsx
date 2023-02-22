import CardContainer from "../../components/CardContainer/CardContainer"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions"


const Home = () => {

        
    //cuando se inicializa, tiene que hacer el dispatch

    //1.- Declaramos el dispatch
    const dispatch = useDispatch();

    //2.- Usamos el useEffect al inicializar el home

    useEffect( () => {
        dispatch(getDogs())
    }, [dispatch])


    

    return (
        <CardContainer/>
    )
}

export default Home;