import axios from "../axiosConfig";

export default class ListService {
    static async getEquipmentModel(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`/equipment-model/${encodedTitle}`);
    };
    static async getEngineMake(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`/engine-make/${encodedTitle}`);
    };
    static async getTransmissionModel(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`/transmission-model/${encodedTitle}`);
    };
    static async getDrivingBridgeModel(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`/driving-bridge-model/${encodedTitle}`);
    };
    static async getControlledBridgeModel(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`/controlled-bridge-model/${encodedTitle}`);
    };

    static async getMaintenanceByType(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`/maintenance-type/${encodedTitle}`);
    };

    static async getMaintenanceByOrganization(props) {
        const encodedOrg = encodeURIComponent(props);
        return axios.get(`/maintenance-organization/${encodedOrg}`);
    };

    static async getFailureJuncture(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`/failure-juncture/${encodedTitle}`);
    };

    static async getRecoveryMethod(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`/recovery-method/${encodedTitle}`);
    };
}