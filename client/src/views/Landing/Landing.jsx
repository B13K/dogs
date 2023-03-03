import { Link } from "react-router-dom";
import style from "./Landing.module.css"


const Landing = () => {

    return (
        <div className={style.landingContent}>
            <section className={style.landingBloque1}>
            </section>
            <section className={style.landingBloque2}>
                <h1>Welcome to my page the Dogs!!!</h1>                
            </section>
            <button className={style.buttonLanding}>
                <Link to="/home">
                <img src="https://imagenesparapeques.com/wp-content/uploads/2017/08/Bingo-y-Rolly-imagenes.png" alt="Imagen de un perro"/></Link>
            </button>

        </div>

    )
}

export default Landing;