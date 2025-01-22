import { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: ReactNode;
  color: string;
  textColor?: string;
  goal: number;
  points: number;
  onClick?: () => void;
  alert?: boolean;
  variant: 'square' | 'rectangular';
}

export function MetricCard({
  title,
  value,
  unit,
  icon,
  color,
  textColor = 'text-white',
  goal,
  points,
  onClick,
  alert,
  variant
}: MetricCardProps) {
  const progress = Math.min((value / goal) * 100, 100);
  const isGoalMet = progress >= 100;

  const heightClass = variant === 'rectangular' ? 'h-36' : 'h-40';

  return (
    <div
      onClick={onClick}
      className={`${color} rounded-xl p-4 sm:p-5 ${textColor} relative overflow-hidden cursor-pointer
                 transition-transform active:scale-95 ${heightClass}`}
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="space-y-0.5 sm:space-y-1">
          <h3 className="text-sm sm:text-base font-medium leading-tight">{title}</h3>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-[10px] sm:text-xs opacity-90">{Math.round(points)} pts</span>
            {alert && (
              <div className={`${textColor === 'text-white' ? 'bg-white/20' : 'bg-gray-900/10'} 
                              p-0.5 rounded-full flex items-center justify-center`}>
                <AlertTriangle size={12} className="sm:hidden" />
                <AlertTriangle size={14} className="hidden sm:block" />
              </div>
            )}
          </div>
        </div>
        <div className={`${textColor === 'text-white' ? 'bg-white/20' : 'bg-gray-900/10'} 
                        p-1.5 sm:p-2 rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-baseline space-x-1">
          <span className="text-xl sm:text-2xl font-bold leading-none">
            {value.toLocaleString()}
          </span>
          <span className="text-sm sm:text-base font-normal leading-none">
            {unit}
          </span>
        </div>
        
        <div className={`w-full ${textColor === 'text-white' ? 'bg-black/20' : 'bg-gray-900/10'} 
                        rounded-full h-2 sm:h-2.5 mb-2 sm:mb-4`}>
          <div
            className={`h-full ${textColor === 'text-white' ? 'bg-white' : 'bg-gray-900'} 
                       rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[10px] sm:text-xs opacity-90 leading-none">
            {progress.toFixed(0)}% of goal
          </span>
          {isGoalMet && (
            <span className={`${textColor === 'text-white' ? 'bg-white/20' : 'bg-gray-900/10'} 
                            px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs leading-none`}>
              Goal Met! 🎯
            </span>
          )}
        </div>
      </div>

      <div className={`absolute inset-0 ${textColor === 'text-white' ? 
                     'bg-black/0 active:bg-black/10' : 
                     'bg-gray-900/0 active:bg-gray-900/5'} transition-colors`} />
    </div>
  );
}