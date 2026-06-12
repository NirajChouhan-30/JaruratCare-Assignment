import api from "./api";

export const assignVolunteer = async (
  requestId,
  volunteerId
) => {
  const response = await api.patch(
    `/support/${requestId}/assign`,
    {
      volunteerId,
    }
  );

  return response.data;
};