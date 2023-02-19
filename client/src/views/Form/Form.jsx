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
            setForm({...form, temperaments: temperaments})
        }
        else{
            setForm({...form, [name]: value}) 
        }       
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={form.name} name="name" onChange={changeHandlerForm}/>
                </div>
                <div>
                    <label>Height Min:</label>
                    <input type="number" value={form.heightMin} name="heightMin" onChange={changeHandlerForm} />
                </div>
                <div>
                    <label>Height Max:</label>
                    <input type="number" value={form.heightMax} name="heightMax" onChange={changeHandlerForm} />
                </div>
                <div>
                    <label>Weight Min:</label>
                    <input type="number" value={form.weightMin} name="weightMin" onChange={changeHandlerForm} />
                </div>
                <div>
                    <label>Wight Max:</label>
                    <input type="number" value={form.weightMax} name="weightMax" onChange={changeHandlerForm} />
                </div>
                <div>
                    <label>Life:</label>
                    <input type="number" value={form.life} name="life" onChange={changeHandlerForm} />
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