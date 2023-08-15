import axios from "../axiosConfig";

export default class AutoriztionService {
    static async getAll() {
        try {
            const response = await axios.get('check-auth/')
            return response.data
        } catch (e) {
            console.log(e);
        }
    }
}