import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

import AddListsObjects from './AddListsObjects.jsx'

import '../styles/GetTable.css'

export default function MaintenanceList({ filteredMaintenance }) {
    const isManager = useSelector(state => state.auth.manager);

    const [maintenances, setMaintenance] = useState([]);
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedMaintenanceOrg, setSelectedMaintenanceOrg] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        setMaintenance(filteredMaintenance);
    }, [filteredMaintenance]);

    useEffect(() => {
        if (selectedType) {
            ListService.getMaintenanceByType(selectedType)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedType]);


    useEffect(() => {
        if (selectedMaintenanceOrg) {
            ListService.getMaintenanceByOrganization(selectedMaintenanceOrg)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedMaintenanceOrg]);

    const handleTypeClick = (maintenance) => {
        setSelectedType(maintenance);
    };

    const handleOrgClick = (maintenance) => {
        setSelectedMaintenanceOrg(maintenance);
    };

    const closeModal = () => {
        setSelectedType('');
        setSelectedMaintenanceOrg('');
        setModalIsOpen(false)
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedMaintenances = maintenances && maintenances.length ? maintenances.sort((a, b) => {
        if (sortColumn === 'type') {
            return sortDirection === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
        } else if (sortColumn === 'date') {
            return sortDirection === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
        } else if (sortColumn === 'operatingTime') {
            return sortDirection === 'asc' ? a.operatingTime - b.operatingTime : b.operatingTime - a.operatingTime;
        } else if (sortColumn === 'workOrder') {
            return sortDirection === 'asc' ? a.workOrder.localeCompare(b.workOrder) : b.workOrder.localeCompare(a.workOrder);
        } else if (sortColumn === 'workOrderDate') {
            return sortDirection === 'asc' ? a.workOrderDate.localeCompare(b.workOrderDate) : b.workOrderDate.localeCompare(a.workOrderDate);
        } else if (sortColumn === 'maintenanceOrganization') {
            return sortDirection === 'asc' ? a.maintenanceOrganization.localeCompare(b.maintenanceOrganization) : b.maintenanceOrganization.localeCompare(a.maintenanceOrganization);
        } else if (sortColumn === 'machine') {
            return sortDirection === 'asc' ? a.machine.localeCompare(b.machine) : b.machine.localeCompare(a.machine);
        } else if (sortColumn === 'serviceCompany') {
            return sortDirection === 'asc' ? a.serviceCompany.localeCompare(b.serviceCompany) : b.serviceCompany.localeCompare(a.serviceCompany);
        }


        return 0;
    }) : [];

    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>Информация о проведённых ТО</h1>
            </div>
            {!isManager ? null :
                <div className="list-buttons">
                    <AddListsObjects url={'maintenance-type'} label={'Добавить Вид ТО'} />
                    <AddListsObjects url={'maintenance-organization'} label={'Добавить Организацию, проводившую ТО'} />
                </div>}
            {maintenances.length ? (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('type')}>
                                    Вид ТО
                                    {sortColumn === 'type' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('date')}>
                                    Дата проведения ТО
                                    {sortColumn === 'date' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('operatingTime')}>
                                    Наработка, м/час
                                    {sortColumn === 'operatingTime' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('workOrder')}>
                                    № заказ-наряда
                                    {sortColumn === 'workOrder' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('workOrderDate')}>
                                    Дата заказ-наряда
                                    {sortColumn === 'workOrderDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('maintenanceOrganization')}>
                                    Организация, проводившая ТО
                                    {sortColumn === 'maintenanceOrganization' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('machine')}>
                                    Машина
                                    {sortColumn === 'machine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('serviceCompany')}>
                                    Сервисная компания
                                    {sortColumn === 'serviceCompany' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMaintenances.map(maintenance => (
                                <tr key={maintenance.id}>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleTypeClick(maintenance.type)}>
                                        {maintenance.type}
                                    </td>
                                    <td>{maintenance.date}</td>
                                    <td>{maintenance.operatingTime}</td>
                                    <td>{maintenance.workOrder}</td>
                                    <td>{maintenance.workOrderDate}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleOrgClick(maintenance.maintenanceOrganization)}>
                                        {maintenance.maintenanceOrganization}
                                    </td>
                                    <td>{maintenance.machine}</td>
                                    <td>{maintenance.serviceCompany}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            ) : (
                <h3 style={{ color: '#D20A11', textAlign: 'center' }}>ТО с выбранными параметрами отсутствуют</h3>
            )}
            <Modal
                className="modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Object Info Modal"
            >
                <div className="info">
                    <h2>{objectInfo.title}</h2>
                    <p>{objectInfo.description}</p>
                </div>
                <MyButton onClick={closeModal}>Закрыть</MyButton>
            </Modal>
        </div>
    );
}
