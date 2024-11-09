import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSalamandraResponse = async (prompt) => {
  try {
    const response = await api.post("/chat", {
      message: prompt,
    });
    return response.data.message;
  } catch (error) {
    console.lerr("Errorsito");
    throw error;
  }
};
