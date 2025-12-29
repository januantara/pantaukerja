'use client';

import { useMemo, useState } from "react";
import { useInterviews } from "~/hooks/useInterviews";
import { useApplications } from "~/hooks/useApplications";
import { NewInterviewDialog } from "./interview/NewInterviewDialog";
import { InterviewCard } from "./interview/InterviewCard";
import { InterviewBoardHeader } from "./interview/InterviewBoardHeader";
import { InterviewBoardEmptyState } from "./interview/InterviewBoardEmptyState";
import { InterviewBoardSkeleton } from "./interview/InterviewBoardSkeleton";
import type { NewInterview, InterviewWithApplication } from "~/types/interviews";

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

    return (
        <>
            <InterviewBoardHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddClick={handleOpenDialog}
                hasApplications={hasApplications}
            />

            <NewInterviewDialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditingInterview(null);
                }}
                onSubmit={handleSubmit}
                applications={applications}
                initialData={editingInterview}
            />

            {isLoading || isMutating ? (
                <InterviewBoardSkeleton />
            ) : filteredInterviews.length === 0 ? (
                <InterviewBoardEmptyState
                    hasApplications={hasApplications}
                    onAddClick={handleOpenDialog}
                />
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