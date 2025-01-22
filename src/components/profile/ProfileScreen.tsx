import { useState } from 'react';
import { Camera, Edit2 } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  icon: string;
  locked: boolean;
}

export function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    username: '@alexj',
    email: 'alex@example.com',
    bio: 'Fitness enthusiast | Marathon runner | Always striving to be better',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150'
  });

  const achievements: Achievement[] = [
    { id: '1', name: 'Early Bird', icon: '🌅', locked: false },
    { id: '2', name: 'Step Master', icon: '👣', locked: false },
    { id: '3', name: 'Heart Hero', icon: '❤️', locked: true },
    { id: '4', name: 'Sleep Pro', icon: '😴', locked: false },
    { id: '5', name: 'Hydration King', icon: '💧', locked: true },
    { id: '6', name: 'Streak Keeper', icon: '🔥', locked: false },
    { id: '7', name: 'Social Star', icon: '⭐', locked: true },
    { id: '8', name: 'Goal Crusher', icon: '🎯', locked: true },
    { id: '9', name: 'Elite Athlete', icon: '🏆', locked: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-sea-green text-white p-1.5 rounded-full shadow-lg">
                <Camera size={16} />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit2 size={18} />
                </button>
              </div>
              <p className="text-gray-500">{profileData.username}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <p className="text-gray-600">{profileData.bio}</p>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`aspect-square bg-white rounded-lg flex flex-col items-center justify-center 
                          relative overflow-hidden group ${achievement.locked ? 'opacity-50' : ''}`}
              >
                <span className="text-2xl mb-2">{achievement.icon}</span>
                <span className="text-xs text-gray-600 font-medium">{achievement.name}</span>
                {achievement.locked && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center opacity-0 
                                group-hover:opacity-100 transition-opacity">
                    <span className="text-sm text-gray-600 font-medium">Coming Soon</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}