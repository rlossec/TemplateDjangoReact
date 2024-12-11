import axiosInstance from "./axiosInstance";

export const apiFetch = async (method, uri, data = null) => {
  const config = {
    method,
    url: uri,
    data: data instanceof FormData ? data : JSON.stringify(data),
  };
  if (data instanceof FormData) {
    config.headers = { "Content-Type": "multipart/form-data" };
  }

  try {
    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    console.error("API request error", error);
    throw error;
  }
};
