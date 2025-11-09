export const defaultSettings = {
  baseURL: '',
  endpoints: {
    portfolio: {
      get: '',
      post: '',
    },
    market: {
      get: '',
      post: '',
    },
  },
  authentication: {
    type: 'none', // 'none', 'apiKey', 'bearer'
    apiKey: '',
    bearerToken: '',
  },
  timeout: 10000,
};

export const constructFullURL = (baseURL, endpoint) => {
  if (!baseURL || !endpoint) {
    return '';
  }
  
  // Remove trailing slash from baseURL if present
  const cleanBaseURL = baseURL.replace(/\/$/, '');
  
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${cleanBaseURL}${cleanEndpoint}`;
};

