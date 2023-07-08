import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './components/Home';
import TypingTest from './components/TypingTest';
import './App.css';

const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Content style={{ padding: '0px', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/typing-test" element={<TypingTest />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
