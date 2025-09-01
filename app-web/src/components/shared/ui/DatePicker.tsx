"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { FiCalendar } from "react-icons/fi"

import Button from "./Button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  minDate?: Date
}

export function DatePicker({ 
  date, 
  onDateChange, 
  placeholder = "Seleccionar fecha",
  disabled = false,
  className = "",
  minDate
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  
  const todayAtMidnight = new Date();
  todayAtMidnight.setHours(0, 0, 0, 0);
  
  if (minDate && minDate.getDate() > todayAtMidnight.getDate()) {
    todayAtMidnight.setDate(todayAtMidnight.getDate() + 1);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          disabled={disabled}
          className={`w-full justify-between font-normal bg-gray-800/50 border border-gray-600/50 hover:border-blue-400/50 hover:bg-gray-700/50 transition-all duration-300 ${className}`}
        >
          <div className="flex items-center space-x-2">
            <FiCalendar className="w-4 h-4 text-gray-400" />
            <span className={date ? "text-white font-medium" : "text-gray-400"}>
              {date ? date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : placeholder}
            </span>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border border-gray-600/50 bg-gray-800/90 backdrop-blur-sm shadow-2xl" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            onDateChange?.(selectedDate)
            setOpen(false)
          }}
          disabled={(date) => date < todayAtMidnight}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
} 