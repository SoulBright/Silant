import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

import '../styles/GetTable.css'

export default function MaintenanceList({filteredMaintenance}) {
    const [maintenances, setMaintenance] = useState([]);
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedMaintenanceOrg, setSelectedMaintenanceOrg] = useState('');

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

    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>Информация о проведённых ТО вашей техники</h1>
            </div>
            {maintenances.length ? (
            <div className='table-wrapper'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Вид ТО</th>
                            <th>Дата проведения ТО</th>
                            <th>Наработка, м/час</th>
                            <th>№ заказ-наряда</th>
                            <th>Дата заказ-наряда</th>
                            <th>Организация, проводившая ТО</th>
                            <th>Машина</th>
                            <th>Сервисная компания</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenances.map(maintenance => (
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
                            <h3 style={{color: '#D20A11', textAlign: 'center' }}>ТО с выбранными параметрами отсутствуют</h3>
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
