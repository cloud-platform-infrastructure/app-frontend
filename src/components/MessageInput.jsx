import React, { useState } from 'react';

const MessageInput = ({ onSend, loading }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-form">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                disabled={loading}
                className="message-input"
            />
            <button type="submit" disabled={loading || !message.trim()} className="send-button">
                {loading ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
};

export default MessageInput;
