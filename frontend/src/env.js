export const env = {
  BACKEND_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://giggle-greenbay.herokuapp.com'
      : 'http://localhost:5000',
};
