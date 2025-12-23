import { Plus, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface JobBoardHeaderProps {
    onAddClick: () => void;
}

export const JobBoardHeader = ({ onAddClick }: JobBoardHeaderProps) => {
    return (
        <div className="flex max-sm:flex-col gap-6 md:gap-2 mb-6">
            <div className="search relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input className="pl-10" placeholder="Search by job title or company" />
            </div>

            <Button onClick={onAddClick}>
                <Plus /> Track New Application
            </Button>
        </div>
    );
};
