import React, { useState } from 'react';
import Home from './components/Home';
import TypingTest from './components/TypingTest';
import { Layout } from 'antd';
import './App.css';

const { Content } = Layout;

const App = () => {
  const [startTypingTest, setStartTypingTest] = useState(false);

  const handleStartTypingTest = () => {
    setStartTypingTest(true);
  };

  return (
    <Content className='AppBG' style={{ padding: '0px', maxHeight: '100dvh'}}>
      {!startTypingTest ? (
        <Home onStartTypingTest={handleStartTypingTest} />
      ) : (
        <TypingTest />
      )}
    </Content>
  );
};

export default App;
