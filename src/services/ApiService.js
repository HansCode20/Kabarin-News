import axios from "axios";

const BASE_URL = "https://api-berita-indonesia.vercel.app/cnn/";

export const fetchNews = async (path) => {
  try {
    const response = await axios.get(`${BASE_URL}${path}`);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch data:", error);
    throw error;
  }
};
