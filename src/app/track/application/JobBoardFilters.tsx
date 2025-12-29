import { Grid2X2Icon, ListIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import type { jobStatus } from "~/types/applications";

import { STATUS_OPTIONS } from "~/lib/applicationStatus";

export type StatusFilter = jobStatus | "all";

interface JobBoardFiltersProps {
    view: "list" | "grid";
    onViewChange: (view: "list" | "grid") => void;
    statusFilter: StatusFilter;
    onStatusFilterChange: (status: StatusFilter) => void;
}

export const JobBoardFilters = ({ view, onViewChange, statusFilter, onStatusFilterChange }: JobBoardFiltersProps) => {
    return (
        <div className="flex justify-between items-center mb-6 gap-2">
            <Select
                value={statusFilter}
                onValueChange={(value) => onStatusFilterChange(value as StatusFilter)}
                name="status"
            >
                <SelectTrigger className="w-[180px] max-sm:w-full">
                    <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="all">All Statuses</SelectItem>
                    {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
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
