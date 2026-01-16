"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface EditableCellProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    value: string | number;
    onSave: (value: string | number) => void;
    type?: "text" | "number" | "date" | "select";
    options?: string[]; // For select type
    className?: string;
    placeholder?: string;
    formatter?: (value: string | number) => string;
}

export function EditableCell({ value: initialValue, onSave, type = "text", options, className, placeholder, formatter, ...props }: EditableCellProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (value !== initialValue) {
            onSave(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current?.blur();
        }
        if (e.key === "Escape") {
            setValue(initialValue);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        if (type === "select" && options) {
            return (
                <select
                    // @ts-ignore
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={cn("w-full bg-background border border-primary rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary/20", className)}
                    {...props}
                >
                    <option value="" disabled>Selecione...</option>
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            )
        }

        return (
            <input
                // @ts-ignore
                ref={inputRef}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={cn("w-full bg-background border border-primary rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary/20", className)}
                placeholder={placeholder}
                {...props}
            />
        );
    }

    const displayValue = formatter ? formatter(value) : value;

    return (
        <div
            onClick={() => setIsEditing(true)}
            className={cn(
                "w-full min-h-[28px] px-2 py-1 cursor-text hover:bg-muted/50 rounded transition-colors text-sm truncate flex items-center",
                !value && "text-muted-foreground italic",
                className
            )}
        >
            {displayValue || placeholder || "—"}
        </div>
    );
}
