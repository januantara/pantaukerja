import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { NewApplication } from "~/types/applications";
import { CalendarIcon, MapPinIcon, Building2Icon, UserIcon, MailIcon, PhoneIcon, GlobeIcon, FileTextIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";

interface ApplicationCardProps {
    application: NewApplication;
    onClick?: () => void;
}

const statusColorMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    applied: "secondary",
    'hr-interview': "default",
    'technical-test': "secondary",
    'user-interview': "secondary",
    offered: "default",
    rejected: "destructive",
};

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

export const ApplicationCard = ({ application, onClick }: ApplicationCardProps) => {
    return (
        <Card className="w-full cursor-pointer hover:border-primary/50 transition-colors" onClick={onClick}>
            <CardHeader>
                <Badge variant="default" className={cn("mb-3", getStatusColor(application.status))}>
                    {application.status.replace('-', ' ').toUpperCase()}
                </Badge>
                <div className="flex justify-between items-baseline">
                    <div>
                        <CardTitle className="text-xl font-bold">{application.position}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                            <Building2Icon size={14} />
                            {application.company}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {application.location && (
                        <div className="flex items-center gap-1">
                            <MapPinIcon size={14} />
                            {application.location}
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <CalendarIcon size={14} />
                        {format(application.appliedDate, "MMM dd, yyyy")}
                    </div>
                </div>

                <div className="flex gap-2">
                    {application.jobUrl && (
                        <Button variant="outline" size="sm" asChild>
                            <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                                <GlobeIcon size={14} className="mr-2" />
                                Job Post
                            </a>
                        </Button>
                    )}
                    {application.jobDescription && (
                        <Button variant="ghost" size="sm">
                            <FileTextIcon size={14} className="mr-2" />
                            Description
                        </Button>
                    )}
                </div>

                {(application.hrName || application.hrEmail || application.hrPhone) && (
                    <div className="bg-muted/50 p-3 rounded-md text-sm">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                            <UserIcon size={14} /> HR Contact
                        </h4>
                        <div className="grid gap-1 pl-6">
                            {application.hrName && <div>{application.hrName}</div>}
                            {application.hrEmail && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MailIcon size={12} /> {application.hrEmail}
                                </div>
                            )}
                            {application.hrPhone && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <PhoneIcon size={12} /> {application.hrPhone}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {application.notes && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-md border border-yellow-200 dark:border-yellow-900/50 text-sm">
                        <h4 className="font-medium mb-1 text-yellow-800 dark:text-yellow-500">Notes</h4>
                        <p className="text-muted-foreground">{application.notes}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
