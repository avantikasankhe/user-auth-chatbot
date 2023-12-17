"use client";
import React, { useState } from 'react';

import bot from '../../assets/bot.svg';
import user from '../../assets/user.svg';

const Chatbot = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const loader = () => {
    const dots = '...';
    return dots.split('').map((dot, index) => (
      <span key={index}>{dot}</span>
    ));
  };

  const typeText = async (text, uniqueId) => {
    const messageDiv = document.getElementById(uniqueId);
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        messageDiv.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  };

  const chatStripe = (isAi, value, uniqueId) => (
    <div key={uniqueId} className={`wrapper ${isAi && 'ai'}`}>
      <div className="chat">
        <div className="profile">
          <img src={isAi ? bot : user} alt={isAi ? 'bot' : 'user'} />
        </div>
        <div className="message" id={uniqueId}>
          {value}
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // user's chat stripe
    const userMessageUniqueId = generateUniqueId();
    setMessages((prevMessages) => [
      ...prevMessages,
      { isAi: false, value: inputPrompt, uniqueId: userMessageUniqueId },
    ]);

    setInputPrompt('');

    // bot's chat stripe
    const botMessageUniqueId = generateUniqueId();
    setMessages((prevMessages) => [
      ...prevMessages,
      { isAi: true, value: loader(), uniqueId: botMessageUniqueId },
    ]);

    // to focus scroll to the bottom
    const chatContainer = document.getElementById('chat_container');
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div
    const userMessageDiv = document.getElementById(userMessageUniqueId);
    loader(userMessageDiv);

    const response = await fetch('https://server-5g2c.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: inputPrompt,
      }),
    });

    clearInterval(loadInterval);
    userMessageDiv.innerHTML = ' ';

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

      typeText(parsedData, botMessageUniqueId);
    } else {
      const err = await response.text();
      setMessages((prevMessages) => [
        ...prevMessages,
        { isAi: true, value: 'Something went wrong' },
      ]);
      alert(err);
    }
  };

  const handleInputChange = (e) => {
    setInputPrompt(e.target.value);
  };

  return (
    <div>
      <div id="chat_container">
        {messages.map((message) =>
          chatStripe(message.isAi, message.value, message.uniqueId)
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea value={inputPrompt} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Chatbot;
