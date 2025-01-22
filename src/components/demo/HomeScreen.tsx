import { useDemoData } from '../../contexts/DemoDataContext';
import { Activity, Flame, Heart, PersonStanding, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';
import { MetricModal } from './MetricModal';
import { LineChart } from './LineChart';

type MetricType = 'steps' | 'distance' | 'heart' | 'calories';

export function HomeScreen() {
  const { metrics } = useDemoData();
  const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const calculatePoints = (metric: string, value: number): number => {
    switch (metric) {
      case 'steps':
        return Math.min(250, (value / 10000) * 250);
      case 'distance':
        return Math.min(250, (value / 5) * 250);
      case 'heart':
        const inRange = value >= 60 && value <= 80;
        return inRange ? 250 : Math.max(0, 250 - Math.abs(value - 70) * 10);
      case 'calories':
        return Math.min(250, (value / 600) * 250);
      default:
        return 0;
    }
  };

  const totalPoints = [
    calculatePoints('steps', metrics.steps),
    calculatePoints('distance', 3.2),
    calculatePoints('heart', metrics.heartRate || 70),
    calculatePoints('calories', 450),
  ].reduce((a, b) => a + b, 0);

  const pointsProgress = (totalPoints / 1000) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-5">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col space-y-4">
            <div>
              <p className="text-gray-600">{greeting}, Alex</p>
              <h1 className="text-xl font-bold text-gray-900">Your Dashboard</h1>
            </div>
            <div className="bg-background p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Points</span>
                <div className="flex items-center space-x-2">
                  <Activity className="text-primary" size={20} />
                  <span className="text-xl font-bold text-gray-900">{Math.round(totalPoints)}</span>
                  <span className="text-sm text-gray-500">/ 1000</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${pointsProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Steps */}
        <MetricCard
          title="Steps"
          value={metrics.steps}
          unit="steps"
          icon={<PersonStanding size={20} />}
          color="bg-primary"
          goal={10000}
          onClick={() => setSelectedMetric('steps')}
          points={calculatePoints('steps', metrics.steps)}
          variant="rectangular"
        />

        {/* Heart Rate & Calories */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Heart Rate"
            value={metrics.heartRate || 70}
            unit="BPM"
            icon={<Heart size={20} />}
            color="bg-accent"
            goal={80}
            onClick={() => setSelectedMetric('heart')}
            points={calculatePoints('heart', metrics.heartRate || 70)}
            alert={metrics.heartRate && (metrics.heartRate < 60 || metrics.heartRate > 100)}
            variant="square"
          />
          
          <MetricCard
            title="Calories"
            value={450}
            unit="cal"
            icon={<Flame size={20} />}
            color="bg-secondary"
            goal={600}
            onClick={() => setSelectedMetric('calories')}
            points={calculatePoints('calories', 450)}
            variant="square"
          />
        </div>

        {/* Distance */}
        <MetricCard
          title="Distance"
          value={3.2}
          unit="km"
          icon={<TrendingUp size={20} />}
          color="bg-light-blue"
          goal={5}
          onClick={() => setSelectedMetric('distance')}
          points={calculatePoints('distance', 3.2)}
          variant="rectangular"
        />
      </div>

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <MetricModal
          title={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
          isOpen={true}
          onClose={() => setSelectedMetric(null)}
          color={`bg-${
            selectedMetric === 'steps' ? 'primary' :
            selectedMetric === 'distance' ? 'light-blue' :
            selectedMetric === 'heart' ? 'accent' : 'secondary'
          }`}
          textColor={selectedMetric === 'distance' ? 'text-white' : 'text-white'}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Weekly Progress</h4>
                <p className="text-sm text-gray-500">Last 7 days</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {selectedMetric === 'steps' ? metrics.steps.toLocaleString() :
                   selectedMetric === 'distance' ? '3.2 km' :
                   selectedMetric === 'heart' ? `${metrics.heartRate || 70} BPM` :
                   '450 cal'}
                </p>
                <p className="text-sm text-gray-500">Current Value</p>
              </div>
            </div>
            <LineChart metricType={selectedMetric} />
          </div>
        </MetricModal>
      )}
    </div>
  );
}