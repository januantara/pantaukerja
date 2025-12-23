import { Grid2X2Icon, ListIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

interface JobBoardFiltersProps {
    view: "list" | "grid";
    onViewChange: (view: "list" | "grid") => void;
}

export const JobBoardFilters = ({ view, onViewChange }: JobBoardFiltersProps) => {
    return (
        <div className="flex justify-between items-center mb-6 gap-2">
            <Select>
                <SelectTrigger className="w-[180px] max-sm:w-full">
                    <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="hr-interview">HR Interview</SelectItem>
                    <SelectItem value="technical-test">Technical Test</SelectItem>
                    <SelectItem value="user-interview">User Interview</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>

            <ToggleGroup
                type="single"
                variant="outline"
                defaultValue={view}
                onValueChange={(value) => {
                    if (value) onViewChange(value as "list" | "grid");
                }}
            >
                <ToggleGroupItem value="list"><ListIcon /><span className="max-sm:hidden">List</span></ToggleGroupItem>
                <ToggleGroupItem value="grid"><Grid2X2Icon /><span className="max-sm:hidden">Grid</span></ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
};
