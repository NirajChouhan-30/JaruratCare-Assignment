import api from "./api";

export const createVolunteer = async (data) => {
  const response = await api.post("/volunteers", data);
  return response.data;
};

export const getVolunteers = async () => {
  const response = await api.get("/volunteers");
  return response.data;
};