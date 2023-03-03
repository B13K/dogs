import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getTemperaments } from "../../redux/actions";
import style from "./Form.module.css"
import imagen from "../../assets/perro.svg"

const Form = () => {
    const url = "http://localhost:3001/dogs"
    
    const dispatch = useDispatch()
    const temperamentsAll = useSelector(state => state.temperaments)

    const [temperaments, setTemperaments] = useState({})

    const validation = ({name, heightMin, heightMax, weightMin, weightMax, life, temperaments}) => {
        let error = {}
        if(nameRegex.test(name)){
            error.name = "El nombre no debe contener numeros";
        } 

        if(heightMax !== "" && Number(heightMax) < Number(heightMin)){
            error.heightMax = "Height maximo no puede ser menor que el Height minimo";
        }

        if(weightMax.length && Number(weightMax) < Number(weightMin)){
           error.weightMax = "Weight maximo no puede ser menor que el Weight minimo";
        }
        if(!life.length){
            error.life = "El life no puede ser vacio"
        }

        if(temperaments.length) {
            let arrValues = []
           temperaments.forEach(t => t.id !== undefined && arrValues.push(Object.values(t)[0]))
           const arrSet = new Set([...arrValues])
           if(arrValues.length < temperaments.length){
            error.temperaments = "Hay temperaments que faltan asignar"
           }
           if(arrSet.size < arrValues.length){
            console.log("ingei")
            error.temperaments = "Hay temperaments duplicados"
           }
        }
        return error;
        
        
    }

    useEffect( () => {
        setTemperaments(temperamentsAll)
    }, [temperamentsAll])

    useEffect( () => {
        dispatch(getTemperaments())
    }, [dispatch])

    
    const newTemperament = {
        id: undefined,
    }

    const [ form, setForm] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMax: "",
        weightMin: "",
        life: "",
        temperaments: []

    })

    const [ error, setError ] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMax: "",
        weightMin: "",
        life: "",
        temperaments: ""
    })



    const addTemperament = (e) => {
        setForm({
            ...form, temperaments: [...form.temperaments, {...newTemperament}]
        })
    }

    const changeHandlerForm = (event) => {
        const { id, name, value} = event.target;
        if(id !== ""){
            const temperaments = [...form.temperaments];
            temperaments[id].id = value
            let err = validation({...form, temperaments: temperaments}) // Verifico si hay errores en el form
            setError(err) // Seteo los errores despues de validarlos
            setForm({...form, temperaments: temperaments})
        }
        else{
            let err = validation({...form, [name]: value}) // Verifico si hay errores en el form
            setError(err) // Seteo los errores despues de validarlos
            setForm({...form, [name]: value}) 
        }       
    }

    const handleSubmit = (e) => {        
        e.preventDefault();

        //Primero verifico si hay errores en el form
        setError(validation({...form}))

        axios.post(url, form)
            .then(data => alert("Create dog successfull"))
            .catch(data => alert("Create dog error"))
        
    }

    const nameRegex = /\d/ // Regex para verificar si el nombre contiene numeros

  
    const deleteTemperament = (e) => {  
        const {id,name} = e.target
        if(!id){
            const tempDelete = [...form.temperaments].filter((t,i) => i!==Number(name))
            setForm({...form, temperaments: tempDelete})
            // setError({...form, temperaments: tempDelete})
        }else {
            const tempDelete = [...form.temperaments].filter(t => t.id !== id)
            setForm({...form, temperaments: tempDelete})
            // setError({...form, temperaments: tempDelete})

        }
    }

   
    return (
        <div className={style.formContainer}>
            <object className={style.div1} data={imagen} type="image/svg+xml"/>
            <object className={style.div2} data={imagen} type="image/svg+xml"/>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formDiv}>
                    <div className={style.divData}>
                        <label>Name:</label>
                        <input className={!error.name?.length ? style.inputClassOk : style.inputClassError} type="text" value={form.name} name="name" onChange={changeHandlerForm}/>
                    </div>
                        {
                            error.name !== "" && <span className={style.error}>{error.name}</span>
                        }
                </div>
                <div className={style.formDiv}>
                    <div className={style.divData}>
                        <label>Height Min (cm):</label>
                        <input className={!error.heightMax?.length ? style.inputClassOk : style.inputClassError} type="number" value={form.heightMin} name="heightMin" onChange={changeHandlerForm} />
                        </div>
                    {
                        error.heightMin !== "" && <span className={style.error}>{error.heightMin}</span>
                    }
                </div>
                <div className={style.formDiv}>
                    <div className={style.divData}>
                        <label>Height Max (cm):</label>
                        <input className={!error.heightMax?.length ? style.inputClassOk : style.inputClassError} type="number" value={form.heightMax} name="heightMax" onChange={changeHandlerForm} />
                    </div>
                    {
                        error.heightMax !== "" && <span className={style.error}>{error.heightMax}</span>
                    }
                </div>
                <div className={style.formDiv}>
                    <div className={style.divData}>
                        <label>Weight Min (kg):</label>
                        <input className={!error.weightMax?.length ? style.inputClassOk : style.inputClassError} type="number" value={form.weightMin} name="weightMin" onChange={changeHandlerForm} />
                    </div>
                    {
                        error.weightMin !== "" && <span className={style.error}>{error.weightMin}</span>
                    }
                </div>
                <div className={style.formDiv}>
                    <div className={style.divData}>
                        <label>Weight Max (kg):</label>
                        <input className={!error.weightMax?.length ? style.inputClassOk : style.inputClassError} type="number" value={form.weightMax} name="weightMax" onChange={changeHandlerForm} />
                    </div>
                    {
                        error.weightMax !== "" && <span className={style.error}>{error.weightMax}</span>
                    }
                </div>
                <div className={style.formDiv}>
                    <div className={style.divData}>
                        <label>Life (Years):</label>
                        <input className={!error.life?.length ? style.inputClassOk : style.inputClassError} type="number" value={form.life} name="life" onChange={changeHandlerForm} />
                    </div>
                    {
                        error.life !== "" &&  <span className={style.error}>{error.life}</span>
                    }
                </div>
                <div className={style.formDiv}>
                    <input className={style.formButton} type="button" value="Add temperament" onClick={addTemperament}/>
                    {
                        error.temperaments !== "" && <span className={style.error}>{error.temperaments}</span>
                    }
                    {
                        form.temperaments.map( (t, i) => (
                            <div key={i+1} className={style.divDataTemperament}>
                                <label>Temperament {i}:</label>
                                <select id={i} value={t.id} onChange={changeHandlerForm}>
                                    <option id={undefined}>Not temperament</option>
                                    {
                                        temperamentsAll.map( (temp,index) => (
                                            <option
                                                key={index}
                                                value={temp.id}>{temp.name}</option>
                                        ))
                                    }
                                </select>
                                <input type="button" id={undefined} name={i} value="-" onClick={deleteTemperament}/>
                            </div>
                        ))
                    }
                </div> 
                <input type="submit" value="Send new Dog" />
            </form>
        </div>
    )
    
}

export default Form;


// <div>
//                     <input type="button" value="Add temperament" onClick={addTemperament}/>
//                     {
//                         form.temperaments.map( (t, i) => (
//                             <div key={i+1}>
//                                 <label>Temperament {i}:</label>
//                                 <input 
//                                     type="text"
//                                     id={i}
//                                     name={`name-${i}`}
//                                     data-name="name"
//                                     value={t.name}
//                                     onChange={changeHandlerForm}
//                                  />
//                             </div>
//                         ))
//                     }
//                 </div>






// <div>
// <input type="button" value="Add temperament" onClick={addTemperament}/>
// {
//     form.temperaments.map( (t, i) => (
//         <div key={i+1}>
//             <label>Temperament {i}:</label>
//             <select value={form.temperaments[i]} onChange={changeHandlerForm}>
//                 {
//                     temperamentsAll.map( (t,i) => (
//                         <option
//                             key={i}
//                             value={t.id}>{t.name}</option>
//                     ))
//                 }
//             </select>
//         </div>
//     ))
// }
// </div> 