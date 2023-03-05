import { useSelector, useDispatch } from "react-redux"
import {useLocation} from "react-router-dom"
import { useState, useEffect } from "react"
import { getDogById, resetDogById } from "../../redux/actions"
import style from "./Detail.module.css"
import Spinner from "../../components/Spinner/Spinner"

const Detail = () => {

    const location = useLocation();
    const dogId = useSelector(state => state.dog)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)
    const [dog, setDog] = useState({
        id: null,
        name: null,
        heightMin: null,
        heightMax: null,
        weightMin: null,
        weightMax: null,
        life: null,
        image: null,
        temperament: []

    })

    
    useEffect( () => {
        const id = location.pathname.split("/")[2]
        dispatch(getDogById(id))
        
        return () => {
            dispatch(resetDogById())
        }
    }, [dispatch, location])
    

    useEffect( () => {
        setLoad(true)
        setDog(dogId)
        if(Object.keys(dogId).length){  
            setLoad(false)
        }
    }, [dogId])


    return (
        <div className={style.detailMain}>
        {
            load ?  <Spinner/>
                 :  <div className={style.detailContainer}>
                                     <div className={style.detailData}>
                                         <div className={style.detailSpace1}></div>
                                         <div className={style.detailDogData}>
                                             <div className={`${style.detailDivData} ${style.detailDivDataName}`}>
                                                 <h1>{dog.name}</h1>
                                             </div>
                                             <div className={style.detailDivData}>
                                                 <label>Height:</label>
                                                 {
                                                     dog.heightMax ?  <p>{`${dog.heightMin} - ${dog.heightMax} cm`}</p>
                                                                 :  <p>{`${dog.heightMin} cm`}</p>
                                                 }
                                                 {/* <p>{`${dog.heightMin} - ${dog.heightMax} cm`}</p> */}
                                             </div>
                                             <div className={style.detailDivData}>
                                                 <label>Weight:</label>
                                                 <p>{`${dog.weightMin} - ${dog.weightMax} Kg`}</p>
                                             </div>
                                             <div className={style.detailDivData}>
                                                 <label>life:</label>
                                                 <p>{`${dog.life} years`}</p>
                                             </div>
                                             <div className={style.detailDivData}>
                                                 <label>Temperament:</label>
                                                 <div className={style.detailDivTemperament}>
                                                     {
                                                         dog.temperament?.map((t,i) => <p className={style.detailTemperament} key={i}>{t}</p>)
                                                     }
                                                 </div>
                                             </div>
                                         </div> 
                                     </div>
                                     <div className={style.detailImg}>
                                         <img src={dog.image} alt="Dogs"/>
                                     </div>
                 </div>
        }
        </div>
    )
}

export default Detail;