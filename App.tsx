import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Sites } from './pages/Sites';
import { Maintenance } from './pages/Maintenance';
import { Inventory } from './pages/Inventory';
import { Personnel } from './pages/Personnel';
import { Finance } from './pages/Finance';
import { Safety } from './pages/Safety';
import { About } from './pages/About';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
