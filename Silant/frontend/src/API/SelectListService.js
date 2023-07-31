import axios from 'axios'

export default class SelectListService {
    static async getEquipmentModel() {
        const response = await axios.get('http://127.0.0.1:8000/api/equipment-model/')
        return response
    }

    static async getEngineMake() {
        const response = await axios.get('http://127.0.0.1:8000/api/engine-make/')
        return response
    }

    static async getTransmissionModel() {
        const response = await axios.get('http://127.0.0.1:8000/api/transmission-model/')
        return response
    }

    static async getDrivingBridgeModel() {
        const response = await axios.get('http://127.0.0.1:8000/api/driving-bridge-model/')
        return response
    }

    static async getControlledBridgeModel() {
        const response = await axios.get('http://127.0.0.1:8000/api/controlled-bridge-model/')
        return response
    }

    static async getMaintenanceType() {
        const response = await axios.get('http://127.0.0.1:8000/api/maintenance-type/')
        return response
    }

    static async getMaintenanceOrganization() {
        const response = await axios.get('http://127.0.0.1:8000/api/maintenance-organization/')
        return response
    }

    static async getServiceCompany() {
        const response = await axios.get('http://127.0.0.1:8000/api/service-company/')
        return response
    }

    static async getFailureJuncture() {
        const response = await axios.get('http://127.0.0.1:8000/api/failure-juncture/')
        return response
    }

    static async getRecoveryMethod() {
        const response = await axios.get('http://127.0.0.1:8000/api/recovery-method/')
        return response
    }
}
