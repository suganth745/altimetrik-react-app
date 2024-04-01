import axios from "./axios-utils";

export const loginApi = (props) => axios.post("/login", props);

export const allUsersApi = () => axios.get("/all-users");

export const registerApi = (props) => axios.post("/register", { ...props });

export const updateUserApi = (id, body) =>
  axios.put(`/update-user/${id}`, { ...body });

export const authTestApi = (token) =>
  axios.get("/admin/test/sample_response", {
    headers: { Authorization: `Bearer ${token}` },
  });
