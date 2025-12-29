'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { DateTimePicker } from "~/components/ui/datetime-picker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { interviewSchema, NewInterview, InterviewWithApplication, interviewType } from "~/types/interviews";
import { Application } from "~/types/applications";

interface NewInterviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: NewInterview) => void;
    applications: Application[];
    initialData?: InterviewWithApplication | null;
}

export const NewInterviewDialog = ({ open, onOpenChange, onSubmit, applications, initialData }: NewInterviewDialogProps) => {
    const newInterviewForm = useForm<NewInterview>({
        resolver: zodResolver(interviewSchema),
        mode: "onSubmit",
        defaultValues: {
            applicationId: "",
            type: "hr-interview",
            datetime: new Date(),
            location: "",
            meetingLink: "",
            notes: "",
        }
    });

    // Reset form when dialog opens or initialData changes
    useEffect(() => {
        if (open) {
            if (initialData) {
                // Convert InterviewWithApplication to NewInterview form data
                newInterviewForm.reset({
                    applicationId: initialData.applicationId,
                    type: initialData.type as interviewType,
                    datetime: typeof initialData.datetime === 'string'
                        ? new Date(initialData.datetime)
                        : initialData.datetime,
                    location: initialData.location,
                    meetingLink: initialData.meetingLink || "",
                    notes: initialData.notes || "",
                });
            } else {
                newInterviewForm.reset({
                    applicationId: "",
                    type: "hr-interview",
                    datetime: new Date(),
                    location: "",
                    meetingLink: "",
                    notes: "",
                });
            }
        }
    }, [open, initialData, newInterviewForm]);

    const handleNewInterview = (data: NewInterview) => {
        onSubmit(data);
        onOpenChange(false);
        newInterviewForm.reset();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="mb-6">
                    <DialogTitle>{initialData ? 'Edit Interview' : 'Schedule New Interview'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update your interview details' : 'Add a new interview schedule'}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[70vh] pr-4">
                    <Form {...newInterviewForm}>
                        <form onSubmit={newInterviewForm.handleSubmit(handleNewInterview)}>
                            <div className="grid gap-6 p-1">
                                <FormField
                                    control={newInterviewForm.control}
                                    name="applicationId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Application *</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select application" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        {applications.length === 0 ? (
                                                            <SelectItem value="no-apps" disabled>
                                                                No applications available
                                                            </SelectItem>
                                                        ) : (
                                                            applications.map((app) => (
                                                                <SelectItem key={app.id} value={app.id}>
                                                                    {app.company} - {app.position}
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={newInterviewForm.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Interview Type *</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="hr-interview">HR Interview</SelectItem>
                                                        <SelectItem value="technical-test">Technical Test</SelectItem>
                                                        <SelectItem value="user-interview">User Interview</SelectItem>
                                                        <SelectItem value="final-interview">Final Interview</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={newInterviewForm.control}
                                    name="datetime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date & Time *</FormLabel>
                                            <FormControl>
                                                <DateTimePicker
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={newInterviewForm.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Online, Office Jakarta, etc." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={newInterviewForm.control}
                                    name="meetingLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meeting Link</FormLabel>
                                            <FormControl>
                                                <Input type="url" placeholder="https://meet.google.com/..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={newInterviewForm.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g. Prepare portfolio, dress code formal" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex mt-6 gap-2 pb-2 justify-end">
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                                <Button type="submit" disabled={applications.length === 0}>
                                    {initialData ? 'Update Interview' : 'Add Interview'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
