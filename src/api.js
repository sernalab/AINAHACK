import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSalamandraResponse = async (prompt) => {
  try {
    console.log("Enviando mensaje (prompt)", prompt);
    const response = await api.post("/chat", {
      message: prompt,
    });
    console.log("Response received", response.data);
    return response.data.response;
  } catch (error) {
    console.lerr("Error comunicación");
    if (error.response) {
      console.error("Datos del error", error.response.data);
      console.error("Estado", error.response.status);
    }
  }
};
