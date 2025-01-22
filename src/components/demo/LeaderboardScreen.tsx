import { useState } from 'react';
import { useDemoData } from '../../contexts/DemoDataContext';
import { ChevronDown, ChevronUp, Heart, Footprints, Ruler, Flame, Crown } from 'lucide-react';

interface MetricData {
  icon: typeof Heart;
  value: number;
  label: string;
  unit: string;
  color: string;
  hasStreak?: boolean;
}

export function LeaderboardScreen() {
  const { leaderboardData } = useDemoData();
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const toggleUserExpansion = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const getEntryStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-[#FFD700] text-white/90';
      case 2:
        return 'bg-[#C0C0C0] text-white/85';
      case 3:
        return 'bg-[#CD7F32] text-white/80';
      default:
        return 'bg-white text-gray-900 hover:bg-gray-50';
    }
  };

  const generateMetrics = (userId: string): MetricData[] => {
    const streakIndex = Math.floor(Math.random() * 4);

    return [
      {
        icon: Heart,
        value: 60 + Math.floor(Math.random() * 20),
        label: 'Heart Rate',
        unit: 'BPM',
        color: 'text-purple',
        hasStreak: streakIndex === 0
      },
      {
        icon: Footprints,
        value: 8000 + Math.floor(Math.random() * 4000),
        label: 'Steps',
        unit: '',
        color: 'text-primary',
        hasStreak: streakIndex === 1
      },
      {
        icon: Ruler,
        value: parseFloat((3 + Math.random() * 2).toFixed(1)),
        label: 'Distance',
        unit: 'mi',
        color: 'text-accent',
        hasStreak: streakIndex === 2
      },
      {
        icon: Flame,
        value: 1800 + Math.floor(Math.random() * 400),
        label: 'Calories',
        unit: '',
        color: 'text-primary',
        hasStreak: streakIndex === 3
      }
    ];
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {leaderboardData.daily.map((entry) => {
            const isExpanded = expandedUserId === entry.userId;
            const metrics = generateMetrics(entry.userId);
            const isRankOne = entry.rank === 1;

            return (
              <div key={entry.userId} className="transition-all duration-200">
                <div
                  onClick={() => toggleUserExpansion(entry.userId)}
                  className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200
                    ${getEntryStyle(entry.rank)} shadow-sm hover:shadow-md
                    ${isRankOne ? 'scale-[1.02]' : ''}`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar with Rank Indicator */}
                    <div className="relative">
                      <img
                        src={`https://i.pravatar.cc/64?u=${entry.userId}`}
                        alt={entry.name}
                        className={`w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm
                          ${isRankOne ? 'ring-4 ring-[#FFD700]/50' : ''}`}
                      />
                      <div className={`absolute -top-1.5 -left-1.5 w-7 h-7 rounded-full flex items-center 
                        justify-center text-sm font-bold border-2 border-white shadow-md
                        ${isRankOne ? 'bg-[#FFD700]' : entry.rank <= 3 ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'}`}>
                        {isRankOne ? (
                          <Crown size={14} className={entry.rank <= 3 ? 'text-white' : 'text-white'} />
                        ) : (
                          entry.rank
                        )}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className={`font-bold ${isRankOne ? 'text-2xl' : 'text-lg'}`}>{entry.name}</h3>
                      <p className={`text-sm ${entry.rank <= 3 ? 'text-white/70' : 'text-gray-500'}`}>
                        Level {Math.floor(entry.score / 100)}
                      </p>
                    </div>

                    {/* Score and Expand Button */}
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className={`font-bold ${isRankOne ? 'text-3xl' : 'text-2xl'}`}>{entry.score}</span>
                        <span className={entry.rank <= 3 ? 'text-white/70' : 'text-gray-500'}> pts</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className={entry.rank <= 3 ? 'text-white/70' : 'text-gray-400'} size={24} />
                      ) : (
                        <ChevronDown className={entry.rank <= 3 ? 'text-white/70' : 'text-gray-400'} size={24} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div
                    className={`overflow-hidden transition-all duration-200
                      ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  >
                    <div className={`p-4 rounded-lg ${entry.rank <= 3 ? 'bg-white/10' : 'bg-gray-50'}`}>
                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {metrics.map((metric, index) => {
                          const Icon = metric.icon;
                          return (
                            <div
                              key={index}
                              className={`relative aspect-square bg-white rounded-lg p-4 flex flex-col 
                                items-center justify-center shadow-sm`}
                            >
                              {metric.hasStreak && (
                                <div className="absolute top-2 right-2">
                                  <span className="text-base">🔥</span>
                                </div>
                              )}
                              <Icon size={28} className={metric.color} />
                              <div className="mt-3 text-center">
                                <span className="block text-2xl font-bold text-gray-900">
                                  {metric.value.toLocaleString()}
                                  {metric.unit && <span className="text-base ml-1">{metric.unit}</span>}
                                </span>
                                <span className="text-sm text-gray-500">{metric.label}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}