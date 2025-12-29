import type { Application, NewApplication } from "~/types/applications";

export const getApplications = async (): Promise<Application[]> => {
    const response = await fetch('/api/applications');
    if (!response.ok) {
        throw new Error('Failed to fetch applications');
    }
    return response.json();
};

export const addApplication = async (application: NewApplication): Promise<Application> => {
    const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
    });
    if (!response.ok) {
        throw new Error('Failed to add application');
    }
    return response.json();
};

export const updateApplication = async (id: string, application: NewApplication): Promise<Application> => {
    const response = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
    });
    if (!response.ok) {
        throw new Error('Failed to update application');
    }
    return response.json();
};

export const deleteApplication = async (id: string): Promise<void> => {
    const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete application');
    }
};
