import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { DatePicker } from "~/components/ui/date-picker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { applicationSchema, NewApplication } from "~/types/applications";

interface NewApplicationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: NewApplication) => void;
    initialData?: NewApplication | null;
}

export const NewApplicationDialog = ({ open, onOpenChange, onSubmit, initialData }: NewApplicationDialogProps) => {
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

    // Reset form when dialog opens or initialData changes
    useEffect(() => {
        if (open) {
            if (initialData) {
                newApplicationForm.reset(initialData);
            } else {
                newApplicationForm.reset({
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
                });
            }
        }
    }, [open, initialData, newApplicationForm]);

    const handleNewApplication = (data: NewApplication) => {
        onSubmit(data);
        onOpenChange(false)
        newApplicationForm.reset()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                                                        <SelectContent position="popper">
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
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                                <Button type="submit">Add Application</Button>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>

            </DialogContent>
        </Dialog>
    )
}
