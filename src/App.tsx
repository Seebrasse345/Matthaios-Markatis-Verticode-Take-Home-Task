import ProjectForm from "./ProjectForm";
import { useState } from "react";
import { IProject, statusOptions } from "./models/Project"; 

export default function App() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [showForm, setShowForm] = useState<boolean>(true);

    function addProject(project: IProject) {
        setProjects((prev) => [...prev, project]);
        setShowForm(false); 
    }

    function handleUpdateStatus(projectId: string, newStatus: string) {
        setProjects(prevProjects => 
            prevProjects.map(p => 
                p.id === projectId ? { ...p, status: newStatus } : p
            )
        );
    }

    const completedStatus = statusOptions.find(s => s === "Completed") || "Completed"; 

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
            <header className="w-full flex justify-center items-center h-24 bg-green-600 shadow-md mb-8">
                <img src="/logo.png" alt="Logo" className="h-16" />
            </header>

            {showForm ? (
                <ProjectForm onAdd={addProject} />
            ) : (
                <div className="w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">My Projects</h2>
                        <button 
                            onClick={() => setShowForm(true)} 
                            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Add New Project
                        </button>
                    </div>

                    {projects.length > 0 ? (
                        <div className="space-y-6">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white shadow-xl rounded-lg p-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.name}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                            <p className="text-md text-gray-900 whitespace-pre-wrap">{project.description}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Current Status</h4>
                                            <p className={`text-md font-semibold ${project.status === completedStatus ? 'text-green-500' : 'text-yellow-500'}`}>
                                                {project.status}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
                                            <p className="text-md text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor={`status-select-${project.id}`} className="block text-sm font-medium text-gray-700 mb-1">Change Status:</label>
                                        <select 
                                            id={`status-select-${project.id}`}
                                            name="status"
                                            value={project.status}
                                            onChange={(e) => handleUpdateStatus(project.id, e.target.value)}
                                            className="mt-1 block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                                        >
                                            {statusOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-600 text-lg mb-4">You haven't added any projects yet.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
