import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SchedulePage from './pages/SchedulePage';
import RegistrationPage from './pages/RegistrationPage';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="min-h-screen flex flex-col font-oswald">
        <Header className="bg-blue-800 text-white">
          <NavBar />
        </Header>
        <Content className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </Content>
        <Footer className="text-center py-8 bg-gray-800 text-white text-lg">
          ©2025 GWECCC Event - Water, Energy, and Climate Security & Sustainability
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
