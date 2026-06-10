import API from "./axios";

export const loginAdmin = async (data) => {
  const response = await API.post(
    "/auth/login",
    data
  );

  return response.data;
};