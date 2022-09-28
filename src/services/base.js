import axios from "axios";
const domain = "https://63326623573c03ab0b48635b.mockapi.io/api/v1";
const client = axios.create({
  baseURL: domain,
});

const Base = async function (options) {
  const onSuccess = (response) => response.data;
  const onError = (error) => Promise.reject(error.response || error.message);

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default Base;
