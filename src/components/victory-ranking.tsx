import React from 'react';
import { cn } from '@/lib/utils';

interface VictoryRankingProps {
  rank: number;
  name: string;
  score: number;
  avatarUrl?: string;
  className?: string;
}

export const VictoryRanking = ({ rank, name, score, avatarUrl, className }: VictoryRankingProps) => {
  const isFirst = rank === 1;
  const isSecond = rank === 2;
  const isThird = rank === 3;

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-lg transition-all",
      isFirst ? "bg-gradient-to-r from-yellow-50 to-yellow-100 ring-2 ring-[var(--flip7-gold)]" : "bg-white",
      className
    )}>
      <div className="relative">
        <div className={cn(
          "w-12 h-12 rounded-full border-4",
          isFirst && "border-[var(--flip7-gold)]",
          isSecond && "border-slate-300",
          isThird && "border-[var(--flip7-coral)]",
          !isFirst && !isSecond && !isThird && "border-gray-200"
        )}>
          <img src={avatarUrl || '/product-image/nopic.png'} alt={name} className="w-full h-full rounded-full object-cover" />
        </div>
        {isFirst && <span className="absolute -top-2 -right-2 text-2xl">👑</span>}
        {isSecond && <span className="absolute -top-2 -right-2 text-2xl">🥈</span>}
        {isThird && <span className="absolute -top-2 -right-2 text-2xl">🥉</span>}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{name}</span>
          {isFirst && <span className="text-xs font-bold px-2 py-0.5 bg-[var(--flip7-gold)] rounded-full text-black">WINNER</span>}
        </div>
        <div className={cn(
          "text-2xl font-black",
          isFirst && "text-[var(--flip7-gold-dark)]",
          isSecond && "text-slate-500",
          isThird && "text-[var(--flip7-coral-dark)]",
          !isFirst && !isSecond && !isThird && "text-gray-600"
        )}>
          {score} pts
        </div>
      </div>
    </div>
  );
};
