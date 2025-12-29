
import { CalendarCheck, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

interface InterviewBoardEmptyStateProps {
    hasApplications: boolean;
    onAddClick: () => void;
}

export const InterviewBoardEmptyState = ({ hasApplications, onAddClick }: InterviewBoardEmptyStateProps) => (
    <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center bg-card/50">
        <div className="bg-background p-6 rounded-full flex items-center justify-center border border-border shadow-sm">
            <CalendarCheck className="size-10 text-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mt-6 text-foreground">No interviews scheduled</h2>
        <p className="text-muted-foreground mt-2 text-center max-sm:text-sm">
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
