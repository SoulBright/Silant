import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api';

export default class ListService {
    static async getEquipmentModel(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/equipment-model/${encodedTitle}`);
    };
    static async getEngineMake(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/engine-make/${encodedTitle}`);
    };
    static async getTransmissionModel(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/transmission-model/${encodedTitle}`);
    };
    static async getDrivingBridgeModel(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/driving-bridge-model/${encodedTitle}`);
    };
    static async getControlledBridgeModel(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/controlled-bridge-model/${encodedTitle}`);
    };

    static async getMaintenanceByType(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/maintenance-type/${encodedTitle}`);
    };

    static async getMaintenanceByOrganization(props) {
        const encodedOrg = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/maintenance-organization/${encodedOrg}`);
    };

    static async getFailureJuncture(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/failure-juncture/${encodedTitle}`);
    };

    static async getRecoveryMethod(props) {
        const encodedTitle = encodeURIComponent(props);
        return axios.get(`${BASE_URL}/recovery-method/${encodedTitle}`);
    };
}