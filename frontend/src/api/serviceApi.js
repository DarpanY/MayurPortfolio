import API from "./axios";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getServices = async () => {
  const res = await API.get("/services");
  return res.data;
};

export const createService = async (formData) => {
  const res = await API.post("/services", formData, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteService = async (id) => {
  const res = await API.delete(`/services/${id}`, { headers: authHeader() });
  return res.data;
};

export const addWork = async (serviceId, formData) => {
  const res = await API.post(`/services/${serviceId}/works`, formData, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteWork = async (serviceId, workId) => {
  const res = await API.delete(`/services/${serviceId}/works/${workId}`, {
    headers: authHeader(),
  });
  return res.data;
};