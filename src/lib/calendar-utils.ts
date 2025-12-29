export interface CalendarEvent {
    title: string;
    details?: string;
    location?: string;
    start: Date;
    end?: Date;
}

export const getGoogleCalendarUrl = (event: CalendarEvent): string => {
    const { title, details, location, start, end } = event;

    const formatDate = (date: Date): string => {
        return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const startTime = formatDate(start);

    // Default duration to 1 hour if end time is not provided
    const endTime = end
        ? formatDate(end)
        : formatDate(new Date(start.getTime() + 60 * 60 * 1000));

    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.append("action", "TEMPLATE");
    url.searchParams.append("text", title);
    url.searchParams.append("dates", `${startTime}/${endTime}`);

    if (details) {
        url.searchParams.append("details", details);
    }

    if (location) {
        url.searchParams.append("location", location);
    }

    return url.toString();
};
