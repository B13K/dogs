
import style from "./Card.module.css"

const Card = (props) => {



    return (
        <div className={style.cardContainer}>
            <p className={style.cardName}>{props.name}</p>
            <div className={style.divWeight}>
                <p>Weight:</p>
                <p className={style.cardWeight}>{props.weight}</p>

            </div>
            <div>
                {
                    props.temperament?.map((t,i) => (<p key={i} className={style.cardTemperament}>{t}</p>))
                }
            </div>
            <img className={style.cardImg} src={props.image} alt="Hola" />
        </div>
    )
}

export default Card;