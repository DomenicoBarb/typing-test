import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import '../App.css';

const { Title, Text } = Typography;

const Home = () => {
    return (
        <div className='Home'>
            <Title className='MainMenuAnimation' style={{ margin: 0, color: 'rgb(255, 255, 255)' }}>Welcome to Nico's Typing Test React App!</Title>
            <Text className='menu-intro1'>A simple and fun way to test your typing skills,</Text>
            <Text className='menu-intro2'>with a word tracking highlighter to show progress!</Text>
            <Link to="/typing-test">
                <Button type="primary" className="main-screen-button" size='large'>Start Typing Test</Button>
            </Link>
        </div>
    );
};

export default Home;
