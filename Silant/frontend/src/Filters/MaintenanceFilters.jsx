import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector } from 'react-redux';

import MachineService from '../API/MachineService';
import SelectListService from '../API/SelectListService';
import MaintenanceService from '../API/MaintenanceService';

import MaintenanceList from '../components/MaintenanceList';
import MaintenanceForm from '../Form/MaintenanceForm'


import MySelect from '../UI/Select/MySelect';
import MyButton from '../UI/Button/MyButton';

import './Filters.css'
import '../styles/GetTable.css';

export default function MaintenanceFilters() {

    const [filterValues, setFilterValues] = useState({
        type: '',
        machine: '',
        serviceCompany: '',
    });

    const [filteredMaintenance, setfilteredMaintenance] = useState('');

    const [type, setType] = useState([]);
    const [machine, setMachine] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [resetValues, setResetValues] = useState(false);

    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);

    const isCompany = useSelector(state => state.auth.company);

    useEffect(() => {
        if (filteredMaintenance === '') {
            MaintenanceService.getAll().then(resp => { setfilteredMaintenance(resp.data) })
        }
    }, [filteredMaintenance])

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
            setfilteredMaintenance(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetFilters = () => {
        setfilteredMaintenance('')
        setResetValues(true);
    };

    const handleCreateObject = () => {
        setModalCreateIsOpen(true)
    }

    const closeCreateModal = () => {
        setModalCreateIsOpen(false)
        setfilteredMaintenance('')
        setResetValues(true);
    }

    return (
        <div className='filters'>
            <form className='filters-form' onSubmit={handleFilterSubmit}>
                <div className="select">
                    <MySelect
                        label="Вид ТО"
                        name="type"
                        value={filterValues.type}
                        options={type}
                        field={'title'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Машина"
                        name="machine"
                        value={filterValues.machine}
                        options={machine}
                        field={'machineSerialNumber'}
                        onChange={handleFilterChange}
                    />

                    {!isCompany ?
                        <MySelect
                            label="Сервисная компания"
                            name="serviceCompany"
                            value={filterValues.serviceCompany}
                            options={serviceCompany}
                            field={'serviceCompanyUser'}
                            onChange={handleFilterChange}
                        /> : null}

                </div>
                <div className="button">
                    <MyButton type="submit">Применить фильтры</MyButton>
                    <MyButton onClick={handleResetFilters}>Сбросить все фильтры</MyButton>
                    <MyButton onClick={handleCreateObject}>Добавить информацию о ТО</MyButton>
                </div>
            </form>
            <Modal
                className="modal-create"
                isOpen={modalCreateIsOpen}
                onRequestClose={closeCreateModal}
                contentLabel="Object Crate Modal"
            >
                <MaintenanceForm />
                <hr />
                <MyButton onClick={closeCreateModal}>Закрыть</MyButton>
            </Modal>
            <MaintenanceList filteredMaintenance={filteredMaintenance} />
        </div>
    )
}
