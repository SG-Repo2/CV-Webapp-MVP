import { useEffect, useState } from 'react';

interface LineChartProps {
  metricType: 'steps' | 'distance' | 'heart' | 'calories';
}

export function LineChart({ metricType }: LineChartProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ date: string; value: number }[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const generateMockData = () => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const baseValue = metricType === 'steps' ? 8000 :
                       metricType === 'distance' ? 3 :
                       metricType === 'heart' ? 70 :
                       400;
      const variance = metricType === 'steps' ? 2000 :
                      metricType === 'distance' ? 1 :
                      metricType === 'heart' ? 10 :
                      100;

      return days.map(day => ({
        date: day,
        value: baseValue + Math.random() * variance
      }));
    };

    const timer = setTimeout(() => {
      try {
        const mockData = generateMockData();
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load chart data');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [metricType]);

  if (loading) {
    return (
      <div className="h-64 bg-background rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-400">Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 bg-red-50 rounded-lg flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const padding = (maxValue - minValue) * 0.1;
  const yMax = maxValue + padding;
  const yMin = Math.max(0, minValue - padding);

  const getBarColor = () => {
    switch (metricType) {
      case 'steps': return '#20B2AA';
      case 'heart': return '#FF6B6B';
      case 'calories': return '#9B59B6';
      case 'distance': return '#9B59B6';
      default: return '#20B2AA';
    }
  };

  return (
    <div className="h-64 relative">
      {/* Y-axis */}
      <div className="absolute left-0 top-0 bottom-6 w-12 flex flex-col justify-between text-xs text-gray-500">
        <span>{Math.ceil(yMax)}</span>
        <span>{Math.floor(yMin)}</span>
      </div>

      {/* Chart area */}
      <div className="absolute left-12 right-0 top-0 bottom-0">
        <svg className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={`${percent}%`}
              x2="100%"
              y2={`${percent}%`}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}

          {/* Bars */}
          {data.map((d, i) => {
            const x = (i * 100) / (data.length - 1);
            const y = 100 - ((d.value - yMin) / (yMax - yMin)) * 100;
            const barWidth = 80 / data.length;
            
            return (
              <g key={i} className="group">
                {/* Bar */}
                <rect
                  x={`${x - barWidth/2}%`}
                  y={`${y}%`}
                  width={`${barWidth}%`}
                  height={`${100 - y}%`}
                  fill={getBarColor()}
                  opacity="0.9"
                  rx="2"
                />

                {/* Tooltip */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <rect
                    x={`${x}%`}
                    y={`${y}%`}
                    width="60"
                    height="24"
                    rx="4"
                    transform="translate(-30, -36)"
                    fill="#1a1a1a"
                  />
                  <text
                    x={`${x}%`}
                    y={`${y}%`}
                    textAnchor="middle"
                    transform="translate(0, -20)"
                    className="fill-white text-xs"
                  >
                    {Math.round(d.value)}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
          {data.map((d) => (
            <span key={d.date}>{d.date}</span>
          ))}
        </div>
      </div>
    </div>
  );
}