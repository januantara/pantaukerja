'use client';

import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Application } from "~/types/applications";
import { CalendarIcon, MapPinIcon, Building2Icon, UserIcon, MailIcon, PhoneIcon, GlobeIcon, FileTextIcon, CreditCard, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { getStatusColor } from "~/lib/applicationStatus";

interface ApplicationCardProps {
    application: Application;
    onClick?: () => void;
    onDelete?: (id: string) => void;
}

export const ApplicationCard = ({ application, onClick, onDelete }: ApplicationCardProps) => {
    const [showDescriptionDialog, setShowDescriptionDialog] = useState(false);
    const hasHrContact = application.hrName || application.hrEmail || application.hrPhone;

    return (
        <>
            <Card className="w-full cursor-pointer hover:border-primary/50 transition-colors" onClick={onClick}>
                <CardHeader>
                    <div className="flex justify-between items-baseline mb-3">
                        <Badge variant="default" className={cn(getStatusColor(application.status))}>
                            {application.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                                    <MoreVertical size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
                                    <Pencil size={14} className="mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={(e) => { e.stopPropagation(); onDelete?.(application.id); }}
                                >
                                    <Trash2 size={14} className="mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold line-clamp-1">{application.position}</CardTitle>
                        <CardDescription className="gap-2 mt-1">
                            {application.salary && (
                                <div className="flex items-center gap-2">
                                    <CreditCard size={14} className="shrink-0" />
                                    <span className="truncate">{application.salary}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                                <Building2Icon size={14} className="shrink-0" />
                                <span className="truncate">{application.company}</span>
                            </div>
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Location & Date */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {application.location && (
                            <div className="flex items-center gap-1">
                                <MapPinIcon size={14} className="shrink-0" />
                                <span className="truncate">{application.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <CalendarIcon size={14} className="shrink-0" />
                            {format(application.appliedDate, "MMM dd, yyyy")}
                        </div>
                    </div>

                    {/* Action buttons */}
                    {(application.jobUrl || application.jobDescription) && (
                        <div className="flex *:flex-1 gap-2">
                            {application.jobUrl && (
                                <Button variant="default" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                                    <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                                        <GlobeIcon size={14} className="mr-2" />
                                        Job Link
                                    </a>
                                </Button>
                            )}
                            {application.jobDescription && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDescriptionDialog(true);
                                    }}
                                >
                                    <FileTextIcon size={14} className="mr-2" />
                                    Description
                                </Button>
                            )}
                        </div>
                    )}

                    {/* HR Contact */}
                    {hasHrContact && (
                        <div className="bg-muted/50 p-3 rounded-md text-sm">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                                <UserIcon size={14} /> HR Contact
                            </h4>
                            <div className="grid gap-1 pl-6">
                                {application.hrName && <div className="truncate">{application.hrName}</div>}
                                {application.hrEmail && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MailIcon size={12} className="shrink-0" />
                                        <span className="truncate">{application.hrEmail}</span>
                                    </div>
                                )}
                                {application.hrPhone && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <PhoneIcon size={12} className="shrink-0" />
                                        <span className="truncate">{application.hrPhone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    {application.notes && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-md border border-yellow-200 dark:border-yellow-900/50 text-sm">
                            <h4 className="font-medium mb-1 text-yellow-800 dark:text-yellow-500">Notes</h4>
                            <p className="text-muted-foreground line-clamp-3">{application.notes}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Job Description Dialog */}
            <Dialog open={showDescriptionDialog} onOpenChange={setShowDescriptionDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileTextIcon size={20} />
                            Job Description
                        </DialogTitle>
                        <DialogDescription>
                            {application.position} at {application.company}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh]">
                        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {application.jobDescription}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
};
