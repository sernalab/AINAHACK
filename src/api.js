import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

export const fetchSalamandraResponse = async (prompt) => {
  try {
    const response = await apiClient.post("/v1/completions", {
      model: "salamandra",
      prompt: prompt,
      max_tokens: 50,
      temperature: 0.7,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error al obtener la respuesta de Salamandra:", error);
    throw error;
  }
};
