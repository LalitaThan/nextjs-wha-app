import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  emoji: string;
  className?: string;
}

export const SectionTitle = ({ title, emoji, className }: SectionTitleProps) => {
  return (
    <div className={cn("flex items-center gap-3 mb-6", className)}>
      <div className="flex items-center justify-center w-8 h-8 bg-[var(--flip7-teal-bg)] rounded-lg text-xl shadow-sm">
        {emoji}
      </div>
      <h3 className="text-xl font-bold text-[var(--flip7-teal-dark)] uppercase tracking-wide">
        {title}
      </h3>
      <div className="flex-1 h-px border-b-2 border-dashed border-[var(--flip7-teal-light)] ml-4" />
    </div>
  );
};
