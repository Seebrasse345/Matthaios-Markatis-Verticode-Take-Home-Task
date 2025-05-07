export interface IProject {
    id: string;
    name: string;
    description: string;
    status: string;
    startDate: Date;
    // updatedAt: Date; No longer needed
}

export const statusOptions = ["Not Started", "In Progress", "On Hold", "Completed"];
