
import { Plus, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface InterviewBoardHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onAddClick: () => void;
    hasApplications: boolean;
}

export const InterviewBoardHeader = ({ searchQuery, onSearchChange, onAddClick, hasApplications }: InterviewBoardHeaderProps) => (
    <div className="flex max-sm:flex-col gap-2 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
                className="pl-10"
                placeholder="Search by company, position, or type..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
        <Button onClick={onAddClick} disabled={!hasApplications}>
            <Plus /> Add Interview
        </Button>
    </div>
);
