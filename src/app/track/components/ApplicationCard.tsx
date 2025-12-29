import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Application } from "~/types/applications";
import { CalendarIcon, MapPinIcon, Building2Icon, UserIcon, MailIcon, PhoneIcon, GlobeIcon, FileTextIcon, CreditCard, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";

interface ApplicationCardProps {
    application: Application;
    onClick?: () => void;
    onDelete?: (id: string) => void;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'applied': return ''
        case 'hr-interview': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
        case 'technical-test': return 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
        case 'user-interview': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
        case 'offered': return 'bg-green-500/10 text-green-500 border-green-500/20'
        case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20'
        default: return ''
    }
}

export const ApplicationCard = ({ application, onClick, onDelete }: ApplicationCardProps) => {
    const hasHrContact = application.hrName || application.hrEmail || application.hrPhone;

    return (
        <Card className="w-full h-full cursor-pointer hover:border-primary/50 transition-colors flex flex-col" onClick={onClick}>
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

            <CardContent className="flex-1 flex flex-col gap-4">
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
                        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                            <FileTextIcon size={14} className="mr-2" />
                            Description
                        </Button>
                    )}
                </div>

                {/* Flexible content area */}
                <div className="flex-1 flex flex-col gap-4">
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
                </div>
            </CardContent>
        </Card>
    );
};
