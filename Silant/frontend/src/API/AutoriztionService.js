import axios from "../axiosConfig";

export default class AutoriztionService {
    static async getAll() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/check-auth/')
            return response.data
        } catch (e) {
            console.log(e);
        }
    }
}