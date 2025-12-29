"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { Input } from "./input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"

function formatDate(date: Date | string | undefined) {
    if (!date) {
        return ""
    }

    // Convert string to Date if needed (handles ISO strings from JSON)
    const dateObj = typeof date === 'string' ? new Date(date) : date

    return dateObj.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

interface DatePickerProps {
    value?: Date | string
    onChange?: (date: Date | undefined) => void
    placeholder?: string
}

export function DatePicker({ value, onChange, placeholder = "Select date", id, name, ...props }: DatePickerProps & { id?: string; name?: string } & React.ComponentProps<"div">) {
    // Convert value to Date if it's a string
    const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : undefined

    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(dateValue)
    const [inputValue, setInputValue] = React.useState(formatDate(value))

    React.useEffect(() => {
        setInputValue(formatDate(value))
        if (value) {
            const d = typeof value === 'string' ? new Date(value) : value
            setMonth(d)
        }
    }, [value])

    const handleDateSelect = (newDate: Date | undefined) => {
        onChange?.(newDate)
        setInputValue(formatDate(newDate))
        setOpen(false)
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
        <div className="relative flex gap-2 w-full" {...props}>
            <Input
                id={id}
                name={name}
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
                        id="date-picker"
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2 p-0 hover:bg-transparent"
                    >
                        <CalendarIcon className="size-4 text-muted-foreground" />
                        <span className="sr-only">Select date</span>
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
                </PopoverContent>
            </Popover>
        </div>
    )
}
