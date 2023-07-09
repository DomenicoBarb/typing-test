import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Row, Col } from 'antd';
import '../App.css';

const { Title, Text } = Typography;

const TypingTest = () => {
    const [text, setText] = useState('');
    const [input, setInput] = useState('');
    //eslint-disable-next-line
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(60000);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showMetrics, setShowMetrics] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [typedWords, setTypedWords] = useState(0);

    const getRandomWord = useCallback(() => {
        const wordList = [
            'apple',
            'banana',
            'cherry',
            'orange',
            'strawberry',
            'grapefruit',
            'watermelon',
            'pineapple',
            'kiwi',
            'mango',
            'apricot',
            'avocado',
            'blackberry',
            'blueberry',
            'coconut',
            'cranberry',
            'fig',
            'grape',
            'guava',
            'lemon',
            'lime',
            'lychee',
            'melon',
            'papaya',
            'peach',
            'pear',
            'plum',
            'raspberry',
            'starfruit',
            'tomato',
            'watermelon',
            'almond',
            'cashew',
            'chestnut',
            'hazelnut',
            'macadamia',
            'pecan',
            'peanut',
            'pistachio',
            // Add more words to the list
        ];

        const randomIndex = Math.floor(Math.random() * wordList.length);
        return wordList[randomIndex];
    }, []);

    const fetchText = useCallback(() => {
        let randomText = '';
        for (let i = 0; i < 160; i++) {
            randomText += getRandomWord() + ' ';
        }
        setText(randomText.trim());
    }, [getRandomWord]);

    useEffect(() => {
        fetchText();
    }, [fetchText]);

    useEffect(() => {
        if (isTimerRunning && elapsedTime > 0) {
            const timer = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime - 1000);
            }, 1000);

            return () => clearInterval(timer);
        }

        if (elapsedTime === 0) {
            setIsTimerRunning(false);
            setShowMetrics(true);
        }
    }, [isTimerRunning, elapsedTime]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);

        if (!isTimerRunning) {
            setStartTime(Date.now());
            setIsTimerRunning(true);
        }

        const completed = text.slice(0, currentIndex + inputValue.length);
        if (completed === text) {
            setIsTimerRunning(false);
            setShowMetrics(true);
        }

        const words = text.trim().split(/\s+/);
        const currentWord = words[currentWordIndex];
        if (inputValue.endsWith(' ') && inputValue.trim() === currentWord) {
            setCurrentIndex((prevIndex) => prevIndex + currentWord.length + 1); // Move currentIndex to the end of the currentWord
            setCurrentWordIndex((prevIndex) => prevIndex + 1); // Move to the next word
            setInput(''); // Clear the input
        }

        const wordCount = calculateWordCount();
        setWordCount(wordCount);

        const accuracy = calculateAccuracy();
        setAccuracy(accuracy);

        if (isTimerRunning && elapsedTime > 0) {
            const elapsedMinutes = (60000 - elapsedTime) / 60000;
            const wordsPerMinute = typedWords / elapsedMinutes;
            setWpm(wordsPerMinute);
        }
    };

    const handleRestart = () => {
        setText('');
        setInput('');
        setStartTime(null);
        setElapsedTime(60000);
        setIsTimerRunning(false);
        setWordCount(0);
        setAccuracy(100);
        setCurrentIndex(0);
        setCurrentWordIndex(0);
        setShowMetrics(false);
        setWpm(0);
        setTypedWords(0);
        fetchText();
    };

    const calculateWordCount = useCallback(() => {
        const words = text.trim().split(/\s+/);
        const typedWordsCount = words.reduce((count, word, index) => {
            if (index < currentWordIndex) {
                return count + 1;
            }
            return count;
        }, 0);
        setTypedWords(typedWordsCount);
        return words.filter((word) => word !== '').length;
    }, [text, currentWordIndex]);

    const calculateAccuracy = useCallback(() => {
        const completed = text.slice(0, currentIndex + input.length);
        const numMistakes = Array.from(input).filter(
            (char, index) => char !== completed.charAt(index)
        ).length;
        const totalChars = Math.max(completed.length, 1);
        return ((totalChars - numMistakes) / totalChars) * 100;
    }, [text, input, currentIndex]);


    const handleButtonClick = () => {
        window.location.href = '/';
    };

    return (
        <div className="Typing">
            <div className="TypingTest">
                <Title level={2} className='titleanimation' style={{ color: 'white' }}>Typing Test</Title>
                {showMetrics ? (
                    <Row gutter={16} justify="center">
                        <Col span={24} className='endscreen' style={{ marginBottom: 16, color: 'white' }}>
                            <Text strong className='endscreen' style={{ color: 'white' }}>Word Count:</Text> {wordCount}
                        </Col>
                        <Col span={24} className='endscreen' style={{ marginBottom: 16, color: 'white' }}>
                            <Text strong className='endscreen' style={{ color: 'white' }}>Accuracy:</Text> {accuracy.toFixed(2)}%
                        </Col>
                        <Col span={24} className='endscreen' style={{ marginBottom: 16, color: 'white' }}>
                            <Text strong className='endscreen' style={{ color: 'white' }}>Words Per Minute (WPM):</Text>{' '}
                            {isFinite(wpm) ? wpm.toFixed(2) : '0'}
                        </Col>
                        <Col span={24} className='endscreen' style={{ marginBottom: 16, color: 'white' }}>
                            <Text strong className='endscreen' style={{ color: 'white' }}>Successfully Typed Words:</Text> {typedWords}
                        </Col>
                        <Col span={24}>
                            <Button type="primary" className="custom-button" size='large' onClick={handleRestart}>
                                Restart
                            </Button>
                        </Col>
                        <Button type="primary" className="custom-button" size='large' onClick={handleButtonClick}>
                            Go Home
                        </Button>
                    </Row>
                ) : (
                    <div>
                        <div className='wordwall'>
                            {text.split(/\s+/).map((word, index, array) => (
                                <React.Fragment key={index}>
                                    <span className={index === currentWordIndex ? 'CurrentWord' : ''}>
                                        {word}
                                    </span>
                                    {index !== array.length - 1 && ' '}
                                </React.Fragment>
                            ))}
                        </div>
                        <textarea
                            className="InputArea"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Start typing..."
                            disabled={false}
                            style={{ marginTop: 32, resize: "none" }}
                        />
                        <Text strong className="timertext">
                            Time:{" "}
                            <span className={`timervalue ${elapsedTime < 30000 ? "hurry" : ""}`}>
                                {Math.floor(elapsedTime / 1000)}s
                            </span>
                        </Text>
                        <Col span={24}>
                            <Button type="primary" className="refresh-button" size='large' onClick={handleRestart}>
                                New Words Please!
                            </Button>
                        </Col>
                        <Button type="button" className="custom-button" size='large' onClick={handleButtonClick}>
                            Go Home
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TypingTest;
