import { env } from '../env';

export const generalFetch = async (endpoint, { method, token, body }) => {
  const result = await fetch(`${env.BACKEND_URL}/api/${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token,
    },
    body: JSON.stringify(body),
  });
  return result.json();
};
