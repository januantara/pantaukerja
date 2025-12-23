'use client';

import { useState } from "react";
import { NewApplicationDialog } from "./NewApplicationDialog";
import { JobBoardHeader } from "./components/JobBoardHeader";
import { JobBoardFilters } from "./components/JobBoardFilters";
import { JobBoardEmptyState } from "./components/JobBoardEmptyState";
import { NewApplication } from "~/types/applications";
import { ApplicationCard } from "./components/ApplicationCard";

const JobBoard = () => {
    const [view, setView] = useState<"list" | "grid">("grid");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [applications, setApplications] = useState<NewApplication[]>([]);
    const [editingApplication, setEditingApplication] = useState<NewApplication | null>(null);

    const handleAddOrUpdateApplication = (data: NewApplication) => {
        if (editingApplication) {
            setApplications((prev) => prev.map(app => app === editingApplication ? data : app));
            setEditingApplication(null);
        } else {
            setApplications((prev) => [data, ...prev]);
        }
    };

    const handleEditApplication = (app: NewApplication) => {
        setEditingApplication(app);
        setIsDialogOpen(true);
    };

    const handleOpenNewApplication = () => {
        setEditingApplication(null);
        setIsDialogOpen(true);
    };

    return (
        <>
            <JobBoardHeader onAddClick={handleOpenNewApplication} />

            <NewApplicationDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleAddOrUpdateApplication}
                initialData={editingApplication}
            />

            <JobBoardFilters
                view={view}
                onViewChange={setView}
            />

            {applications.length === 0 ? (
                <JobBoardEmptyState onAddClick={handleOpenNewApplication} />
            ) : (
                <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
                    {applications.map((app, index) => (
                        <ApplicationCard key={index} application={app} onClick={() => handleEditApplication(app)} />
                    ))}
                </div>
            )}
        </>
    )
}

export default JobBoard