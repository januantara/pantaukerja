import { BriefcaseBusiness, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

interface JobBoardEmptyStateProps {
    onAddClick: () => void;
}

export const JobBoardEmptyState = ({ onAddClick }: JobBoardEmptyStateProps) => {
    return (
        <div className="border-2 border-dashed border-border rounded-2xl px-10 py-20 flex flex-col items-center justify-center bg-card/50">
            <div className="bg-background p-6 rounded-full flex items-center justify-center border border-border shadow-sm">
                <BriefcaseBusiness className="size-10 text-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mt-6 text-foreground">The board is clear</h2>
            <p className="text-muted-foreground mt-2">Add your first application to track your application progress</p>
            <Button className="mt-6" onClick={onAddClick}>
                <Plus /> Add New Application
            </Button>
        </div>
    );
};
