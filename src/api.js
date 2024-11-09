import axios from "axios";

export const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      "https://your-endpoint-url.com/endpoint",
      { message },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.response || "Error api.js";
  } catch (error) {
    console.error("Error al obtener respuesta de la IA:", error);
    return "Error AI api.js";
  }
};
