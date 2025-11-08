import axios from "axios";
const WApi = axios.create({
  baseURL: process.env.WHATSAPP_API_URL,
});
export default WApi;
