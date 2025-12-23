'use client';

import { BriefcaseBusiness, Grid2X2Icon, ListIcon, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, NewApplication } from "~/types/applications";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { DatePicker } from "~/components/ui/date-picker";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";

const JobBoard = () => {
    const [view, setView] = useState<"list" | "grid">("grid");

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const newApplicationForm = useForm<NewApplication>({
        resolver: zodResolver(applicationSchema),
        mode: "onSubmit",
        defaultValues: {
            company: "",
            position: "",
            location: "",
            status: "applied",
            appliedDate: new Date(),
            jobUrl: "",
            jobDescription: "",
            hrName: "",
            hrEmail: "",
            hrPhone: "",
            notes: "",
        }
    })

    const handleNewApplication = (data: NewApplication) => {
        console.log('data', data)
        setIsDialogOpen(false)
        newApplicationForm.reset()
    }

    return (
        <>
            <div className="flex max-sm:flex-col gap-6 md:gap-2 mb-6">
                <div className="search relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input className="pl-10" placeholder="Search by job title or company" />
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus /> Track New Application</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className="mb-6">
                            <DialogTitle>Track New Application</DialogTitle>
                            <DialogDescription>
                                Add a new application to track your job
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[70vh] pr-4">
                            <Form {...newApplicationForm}>
                                <form onSubmit={newApplicationForm.handleSubmit(handleNewApplication)}>
                                    <div className="grid gap-6 p-1">
                                        <div className="grid grid-cols-2 gap-3 items-start">
                                            <FormField
                                                control={newApplicationForm.control}
                                                name="company"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Company *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Company name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={newApplicationForm.control}
                                                name="position"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Position *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g. Software Engineer" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={newApplicationForm.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Jakarta, Remote, Hybrid" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-3 items-start">
                                            <FormField
                                                control={newApplicationForm.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Status *</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="applied">Applied</SelectItem>
                                                                    <SelectItem value="hr-interview">HR Interview</SelectItem>
                                                                    <SelectItem value="technical-test">Technical Test</SelectItem>
                                                                    <SelectItem value="user-interview">User Interview</SelectItem>
                                                                    <SelectItem value="offered">Offered</SelectItem>
                                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={newApplicationForm.control}
                                                name="appliedDate"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Applied Date *</FormLabel>
                                                        <FormControl>
                                                            <DatePicker
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                placeholder="Select date"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={newApplicationForm.control}
                                            name="jobUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job URL *</FormLabel>
                                                    <FormControl>
                                                        <Input type="url" placeholder="https://..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={newApplicationForm.control}
                                            name="jobDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Paste the job description here" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <h4 className="text-sm border-y py-2 text-center mt-2 text-muted-foreground">HR CONTACT</h4>

                                        <div className="grid grid-cols-3 gap-3 mb-3 ">
                                            <FormField
                                                control={newApplicationForm.control}
                                                name="hrName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={newApplicationForm.control}
                                                name="hrEmail"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Email" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={newApplicationForm.control}
                                                name="hrPhone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Phone" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={newApplicationForm.control}
                                            name="notes"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Notes</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="e.g. Very fast response, seems like a good fit" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex mt-6 gap-2 pb-2 justify-end">
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                        <Button type="submit">Add Application</Button>
                                    </div>
                                </form>
                            </Form>
                        </ScrollArea>

                    </DialogContent>
                </Dialog>
            </div>

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

                <ToggleGroup type="single" variant="outline" defaultValue={view} onValueChange={(value) => setView(value as "list" | "grid")}>
                    <ToggleGroupItem value="list"><ListIcon /><span className="max-sm:hidden">List</span></ToggleGroupItem>
                    <ToggleGroupItem value="grid"><Grid2X2Icon /><span className="max-sm:hidden">Grid</span></ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center bg-card/50">
                <div className="bg-background p-6 rounded-full flex items-center justify-center border border-border shadow-sm">
                    <BriefcaseBusiness className="size-10 text-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mt-6 text-foreground">The board is clear</h2>
                <p className="text-muted-foreground mt-2">Add your first job to track your job</p>
                <Button className="mt-6"><Plus /> Add New Application</Button>
            </div>
        </>
    )
}

export default JobBoard