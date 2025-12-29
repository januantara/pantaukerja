import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addApplication as addApplicationApi, getApplications as getApplicationsApi, deleteApplication as deleteApplicationApi } from "~/lib/api/applications";
import { NewApplication } from "~/types/applications";

export const useApplications = () => {
    const queryClient = useQueryClient();

    const addApplication = useMutation({
        mutationFn: async (application: NewApplication) => {
            return await addApplicationApi(application);
        },
        onSuccess: () => {
            // Invalidate and refetch applications list
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
    });

    const deleteApplication = useMutation({
        mutationFn: async (id: string) => {
            return await deleteApplicationApi(id);
        },
        onSuccess: () => {
            // Invalidate and refetch applications list
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
    });

    const getApplications = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            return await getApplicationsApi();
        },
    });

    return { addApplication, deleteApplication, getApplications };
}
