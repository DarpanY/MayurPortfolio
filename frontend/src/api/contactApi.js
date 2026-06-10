import API from "./axios";

export const getMessages = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/contact",
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const deleteMessage = async (id) => {

  const token = localStorage.getItem("token");

  const response = await API.delete(
    `/contact/${id}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  return response.data;
};