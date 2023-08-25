import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

import AddListsObjects from './AddListsObjects.jsx'

import '../styles/GetTable.css'

export default function ReclamationList({ filteredReclamations }) {
    const isManager = useSelector(state => state.auth.manager);

    const [reclamations, setReclamation] = useState([]);
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFailureJuncture, setSelectedFailureJuncture] = useState('');
    const [selectedRecoveryMethod, setSelectedRecoveryMethod] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        setReclamation(filteredReclamations);
    }, [filteredReclamations]);

    useEffect(() => {
        if (selectedFailureJuncture) {
            ListService.getFailureJuncture(selectedFailureJuncture)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedFailureJuncture]);

    useEffect(() => {
        if (selectedRecoveryMethod) {
            ListService.getRecoveryMethod(selectedRecoveryMethod)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedRecoveryMethod]);

    const handleFailureJunctureClick = (reclamation) => {
        setSelectedFailureJuncture(reclamation);
    };

    const handleRecoveryMethodClick = (reclamation) => {
        setSelectedRecoveryMethod(reclamation);
    };

    const closeModal = () => {
        setSelectedFailureJuncture('');
        setSelectedRecoveryMethod('');
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

    const sortedReclamations = reclamations && reclamations.length ? reclamations.sort((a, b) => {
        if (sortColumn === 'failureDate') {
            return sortDirection === 'asc' ? a.failureDate.localeCompare(b.failureDate) : b.failureDate.localeCompare(a.failureDate);
        } else if (sortColumn === 'operatingTime') {
            return sortDirection === 'asc' ? a.operatingTime - b.operatingTime : b.operatingTime - a.operatingTime;
        } else if (sortColumn === 'failureJuncture') {
            return sortDirection === 'asc' ? a.failureDate.localeCompare(b.failureJuncture) : b.failureJuncture.localeCompare(a.failureJuncture);
        } else if (sortColumn === 'failureDescription') {
            return sortDirection === 'asc' ? a.failureDescription.localeCompare(b.failureDescription) : b.failureDescription.localeCompare(a.failureDescription);
        } else if (sortColumn === 'recoveryMethod') {
            return sortDirection === 'asc' ? a.recoveryMethod.localeCompare(b.recoveryMethod) : b.recoveryMethod.localeCompare(a.recoveryMethod);
        } else if (sortColumn === 'spareParts') {
            return sortDirection === 'asc' ? a.spareParts.localeCompare(b.spareParts) : b.spareParts.localeCompare(a.spareParts);
        } else if (sortColumn === 'recoveryDate') {
            return sortDirection === 'asc' ? a.recoveryDate.localeCompare(b.recoveryDate) : b.recoveryDate.localeCompare(a.recoveryDate);
        } else if (sortColumn === 'equipmentDowntime') {
            return sortDirection === 'asc' ? a.equipmentDowntime - b.equipmentDowntime : b.equipmentDowntime - a.equipmentDowntime;
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
                <h1 style={{ textAlign: 'center' }}>Информация о рекламациях</h1>
            </div>
            {!isManager ? null :
                <div className="list-buttons">
                    <AddListsObjects url={'failure-juncture'} label={'Добавить Узел отказа'} />
                    <AddListsObjects url={'recovery-method'} label={'Добавить Способ восстановления'} />
                </div>}
            {reclamations.length ? (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('failureDate')}>
                                    Дата отказа
                                    {sortColumn === 'failureDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('operatingTime')}>
                                    Наработка, м/час
                                    {sortColumn === 'operatingTime' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('failureJuncture')}>
                                    Узел отказа
                                    {sortColumn === 'failureJuncture' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('failureDescription')}>
                                    Описание отказа
                                    {sortColumn === 'failureDescription' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('recoveryMethod')}>
                                    Способ восстановления
                                    {sortColumn === 'recoveryMethod' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('spareParts')}>
                                    Запасные части
                                    {sortColumn === 'spareParts' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('recoveryDate')}>
                                    Дата восстановления
                                    {sortColumn === 'recoveryDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('equipmentDowntime')}>
                                    Время простоя техники
                                    {sortColumn === 'equipmentDowntime' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
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
                            {sortedReclamations.map(reclamation => (
                                <tr key={reclamation.id}>
                                    <td>{reclamation.failureDate}</td>
                                    <td>{reclamation.operatingTime}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleFailureJunctureClick(reclamation.failureJuncture)}>
                                        {reclamation.failureJuncture}
                                    </td>
                                    <td>{reclamation.failureDescription}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleRecoveryMethodClick(reclamation.recoveryMethod)}>
                                        {reclamation.recoveryMethod}
                                    </td>
                                    <td>{reclamation.spareParts}</td>
                                    <td>{reclamation.recoveryDate}</td>
                                    <td>{reclamation.equipmentDowntime}</td>
                                    <td>{reclamation.machine}</td>
                                    <td>{reclamation.serviceCompany}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3 style={{ color: '#D20A11', textAlign: 'center' }}>Рекламации с выбранными параметрами отсутствуют</h3>
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
    )
}
