import axios from "../axiosConfig";

export default class MaintenanceService {
    static async getAll() {
        const response = await axios.get('http://127.0.0.1:8000/api/maintenance/')
        return response
    }
    static async getWithFilters(props) {
        const response = await axios.get('http://127.0.0.1:8000/api/maintenance/', {params: props})
        return response
    }
}
