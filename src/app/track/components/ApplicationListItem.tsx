import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Application } from "~/types/applications";
import { Building2Icon, GlobeIcon, CreditCard, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "~/lib/utils";

interface ApplicationListItemProps {
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

export const ApplicationListItem = ({ application, onClick, onDelete }: ApplicationListItemProps) => {
    return (
        <Card className="w-full cursor-pointer hover:border-primary/50 transition-colors" onClick={onClick}>
            <CardContent className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-start gap-2 w-full">
                        <Badge variant="default" className={cn(getStatusColor(application.status), 'text-xs max-sm:self-end')}>
                            {application.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <h3 className="font-semibold truncate">{application.position}</h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Building2Icon size={14} />
                                {application.company}
                            </span>
                            {application.salary && (
                                <span className="flex items-center gap-1">
                                    <CreditCard size={14} />
                                    {application.salary}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 max-sm:mt-4 max-sm:*:flex-1">
                    {application.jobUrl && (
                        <Button variant="default" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                            <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                                <GlobeIcon size={14} className="mr-2" />
                                Job Link
                            </a>
                        </Button>
                    )}
                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={(e) => { e.stopPropagation(); onDelete?.(application.id); }}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
