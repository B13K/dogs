import { useState } from "react";


const Form = () => {

    
    const newTemperament = {
        name: ""
    }

    const [ form, setForm] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMax: "",
        weightMin: "",
        life: "",
        temperaments: [{...newTemperament}]

    })

    const [ error, setError ] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMax: "",
        weightMin: "",
        life: "",
        temperaments: []
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
            temperaments[id][event.target.dataset.name] = value
            validation({...form, temperaments: temperaments})
            setForm({...form, temperaments: temperaments})
        }
        else{
            validation({...form, [name]: value})
            setForm({...form, [name]: value}) 
        }       
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
    }

    const nameRegex = /\d/

    const validation = (formulario) => {
        if(nameRegex.test(formulario.name)){
            setError({...error, name: "El nombre no puede contener numeros"})
        }
        // else {
        //     setError({...error, name: ""})
        // }
        if(formulario.heightMin > formulario.heightMax){
            setError({...error, heightMin: "Height minimo no puede ser mayor que el Height maximo"})
        }
        // else {
        //     setError({...error, heightMin: ""})
        // }
        if(formulario.heightMax < formulario.heightMin){
            setError({...error, heightMax: "Height maximo no puede ser menor que el Height minimo"})
        }
        // else {
        //     setError({...error, heightMax: ""})
        // }
        if(formulario.weightMin > formulario.weightMax){
            setError({...error, weightMin: "Weight minimo no puede ser mayor que el Weight maximo"})
        }
        // else {
        //     setError({...error, weightMin: ""})
        // }
        if(formulario.weightMax < formulario.weightMin){
            setError({...error, weightMax: "Weight maximo no puede ser menor que el Weight minimo"})
        }
        // else {
        //     setError({...error, weightMax: ""})
        // }
        
    }

   
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={form.name} name="name" onChange={changeHandlerForm}/>
                    {
                        error.name !== "" && <span>{error.name}</span>
                    }
                </div>
                <div>
                    <label>Height Min:</label>
                    <input type="number" value={form.heightMin} name="heightMin" onChange={changeHandlerForm} />
                    {
                        error.heightMin !== "" && <span>{error.heightMin}</span>
                    }
                </div>
                <div>
                    <label>Height Max:</label>
                    <input type="number" value={form.heightMax} name="heightMax" onChange={changeHandlerForm} />
                    {
                        error.heightMax !== "" && <span>{error.heightMax}</span>
                    }
                </div>
                <div>
                    <label>Weight Min:</label>
                    <input type="number" value={form.weightMin} name="weightMin" onChange={changeHandlerForm} />
                    {
                        error.weightMin !== "" && <span>{error.weightMin}</span>
                    }
                </div>
                <div>
                    <label>Weight Max:</label>
                    <input type="number" value={form.weightMax} name="weightMax" onChange={changeHandlerForm} />
                    {
                        error.weightMax !== "" && <span>{error.weightMax}</span>
                    }
                </div>
                <div>
                    <label>Life:</label>
                    <input type="number" value={form.life} name="life" onChange={changeHandlerForm} />
                    {
                        error.life !== "" && <span>{error.life}</span>
                    }
                </div>
                <div>
                    <input type="button" value="Add temperament" onClick={addTemperament}/>
                    {
                        form.temperaments.map( (t, i) => (
                            <div key={i+1}>
                                <label>Temperament {i}:</label>
                                <input 
                                    type="text"
                                    id={i}
                                    name={`name-${i}`}
                                    data-name="name"
                                    value={t.name}
                                    onChange={changeHandlerForm}
                                 />
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