import axios from "../axiosConfig";

export default class ReclamationService {
    static async getAll() {
        const response = await axios.get('http://127.0.0.1:8000/api/reclamation/')
        return response
    }
    static async getWithFilters(props) {
        const response = await axios.get('http://127.0.0.1:8000/api/reclamation/', {params: props})
        return response
    }
}
