import { useState } from "react";
import { IProject, statusOptions } from "./models/Project";
import { v4 as uuid } from "uuid";

interface ProjectFormProps {
    onAdd: (project: IProject) => void;
}

function ProjectForm({onAdd}:ProjectFormProps){
    
    const[formData,setFormData] = useState({
        name:"",
        description:"",
        status: statusOptions[0], // Default status
        startDate: new Date(),
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>){ 
        const{name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        // Basic validation check
        if (!formData.name || !formData.description || !formData.startDate) {
            alert("Please fill in all required fields: Name, Description, and Start Date.");
            return;
        }

        // Validate startDate
        const projectStartDate = new Date(formData.startDate); 
        if (isNaN(projectStartDate.getTime())) { 
            alert("Start Date is not a valid date. Please use YYYY-MM-DD format.");
            return;
        }

        const year = projectStartDate.getFullYear();
        if (year < 1000 || year > 9999) {
            alert("Start Date year must be between 1000 and 9999.");
            return;
        }

        const newProject : IProject = {
            id:uuid(),
            name:formData.name,
            description:formData.description,
            status:formData.status,
            startDate: projectStartDate, // Use the validated date object
        }

        onAdd(newProject);
        // Optionally reset form
        setFormData({
            name: "",
            description: "",
            status: statusOptions[0],
            startDate: new Date(),
        });
    }

    // Helper to format date for input type='date'
    const formatDateForInput = (dateValue: string | Date): string => {
        const dateObj = dateValue instanceof Date ? dateValue : new Date(dateValue);
    
        if (isNaN(dateObj.getTime())) {
            // If the current input string can't be parsed into a valid date, return empty.
            // This helps if user types something completely non-sensical.
            return '';
        }
    
        const year = dateObj.getFullYear();
        // HTML date input typically expects years between 0001 and 9999 for standard YYYY-MM-DD format.
        // If year is outside this, toISOString() might produce an extended format (e.g., +002023-10-26)
        // which <input type="date"> cannot render, causing a crash.
        if (year < 1 || year > 9999) { 
            return ''; // Return empty string to prevent crash, user's raw input remains in formData.startDate
        }
        
        // If it's a valid date with a year in the standard range, format it.
        return dateObj.toISOString().split('T')[0];
    };

    return(
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto my-8">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                    name="description" 
                    id="description"
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                    name="status" 
                    id="status"
                    value={formData.status} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input 
                    type="date" 
                    name="startDate" 
                    id="startDate"
                    value={formatDateForInput(formData.startDate)} // Pass formData.startDate directly
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add Project
            </button>
        </form>
    );
}
export default ProjectForm;