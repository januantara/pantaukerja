import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { InterviewWithApplication } from "~/types/interviews";
import { Building2Icon, Calendar, Clock, MapPin, Video, Trash2, CalendarPlus } from "lucide-react";
import { cn } from "~/lib/utils";
import { getGoogleCalendarUrl } from "~/lib/calendar-utils";
import { MouseEvent } from "react";

interface InterviewCardProps {
    interview: InterviewWithApplication;
    onClick?: () => void;
    onDelete?: (id: string) => void;
}

// Type styling maps
const TYPE_STYLES: Record<string, string> = {
    'hr-interview': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'technical-test': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    'user-interview': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'final-interview': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

const TYPE_LABELS: Record<string, string> = {
    'hr-interview': 'HR Interview',
    'technical-test': 'Technical Test',
    'user-interview': 'User Interview',
    'final-interview': 'Final Interview',
};

// Date helpers
const toDate = (date: Date | string) => typeof date === 'string' ? new Date(date) : date;

const formatDate = (date: Date | string) => toDate(date).toLocaleDateString("en-US", {
    weekday: 'short',
    day: "2-digit",
    month: "short",
    year: "numeric",
});

const formatTime = (date: Date | string) => toDate(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
});

const isUpcoming = (date: Date | string) => toDate(date) > new Date();
const isToday = (date: Date | string) => toDate(date).toDateString() === new Date().toDateString();

export const InterviewCard = ({ interview, onClick, onDelete }: InterviewCardProps) => {
    const upcoming = isUpcoming(interview.datetime);
    const today = isToday(interview.datetime);

    const cardStyles = cn(
        "w-full h-full cursor-pointer transition-all hover:shadow-md flex flex-col gap-5",
        !today && upcoming && "border-primary/10 hover:border-primary",
        !today && !upcoming && "opacity-60",
        today && "ring-1 ring-green-400/50 border-green-400/50"
    );

    const handleAddToCalendar = (e: MouseEvent) => {
        e.stopPropagation();
        const url = getGoogleCalendarUrl({
            title: `Interview: ${interview.application.position} at ${interview.application.company}`,
            details: `Type: ${TYPE_LABELS[interview.type] || interview.type}\nNotes: ${interview.notes || ''}\nMeeting Link: ${interview.meetingLink || ''}`,
            location: interview.location,
            start: toDate(interview.datetime),
        });
        window.open(url, '_blank');
    };

    const handleJoinMeetingClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    const handleDeleteClick = (e: MouseEvent) => {
        e.stopPropagation();
        onDelete?.(interview.id);
    };

    return (
        <Card className={cardStyles} onClick={onClick}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className={cn(TYPE_STYLES[interview.type] || '', 'text-xs')}>
                        {TYPE_LABELS[interview.type] || interview.type}
                    </Badge>
                    {today && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30 text-xs">
                            Today
                        </Badge>
                    )}
                    {!upcoming && !today && (
                        <Badge variant="secondary" className="text-xs">Passed</Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
                {/* Main content - grows to fill space */}
                <div className="flex-1 space-y-3">
                    {/* Job info */}
                    <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{interview.application.position}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Building2Icon size={14} className="shrink-0" />
                            <span className="truncate">{interview.application.company}</span>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar size={14} className="shrink-0" />
                            {formatDate(interview.datetime)}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock size={14} className="shrink-0" />
                            {formatTime(interview.datetime)}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate">{interview.location}</span>
                    </div>

                    {/* Notes - fixed height area */}
                    <div className="min-h-[3.5rem]">
                        {interview.notes ? (
                            <div className="bg-muted/50 border-l-2 border-muted-foreground/30 pl-3 py-2 rounded-r-md">
                                <p className="text-sm text-muted-foreground italic line-clamp-2">
                                    {interview.notes}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Actions - always at bottom */}
                <div className="flex items-center gap-2 pt-4 mt-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none text-xs h-8"
                        onClick={handleAddToCalendar}
                    >
                        <CalendarPlus size={14} className="mr-1.5" />
                        <span className="truncate">Calendar</span>
                    </Button>

                    {interview.meetingLink && (
                        <Button
                            variant="default"
                            size="sm"
                            className="flex-1 sm:flex-none text-xs h-8"
                            asChild
                            onClick={handleJoinMeetingClick}
                        >
                            <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                                <Video size={14} className="mr-1.5" />
                                Join
                            </a>
                        </Button>
                    )}

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleDeleteClick}
                        className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive ml-auto"
                    >
                        <Trash2 size={15} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
