import React from 'react';

const LogList = ({ logs, onDelete }) => {
    if (!logs || logs.length === 0) {
        return <p className="no-logs">No logs available.</p>;
    }

    return (
        <div className="log-list">
            <h3>Logs</h3>
            <ul>
                {logs.map((log) => (
                    <li key={log.id || log.timestamp} className="log-item">
                        <div className="log-content">
                            <span className="log-message">{log.message}</span>
                            <span className="log-timestamp">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <button
                            onClick={() => onDelete(log.id)}
                            className="delete-button"
                            aria-label="Delete log"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LogList;
