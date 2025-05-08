export interface IProject {
    id: string;
    name: string;
    description: string;
    status: string;
    startDate: Date;
    // iproject export setup
}

export const statusOptions = ["Not Started", "In Progress", "On Hold", "Completed"];
