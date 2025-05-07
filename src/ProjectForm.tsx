import { useState } from "react";
import { IProject } from "./models/Project";
import { v4 as uuid } from "uuid";
interface ProjectFormProps {
    onAdd: (project: IProject) => void;
  }
function ProjectForm({onAdd}:ProjectFormProps){
    
    const[formData,setFormData] = useState({
        name:"",
        description:"",
        status:"",
        createdAt:new Date(),
        updatedAt:new Date(),
    })
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const{name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const newProject : IProject = {
            id:uuid(),
            name:formData.name,
            description:formData.description,
            status:formData.status,
            createdAt:new Date(formData.createdAt),
            updatedAt:new Date(formData.updatedAt),
        }

        onAdd(newProject);
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={handleChange} style={{minWidth:"200px"}}/>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" onChange={handleChange} style={{minWidth:"200px"}}/>
            <label htmlFor="status">Status</label>
            <input type="text" name="status" onChange={handleChange} style={{minWidth:"200px"}}/>
            <label htmlFor="createdAt">Created At</label>
            <input type="date" name="createdAt" onChange={handleChange} style={{minWidth:"200px"}}/>
            <label htmlFor="updatedAt">Updated At</label>
            <input type="date" name="updatedAt" onChange={handleChange} style={{minWidth:"200px"}}/>
            <button type="submit">Add Project</button>
        </form>
    );
    

}
export default ProjectForm;