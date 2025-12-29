'use client';

import { useMemo, useState } from "react";
import { CalendarCheck, Plus, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { useInterviews } from "~/hooks/useInterviews";
import { useApplications } from "~/hooks/useApplications";
import { NewInterviewDialog } from "./NewInterviewDialog";
import { InterviewCard } from "./components/InterviewCard";
import type { NewInterview, InterviewWithApplication } from "~/types/interviews";

// Loading skeleton component
const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <Skeleton className="h-9 w-10" />
                </div>
            </div>
        ))}
    </div>
);

// Empty state component
interface EmptyStateProps {
    hasApplications: boolean;
    onAddClick: () => void;
}

const EmptyState = ({ hasApplications, onAddClick }: EmptyStateProps) => (
    <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center bg-card/50">
        <div className="bg-background p-6 rounded-full flex items-center justify-center border border-border shadow-sm">
            <CalendarCheck className="size-10 text-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mt-6 text-foreground">No interviews scheduled</h2>
        <p className="text-muted-foreground mt-2 text-center">
            {hasApplications
                ? "Schedule your first interview to keep track of your upcoming meetings"
                : "Add a job application first, then schedule your interviews"
            }
        </p>
        <Button className="mt-6" onClick={onAddClick} disabled={!hasApplications}>
            <Plus /> Add Interview
        </Button>
    </div>
);

const InterviewBoard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingInterview, setEditingInterview] = useState<InterviewWithApplication | null>(null);

    const { addInterview, updateInterview, deleteInterview, getInterviews } = useInterviews();
    const { getApplications } = useApplications();

    const interviews = getInterviews.data ?? [];
    const applications = getApplications.data ?? [];
    const hasApplications = applications.length > 0;

    const isLoading = getInterviews.isLoading || getInterviews.isFetching;
    const isMutating = addInterview.isPending || updateInterview.isPending || deleteInterview.isPending;

    // Filter interviews based on search query
    const filteredInterviews = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return interviews;

        return interviews.filter((interview) =>
            interview.application.company.toLowerCase().includes(query) ||
            interview.application.position.toLowerCase().includes(query) ||
            interview.location.toLowerCase().includes(query) ||
            interview.type.toLowerCase().includes(query)
        );
    }, [interviews, searchQuery]);

    const handleSubmit = (data: NewInterview) => {
        if (editingInterview) {
            updateInterview.mutate({ id: editingInterview.id, interview: data });
        } else {
            addInterview.mutate(data);
        }
        setEditingInterview(null);
    };

    const handleEdit = (interview: InterviewWithApplication) => {
        setEditingInterview(interview);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => deleteInterview.mutate(id);

    const handleOpenDialog = () => {
        setEditingInterview(null);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) setEditingInterview(null);
    };

    return (
        <>
            {/* Header */}
            <div className="flex max-sm:flex-col gap-2 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        className="pl-10"
                        placeholder="Search by company, position, or type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button onClick={handleOpenDialog} disabled={!hasApplications}>
                    <Plus /> Add Interview
                </Button>
            </div>

            {/* Dialog */}
            <NewInterviewDialog
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
                onSubmit={handleSubmit}
                applications={applications}
                initialData={editingInterview}
            />

            {/* Content */}
            {isLoading || isMutating ? (
                <LoadingSkeleton />
            ) : filteredInterviews.length === 0 ? (
                <EmptyState hasApplications={hasApplications} onAddClick={handleOpenDialog} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredInterviews.map((interview) => (
                        <InterviewCard
                            key={interview.id}
                            interview={interview}
                            onClick={() => handleEdit(interview)}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default InterviewBoard;