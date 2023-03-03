
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogById } from "../../redux/actions";
import style from "./Card.module.css"

const Card = (props) => {
    const dispatch = useDispatch()

    const handlerDetail = (id) => {
        dispatch(getDogById(id))
    }

    return (
        <div className={style.cardContainer}>
            <Link key={props.id} to={`/detail/${props.id}`} onClick={() => handlerDetail(props.id)}>
            <p className={style.cardName}>{props.name}</p>
            </Link>
            {/* <div className={style.divWeight}> */}
                {/* <p>Weight:</p> */}
                <p className={style.cardWeight}>{props.weight} Kg</p>

            {/* </div> */}
            <div className={style.cardTemperament}>
                {
                    props.temperament?.map((t,i) => (<p key={i} className={style.temperament}>{t}</p>))
                }
            </div>
            <img className={style.cardImg} src={props.image} alt="Hola" />
        </div>
    )
}

export default Card;