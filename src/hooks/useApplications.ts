import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addApplication as addApplicationApi, getApplications, updateApplication as updateApplicationApi, deleteApplication as deleteApplicationApi } from "~/lib/api/applications";
import type { Application, NewApplication } from "~/types/applications";

export const useApplications = () => {
    const queryClient = useQueryClient();

    const addApplication = useMutation({
        mutationFn: async (application: NewApplication) => await addApplicationApi(application),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
    });

    const updateApplication = useMutation({
        mutationFn: async ({ id, application }: { id: string; application: NewApplication }) =>
            await updateApplicationApi(id, application),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
    });

    const deleteApplication = useMutation({
        mutationFn: async (id: string) => await deleteApplicationApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
    });

    const getApplicationsQuery = useQuery<Application[]>({
        queryKey: ["applications"],
        queryFn: getApplications,
        refetchOnWindowFocus: false,
    });

    return {
        addApplication,
        updateApplication,
        deleteApplication,
        getApplications: getApplicationsQuery
    };
};
