"use client"

import * as React from "react"
import { CalendarIcon, Clock } from "lucide-react"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { Input } from "./input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"

function formatDateTime(date: Date | string | undefined) {
    if (!date) {
        return ""
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date

    return dateObj.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }) + " " + dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

interface DateTimePickerProps {
    value?: Date | string
    onChange?: (date: Date | undefined) => void
    placeholder?: string
}

export function DateTimePicker({ value, onChange, placeholder = "Select date & time" }: DateTimePickerProps) {
    const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : undefined

    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(dateValue)
    const [inputValue, setInputValue] = React.useState(formatDateTime(value))
    const [timeValue, setTimeValue] = React.useState(
        dateValue ? `${String(dateValue.getHours()).padStart(2, '0')}:${String(dateValue.getMinutes()).padStart(2, '0')}` : "09:00"
    )

    React.useEffect(() => {
        setInputValue(formatDateTime(value))
        if (value) {
            const d = typeof value === 'string' ? new Date(value) : value
            setMonth(d)
            setTimeValue(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`)
        }
    }, [value])

    const handleDateSelect = (newDate: Date | undefined) => {
        if (newDate) {
            const [hours, minutes] = timeValue.split(':').map(Number)
            newDate.setHours(hours, minutes)
            onChange?.(newDate)
            setInputValue(formatDateTime(newDate))
        }
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeValue(e.target.value)
        if (dateValue) {
            const [hours, minutes] = e.target.value.split(':').map(Number)
            const newDate = new Date(dateValue)
            newDate.setHours(hours, minutes)
            onChange?.(newDate)
            setInputValue(formatDateTime(newDate))
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        const parsedDate = new Date(e.target.value)
        if (isValidDate(parsedDate)) {
            onChange?.(parsedDate)
            setMonth(parsedDate)
        }
    }

    return (
        <div className="relative flex gap-2 w-full">
            <Input
                id="datetime"
                value={inputValue}
                placeholder={placeholder}
                className="bg-background pr-10"
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setOpen(true)
                    }
                }}
                autoComplete="off"
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="datetime-picker"
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2 p-0 hover:bg-transparent"
                    >
                        <CalendarIcon className="size-4 text-muted-foreground" />
                        <span className="sr-only">Select date and time</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        mode="single"
                        selected={dateValue}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={handleDateSelect}
                    />
                    <div className="border-t p-3 flex items-center gap-2">
                        <Clock className="size-4 text-muted-foreground" />
                        <Input
                            type="time"
                            value={timeValue}
                            onChange={handleTimeChange}
                            className="w-auto"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
