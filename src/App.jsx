import React, { useState, useEffect } from 'react';
import MessageInput from './components/MessageInput';
import LogList from './components/LogList';
import { fetchLogs, sendMessage, deleteLog } from './services/api';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLogs = async () => {
    try {
      const data = await fetchLogs();
      // Ensure data is an array, handle potential backend variations
      setLogs(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch logs", err);
      setError("Failed to load logs. Please try again later.");
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleSend = async (message) => {
    setLoading(true);
    setError(null);
    try {
      const updatedLogs = await sendMessage(message);
      // The requirement says "return the list of logs", so we update state directly
      setLogs(Array.isArray(updatedLogs) ? updatedLogs : []);
    } catch (err) {
      console.error("Failed to send message", err);
      setError("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Optimistic update or wait for refresh? Requirement says "update the list of logs in the UI".
    // We'll try to delete and then refresh or filter locally if the backend doesn't return the list.
    // Requirement says "After deletion, update the list of logs in the UI."
    // Usually DELETE returns 204 or the deleted item. We might need to refetch or filter.
    // Let's assume we need to refetch or filter. Filtering is better for UX, but refetching ensures consistency.
    // Given the previous pattern (POST returns list), maybe DELETE doesn't?
    // Let's filter locally first for immediate feedback, then maybe refetch if needed.
    // Actually, to be safe and simple: call delete, then filter locally.

    try {
      await deleteLog(id);
      setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
    } catch (err) {
      console.error("Failed to delete log", err);
      setError("Error deleting log.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Message Logger</h1>
      </header>
      <main>
        <section className="input-section">
          <MessageInput onSend={handleSend} loading={loading} />
        </section>
        {error && <div className="error-message">{error}</div>}
        <section className="logs-section">
          <LogList logs={logs} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

export default App;
