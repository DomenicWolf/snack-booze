import { useState } from "react"
import './NewItemForm.css'
import SnackOrBoozeApi from "./Api"
import { redirect,useNavigate } from "react-router-dom"
const NewItemForm = ({addItem,isLoading,setReset}) => {
    const navigate = useNavigate()
    const INITIALSTATE = {
        type:'',
        name:'',
        description:'',
        recipe:'',
        serve:''
    }
    const [formData,setFormData] = useState(INITIALSTATE)
    const handleChange = e => {
        const {name,value} = e.target
        console.log(e.target)
        console.log(formData)
        setFormData(data => ({
            ...data,
            [name]: value
        }))
        
    }

    const handleSubmit = async e => {
        setReset(false);
        e.preventDefault();
        const {name,description,recipe,serve,type} = formData;
        if(!type){
            alert('Must add type!')
            return null
        }
        setFormData(INITIALSTATE)
        
        let res;
        type === 'Snacks' ? res = await SnackOrBoozeApi.updateSnacks({name,description,recipe,serve,type}) : res = await SnackOrBoozeApi.updateDrinks({name,description,recipe,serve,type})
        addItem(type,{name,description,recipe,serve})
        console.log(isLoading)
        setReset(true)
        if(isLoading === true){
            setTimeout(!isLoading,1000)
        }else{
            return navigate(`/${type}`)
        }
        
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Add an Item to our menu!</h1>
            <div className="radio">
                {/* <label>Type of item</label> */}
                <div>
                    <label htmlFor='type'>Snack</label>
                    <input
                    type='radio'
                    name='type'
                    value='Snacks'
                    onChange={handleChange}
                    />
                </div>
             <div>
                    <label htmlFor='type'>Drink</label>
                    <input
                    type='radio'
                    name='type'
                    value='Drinks'
                    onChange={handleChange}
                    />
                </div>
            </div>
            
                {/* <label htmlFor='name'>Name</label> */}
                <input
                type='text'
                name='name'
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                />
                
           
            
            
                {/* <label htmlFor='description'>Description</label> */}
                <input
                type='text'
                name='description'
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                />
            
            
                {/* <label htmlFor='recipe'>Recipe</label> */}
                <input
                type='text'
                name='recipe'
                placeholder="Recipe"
                value={formData.recipe}
                onChange={handleChange}
                />
            
                {/* <label htmlFor='serve'>Serve</label> */}
                <input
                type='text'
                name='serve'
                placeholder="Serve"
                value={formData.serve}
                onChange={handleChange}
                />
            
            <button>Submit!</button>
        </form>
    )
}

export default NewItemForm;