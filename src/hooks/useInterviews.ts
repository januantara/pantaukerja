import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addInterview as addInterviewApi, getInterviews as getInterviewsApi, deleteInterview as deleteInterviewApi, updateInterview as updateInterviewApi } from "~/lib/api/interviews";
import { NewInterview } from "~/types/interviews";

export const useInterviews = () => {
    const queryClient = useQueryClient();

    const addInterview = useMutation({
        mutationFn: async (interview: NewInterview) => {
            return await addInterviewApi(interview);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["interviews"] });
        },
    });

    const updateInterview = useMutation({
        mutationFn: async ({ id, interview }: { id: string; interview: NewInterview }) => {
            return await updateInterviewApi(id, interview);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["interviews"] });
        },
    });

    const deleteInterview = useMutation({
        mutationFn: async (id: string) => {
            return await deleteInterviewApi(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["interviews"] });
        },
    });

    const getInterviews = useQuery({
        queryKey: ["interviews"],
        queryFn: async () => {
            return await getInterviewsApi();
        },
    });

    return { addInterview, updateInterview, deleteInterview, getInterviews };
}
