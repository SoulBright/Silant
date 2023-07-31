import axios from "axios";

export default class MachineService {
    static async getAll() {
        const response = await axios.get('http://127.0.0.1:8000/api/machine/')
        return response
    }
    static async getWithFilters(props) {
        const response = await axios.get('http://127.0.0.1:8000/api/machine/', {params: props})
        return response
    }
    static async getWithSearch(props) {
        const response = await axios.get('http://127.0.0.1:8000/api/machine/', {params: {search: props}})
        return response
    }
}
