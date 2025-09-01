"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import Button from "./Button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {


  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
              className={cn(
          "bg-gradient-to-br from-gray-800/40 to-gray-700/40 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 shadow-xl [&_.rdp-head_cell]:text-white [&_.rdp-head_cell]:!text-white [&_.rdp-head_cell]:[color:#FFFFFF] [&_.rdp-caption]:border-b [&_.rdp-caption]:border-gray-600/30 [&_.rdp-caption]:pb-3 [&_.rdp-caption]:mb-6 [&_.rdp-caption_label]:text-lg [&_.rdp-caption_label]:font-bold [&_.rdp-months]:space-y-6 [&_.rdp-month]:space-y-4 [&_.rdp-table]:space-y-3 [&_.rdp-head_row]:mb-3 [&_.rdp-row]:mt-2 [&_.rdp-nav_button]:h-8 [&_.rdp-nav_button]:w-8 [&_.rdp-nav_button]:bg-gray-700/80 [&_.rdp-nav_button]:hover:bg-blue-600/90 [&_.rdp-nav_button]:shadow-md [&_.rdp-nav_button]:hover:shadow-lg [&_.rdp-nav_button]:border [&_.rdp-nav_button]:border-gray-500/50 [&_.rdp-nav_button]:hover:border-blue-400/70",
          className
        )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("es-ES", { month: "long" }),
        formatWeekdayName: (date) => {
          const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
          return days[date.getDay()];
        },
        ...formatters,
      }}
      classNames={{
        root: "w-full",
        months: "flex flex-col space-y-6",
        month: "space-y-4",
        caption: "flex justify-center pt-3 relative items-center mb-6 pb-3 border-b border-gray-600/30",
        caption_label: "text-lg font-bold text-white tracking-wide",
        nav: "space-x-2 flex items-center",
        nav_button: "h-8 w-8 bg-gray-700/80 hover:bg-blue-600/90 p-0 text-white hover:text-white rounded-lg transition-all duration-300 border border-gray-500/50 hover:border-blue-400/70 shadow-md hover:shadow-lg",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-3",
        head_row: "flex mb-3",
        head_cell: "text-white !text-white rounded w-8 font-medium text-xs py-3 tracking-wide [color:#FFFFFF] [&>*]:text-white [&>*]:!text-white",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_outside: "text-gray-500 opacity-40",
        day_disabled: "text-gray-500 opacity-30 cursor-not-allowed",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4 text-white font-bold", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4 text-white font-bold", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4 text-white font-bold", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const buttonStyles = cn(
    "h-8 w-8 p-0 font-medium aria-selected:opacity-100 text-white rounded-lg transition-all duration-300 text-sm border border-transparent",

    // Prioridad 1: Estilos de seleccionado (incluye rangos)
    modifiers.selected && "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg border-blue-500/50",

    // Prioridad 2: Estilos del día de hoy (solo si NO está seleccionado)
    modifiers.today && !modifiers.selected && "bg-gradient-to-r from-blue-500/40 to-blue-600/40 font-bold border-blue-400/10 shadow-md",

    // Otros modificadores
    modifiers.range_middle && "bg-blue-500/30 text-white",
    modifiers.range_start && "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-blue-500/50",
    modifiers.range_end && "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-blue-500/50",

    modifiers.outside && "text-gray-500 opacity-40",
    modifiers.disabled && !modifiers.selected && "text-gray-500 opacity-30 cursor-not-allowed",

    // Estilos de hover, solo si no está seleccionado
    !modifiers.selected && !modifiers.disabled && "hover:bg-gray-600/70 hover:border-gray-500/50",

    className
  );

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={buttonStyles}
      {...props}
    >
      {day.date.getDate()}
    </Button>
  );
}

export { Calendar, CalendarDayButton }
