import axios from 'axios';

const resolveBaseURL = () => {
  // 1. Valor injetado em runtime no navegador (ideal para produção em Kubernetes)
  if (typeof window !== 'undefined' && window.__API_BASE_URL__) {
    return window.__API_BASE_URL__;
  }

  // 2. Env var do Vite (prioritário para dev/build)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // 3. Env var de build (legacy/compatibilidade)
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }

  // 3. Fallback: Use relative path (supports Ingress/Reverse Proxy)
  return '';
};

export const API_BASE_URL = resolveBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchLogs = async () => {
  try {
    const response = await api.get('/logs');
    return response.data;
  } catch (error) {
    console.error('[api] Erro ao buscar logs:', error);
    throw error;
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/message', { message });
    return response.data;
  } catch (error) {
    console.error('[api] Erro ao enviar mensagem:', error);
    throw error;
  }
};

export const deleteLog = async (id) => {
  try {
    const response = await api.delete(`/log/${id}`);
    return response.data;
  } catch (error) {
    console.error('[api] Erro ao deletar log:', error);
    throw error;
  }
};
