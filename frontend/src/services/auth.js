import api from './api';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login/', { username, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout/');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me/');
    return response.data;
  },
};

export const visibilityService = {
  getAssets: async () => {
    const response = await api.get('/visibility/assets/');
    return response.data;
  },

  getAsset: async (id) => {
    const response = await api.get(`/visibility/assets/${id}/`);
    return response.data;
  },
};

export const riskService = {
  getScenarios: async () => {
    const response = await api.get('/risk/scenarios/');
    return response.data;
  },

  getScenario: async (id) => {
    const response = await api.get(`/risk/scenarios/${id}/`);
    return response.data;
  },

  createScenario: async (data) => {
    const response = await api.post('/risk/scenarios/', data);
    return response.data;
  },

  updateScenario: async (id, data) => {
    const response = await api.put(`/risk/scenarios/${id}/`, data);
    return response.data;
  },

  deleteScenario: async (id) => {
    const response = await api.delete(`/risk/scenarios/${id}/`);
    return response.data;
  },
};
