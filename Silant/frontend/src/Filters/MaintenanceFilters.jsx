import React, { useState, useEffect } from 'react'

import MachineService from '../API/MachineService';
import SelectListService from '../API/SelectListService';
import MaintenanceService from '../API/MaintenanceService';

import MySelect from '../UI/Select/MySelect';
import MyButton from '../UI/Button/MyButton';

export default function MaintenanceFilters() {

    const [filterValues, setFilterValues] = useState({
        type: '',
        machine: '',
        serviceCompany: '',
    });

    const [type, setType] = useState([]);
    const [machine, setMachine] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [resetValues, setResetValues] = useState(false);

    useEffect(() => {

        async function fetchData() {
            try {
                const typeResponse = await SelectListService.getMaintenanceType();
                setType(typeResponse.data);

                const machineResponse = await MachineService.getAll();
                setMachine(machineResponse.data);

                const serviceCompanyResponse = await SelectListService.getServiceCompany();
                setServiceCompany(serviceCompanyResponse.data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (resetValues) {
            setFilterValues({
                type: '',
                machine: '',
                serviceCompany: '',
            });
            setResetValues(false);
        }
    }, [resetValues]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterValues({ ...filterValues, [name]: value });
    };

    const handleFilterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await MaintenanceService.getWithFilters(filterValues);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetFilters = () => {
        setResetValues(true);
    };

    return (
        <div>
            <form onSubmit={handleFilterSubmit}>
                <MySelect
                    label="Вид ТО"
                    name="type"
                    value={filterValues.type}
                    options={type}
                    field={'title'}
                    onChange={handleFilterChange}
                />
                <br />
                <MySelect
                    label="Машина"
                    name="machine"
                    value={filterValues.machine}
                    options={machine}
                    field={'machineSerialNumber'}
                    onChange={handleFilterChange}
                />
                <br />
                <MySelect
                    label="Сервисная компания"
                    name="serviceCompany"
                    value={filterValues.serviceCompany}
                    options={serviceCompany}
                    field={'serviceCompanyUser'}
                    onChange={handleFilterChange}
                />
                <br />
                <MyButton type="submit">Применить фильтры</MyButton>
                <MyButton onClick={handleResetFilters}>Сбросить фильтры</MyButton>
            </form>
        </div>
    )
}
