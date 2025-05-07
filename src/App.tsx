
import ProjectForm from "./ProjectForm";

import { useState } from "react";
import { IProject } from "./models/Project";

export default function App() {
    const [projects,setProjects] = useState<IProject[]>([]);
    function addProject(project: IProject){
        setProjects((prev)=>([...prev,project]))
    }
    console.log(projects);
  return (
    <main className="flex flex-col">
      <header className="flex h-24 bg-light-green">
        <img src="/logo.png" height={64} className="h-16 m-auto" />
        
      </header>
    
      <ProjectForm onAdd={addProject}/>
      <h2 loc>Current Projects</h2>
      <table style= {{borderCollapse : "collapse"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p,index)=>(
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.status}</td>
              <td>{p.createdAt.toDateString()}</td>
              <td>{p.updatedAt.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </main>
  );
}
