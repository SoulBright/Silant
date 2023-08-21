import axios from "../axiosConfig";

export default class SelectListService {
    static async getEquipmentModel() {
        const response = await axios.get('/equipment-model/')
        return response
    }

    static async getEngineMake() {
        const response = await axios.get('/engine-make/')
        return response
    }

    static async getTransmissionModel() {
        const response = await axios.get('/transmission-model/')
        return response
    }

    static async getDrivingBridgeModel() {
        const response = await axios.get('/driving-bridge-model/')
        return response
    }

    static async getControlledBridgeModel() {
        const response = await axios.get('/controlled-bridge-model/')
        return response
    }

    static async getMaintenanceType() {
        const response = await axios.get('/maintenance-type/')
        return response
    }

    static async getMaintenanceOrganization() {
        const response = await axios.get('/maintenance-organization/')
        return response
    }

    static async getClient() {
        const response = await axios.get('/client/')
        return response
    }

    static async getServiceCompany() {
        const response = await axios.get('/service-company/')
        return response
    }

    static async getFailureJuncture() {
        const response = await axios.get('/failure-juncture/')
        return response
    }

    static async getRecoveryMethod() {
        const response = await axios.get('/recovery-method/')
        return response
    }
}
