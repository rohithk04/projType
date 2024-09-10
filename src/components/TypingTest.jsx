import React, { useEffect, useState, useRef} from "react";
import './style.css';

const paragraph = 'A plant is one of the most important living things that develop on the earth and is made up of stems, leaves, roots, and so on.';

const TypingTest = () => {
    const maxTime = 60;
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [mistakes, setMistakes] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [istyping, setTyping] = useState(false);
    const [WPM, setWPM] = useState(0);
    const [CPM, setCPM] = useState(0);
    const inputRef = useRef(null);
    const charRefs = useRef([]);
    const[correctWrong, setcorrectWrong]=getState([]);

    useEffect(() => {
        inputRef.current.focus();
        setCorrectWrong(Array(charRefs.current.length).fill(``))
    }, []);

    useEffect(() => {
        let interval;
        if(isTyping && timeLeft > 0 ){

        }
    } ,[istyping, timeLeft])

    useEffect(() => {
        if (istyping && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setTyping(false);
        }
    }, [istyping, timeLeft]);

    const resetGame = () => {
        setIsTyping(false);
        setTimeLeft(maxTime);
        setCharIndex(0);
        setMistakes(0);
        setCPM(0);
        setWPM(0);
        setCorrectWrong(Array(charRefs.current.length).fill(''))
        inputRef.current.focus();
    }

    const handleChange = (e) => {
        const characters = charRefs.current;
        let currentChar = characters[charIndex];
        let typedChar = e.target.value.slice(-1);

        if (charIndex < characters.length && timeLeft > 0) {
            if (!istyping) {
                setTyping(true);
            }

            if (typedChar === currentChar.textContent) {
                currentChar.classList.add('correct');
                setCharIndex((prevIndex) => prevIndex + 1);
                correctWrong[charIndex] = "correct"
            } else {
                currentChar.classList.add('incorrect');
                setMistakes((prevMistakes) => prevMistakes + 1);
                setCharIndex((prevIndex) => prevIndex + 1);
                 correctWrong[charIndex] = "wrong"
            }

            if (charIndex + 1 === characters.length) {
                setTyping(false);

            }
        } else {
            setTyping(false);
        }

        const wordsTyped = (charIndex + 1 - mistakes) / 5;
        setWPM(Math.round((wordsTyped / (maxTime - timeLeft)) * 60));
        setCPM(charIndex + 1 - mistakes);
    };

    const resetTest = () => {
        setTimeLeft(maxTime);
        setMistakes(0);
        setCharIndex(0);
        setTyping(false);
        setWPM(0);
        setCPM(0);
        charRefs.current.forEach(char => {
            char.classList.remove('correct', 'incorrect');
        });
        inputRef.current.value = "";
        inputRef.current.focus();
    };

    return (
        <div className='container'>
            <div className="test">
                <input type="text" className='input-field' ref={inputRef} onChange={handleChange} />
                {
                    paragraph.split("").map((char, index) => (
                        <span
                            className={`char ${index === charIndex ? 'active' : ''}${correctWrong[index]}`}
                            ref={(e) => charRefs.current[index] = e}
                            key={index}
                        >
                            {char}
                        </span>
                    ))
                }
            </div>
            <div className="result">
                <p>Time Left: <strong>{timeLeft}</strong></p>
                <p>Mistakes: <strong>{mistakes}</strong></p>
                <p>WPM: <strong>{WPM}</strong></p>
                <p>CPM: <strong>{CPM}</strong></p>
                <button className='btn' onClick={resetGame}>Try Again</button>
            </div>
        </div>
    );
};

export default TypingTest;
