import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addApplication as addApplicationApi,
    getApplications,
    updateApplication as updateApplicationApi,
    deleteApplication as deleteApplicationApi,
} from "~/lib/api/applications";
import type { Application, NewApplication } from "~/types/applications";

const QUERY_KEY = ["applications"] as const;

const invalidateApplications = (queryClient: ReturnType<typeof useQueryClient>) => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEY });
};

export const useApplications = () => {
    const queryClient = useQueryClient();

    const addApplication = useMutation({
        mutationFn: addApplicationApi,
        onSuccess: () => invalidateApplications(queryClient),
    });

    const updateApplication = useMutation({
        mutationFn: ({ id, application }: { id: string; application: NewApplication }) =>
            updateApplicationApi(id, application),
        onSuccess: () => invalidateApplications(queryClient),
    });

    const deleteApplication = useMutation({
        mutationFn: deleteApplicationApi,
        onSuccess: () => invalidateApplications(queryClient),
    });

    const getApplicationsQuery = useQuery<Application[]>({
        queryKey: QUERY_KEY,
        queryFn: getApplications,
        refetchOnWindowFocus: false,
    });

    return {
        addApplication,
        updateApplication,
        deleteApplication,
        getApplications: getApplicationsQuery,
    };
};

