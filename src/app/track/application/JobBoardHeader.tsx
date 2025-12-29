import { Plus, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface JobBoardHeaderProps {
    onAddClick: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const JobBoardHeader = ({ onAddClick, searchQuery, onSearchChange }: JobBoardHeaderProps) => {
    return (
        <div className="flex max-sm:flex-col gap-6 md:gap-2 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                    id="job-search"
                    name="search"
                    autoComplete="off"
                    className="pl-10"
                    placeholder="Search by company or position..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <Button onClick={onAddClick}>
                <Plus /> Track New Application
            </Button>
        </div>
    );
};
