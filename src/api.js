import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSalamandraResponse = async (prompt) => {
  try {
    const response = await api.post("/chat", {
      message: prompt,
    });
    console.log("Response received", response.data);
    return response.data.message;
  } catch (error) {
    console.lerr("Errorsito");
    throw error;
  }
};
