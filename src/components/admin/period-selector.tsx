"use client";

import type { Period } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const periods: { label: string; value: Period }[] = [
  { label: "7 วัน", value: "7d" },
  { label: "30 วัน", value: "30d" },
  { label: "90 วัน", value: "90d" },
];

type PeriodSelectorProps = {
  value: Period;
  onChange: (period: Period) => void;
};

function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-muted p-1">
      {periods.map((p) => (
        <Button
          key={p.value}
          variant="ghost"
          size="xs"
          onClick={() => onChange(p.value)}
          className={cn(
            "rounded-md px-3",
            value === p.value && "bg-background shadow-sm"
          )}
        >
          {p.label}
        </Button>
      ))}
    </div>
  );
}

export { PeriodSelector };
