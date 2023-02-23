
import style from "./Card.module.css"

const Card = (props) => {

    return (
        <div className={style.card}>
            <p>{props.name}</p>
            <p>{props.weight}</p>
            <p>{props.temperament}</p>
            <img src={props.image} alt="Hola" className={style.imgCard}/>
        </div>
    )
}

export default Card;