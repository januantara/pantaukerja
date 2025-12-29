'use client';

import { useMemo, useState } from "react";
import type { NewApplication, Application } from "~/types/applications";
import { ApplicationCard } from "./components/ApplicationCard";
import { ApplicationListItem } from "./components/ApplicationListItem";
import { JobBoardEmptyState } from "./components/JobBoardEmptyState";
import { JobBoardFilters, type StatusFilter } from "./components/JobBoardFilters";
import { JobBoardHeader } from "./components/JobBoardHeader";
import { NewApplicationDialog } from "./NewApplicationDialog";
import { useApplications } from "~/hooks/useApplications";
import { Skeleton } from "~/components/ui/skeleton";

// Loading skeleton component
const LoadingSkeleton = ({ view }: { view: "list" | "grid" }) => (
    <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
        {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>
        ))}
    </div>
);

const JobBoard = () => {
    const [view, setView] = useState<"list" | "grid">("grid");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingApplication, setEditingApplication] = useState<Application | null>(null);

    const { addApplication, deleteApplication, getApplications } = useApplications();
    const applications = getApplications.data ?? [];

    const isLoading = getApplications.isLoading || getApplications.isFetching;
    const isMutating = addApplication.isPending || deleteApplication.isPending;

    // Filter applications based on status and search query
    const filteredApplications = useMemo(() => {
        return applications.filter((app) => {
            const matchesStatus = statusFilter === "all" || app.status === statusFilter;

            const query = searchQuery.toLowerCase().trim();
            const matchesSearch = !query ||
                app.company.toLowerCase().includes(query) ||
                app.position.toLowerCase().includes(query) ||
                app.location?.toLowerCase().includes(query);

            return matchesStatus && matchesSearch;
        });
    }, [applications, statusFilter, searchQuery]);

    const handleSubmit = (data: NewApplication) => {
        addApplication.mutate(data);
        setEditingApplication(null);
    };

    const handleEdit = (app: Application) => {
        setEditingApplication(app);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => deleteApplication.mutate(id);

    const handleOpenDialog = () => {
        setEditingApplication(null);
        setIsDialogOpen(true);
    };

    const renderApplications = () => {
        const CardComponent = view === 'grid' ? ApplicationCard : ApplicationListItem;
        const containerClass = view === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4";

        return (
            <div className={containerClass}>
                {filteredApplications.map((application) => (
                    <CardComponent
                        key={application.id}
                        application={application}
                        onClick={() => handleEdit(application)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <JobBoardHeader
                onAddClick={handleOpenDialog}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <NewApplicationDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleSubmit}
                initialData={editingApplication}
            />

            <JobBoardFilters
                view={view}
                onViewChange={setView}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />

            {isLoading || isMutating ? (
                <LoadingSkeleton view={view} />
            ) : filteredApplications.length === 0 ? (
                <JobBoardEmptyState onAddClick={handleOpenDialog} />
            ) : (
                renderApplications()
            )}
        </>
    );
};

export default JobBoard;
