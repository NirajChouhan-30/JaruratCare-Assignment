import api from "./api";

export const createSupportRequest = async (data) => {
  const response = await api.post("/support", data);
  return response.data;
};

export const getSupportRequests = async () => {
  const response = await api.get("/support");
  return response.data;
};