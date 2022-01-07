const Fetch = async (url, params) => {
  const request = await fetch(url, params)
    .then((response) => response.json())
    .then((response) => ({ status: true, payload: response }))
    .catch((error) => ({ status: false, error}));
  return request;
};

export default Fetch;
