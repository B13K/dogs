import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import style from "./Detail.module.css"

const Detail = () => {

    const dogId = useSelector(state => state.dog)
    // const dispatch = useDispatch(getDogById(id))

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
        setDog(dogId)
    }, [dogId])
    
    return (
    <div className={style.detailContainer}>
        <div className={style.detailData}>
            <div className={style.detailSpace1}></div>
            <div className={style.detailDogData}>
                <div className={`${style.detailDivData} ${style.detailDivDataName}`}>
                    <h1>{dog.name}</h1>
                </div>
                <div className={style.detailDivData}>
                    <label>Height:</label>
                    <p>{`${dog.heightMin} - ${dog.heightMax} cm`}</p>
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
            <img src={dog.image}/>
        </div>
    </div>
    )
}

export default Detail;