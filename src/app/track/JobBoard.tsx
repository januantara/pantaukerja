'use client';

import { BriefcaseBusiness, Grid2X2Icon, ListIcon, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

const JobBoard = () => {
    const [view, setView] = useState<"list" | "grid">("list");

    return (
        <>
            <div className="flex max-sm:flex-col gap-2 mb-6">
                <div className="search relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input className="pl-10" placeholder="Search by job title or company" />
                </div>

                <Button><Plus /> Track New Job</Button>
            </div>

            <div className="flex justify-between items-center mb-6">
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

                <ToggleGroup type="single" variant="outline" defaultValue="list" onValueChange={(value) => setView(value as "list" | "grid")}>
                    <ToggleGroupItem value="list"><ListIcon />List</ToggleGroupItem>
                    <ToggleGroupItem value="grid"><Grid2X2Icon />Grid</ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center bg-card/50">
                <div className="bg-background p-6 rounded-full flex items-center justify-center border border-border shadow-sm">
                    <BriefcaseBusiness className="size-10 text-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mt-6 text-foreground">The board is clear</h2>
                <p className="text-muted-foreground mt-2">Add your first job to track your job</p>
                <Button className="mt-6"><Plus /> Add Job</Button>
            </div>
        </>
    )
}

export default JobBoard