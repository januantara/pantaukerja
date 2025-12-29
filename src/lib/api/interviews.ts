import { NewInterview, InterviewWithApplication } from "~/types/interviews";

export const getInterviews = async (): Promise<InterviewWithApplication[]> => {
    const response = await fetch('/api/interviews');
    if (!response.ok) throw new Error("Failed to fetch interviews");
    return response.json();
}

export const addInterview = async (interview: NewInterview): Promise<InterviewWithApplication> => {
    const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(interview),
    });
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Failed to add interview" }));
        throw new Error(error.error || "Failed to add interview");
    }
    return response.json();
}

export const updateInterview = async (id: string, interview: NewInterview): Promise<InterviewWithApplication> => {
    const response = await fetch(`/api/interviews/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(interview),
    });
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Failed to update interview" }));
        throw new Error(error.error || "Failed to update interview");
    }
    return response.json();
}

export const deleteInterview = async (id: string): Promise<void> => {
    const response = await fetch(`/api/interviews/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Failed to delete interview" }));
        throw new Error(error.error || "Failed to delete interview");
    }
}
