
import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {user ? <DashboardPage /> : <LoginPage />}
    </div>
  );
};

export default App;
