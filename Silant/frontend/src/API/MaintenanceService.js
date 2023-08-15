import axios from "../axiosConfig";

export default class MaintenanceService {
    static async getAll() {
        const response = await axios.get('/maintenance/')
        return response
    }
    static async getWithFilters(props) {
        const response = await axios.get('/maintenance/', {params: props})
        return response
    }
}
