import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen">
      <nav className="glass-card m-6 p-4 flex justify-between items-center">
        <div className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          BHERA FOOD ECO
        </div>
        <div className="flex space-x-6 items-center">
          <a href="#" className="nav-link font-medium">Dashboard</a>
          <a href="#" className="nav-link font-medium">Restaurants</a>
          <a href="#" className="nav-link font-medium">Riders</a>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
            <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
