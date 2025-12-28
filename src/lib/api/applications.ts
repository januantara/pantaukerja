import { NewApplication } from "~/types/applications";

export const getApplications = async () => {
    const response = await fetch('/api/applications');
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
}

export const addApplication = async (application: NewApplication) => {
    const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
    });
    if (!response.ok) throw new Error("Failed to add user");
    return response.json();
}
