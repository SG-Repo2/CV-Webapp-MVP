import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from './contexts/SupabaseContext';
import { DemoDataProvider } from './contexts/DemoDataContext';
import { HomeScreen } from './components/demo/HomeScreen';
import { LeaderboardScreen } from './components/demo/LeaderboardScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { Layout } from './components/common/Layout';

export default function App() {
  return (
    <SupabaseProvider>
      <DemoDataProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/leaderboard" element={<LeaderboardScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </DemoDataProvider>
    </SupabaseProvider>
  );
}