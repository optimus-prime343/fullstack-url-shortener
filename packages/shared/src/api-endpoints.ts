export const apiEndpoints = {
  base: '/api/v1',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  shortenUrl: {
    base: '/shorten-url',
  },
} as const
