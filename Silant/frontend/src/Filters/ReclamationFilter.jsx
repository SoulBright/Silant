import React, { useState, useEffect } from 'react'

import SelectListService from '../API/SelectListService';
import ReclamationService from '../API/ReclamationService';

import ReclamationList from '../components/ReclamationList';

import MySelect from '../UI/Select/MySelect';
import MyButton from '../UI/Button/MyButton';

import './Filters.css'

export default function ReclamationFilter() {

    const [filterValues, setFilterValues] = useState({
        failureJuncture: '',
        recoveryMethod: '',
        serviceCompany: '',
    });

    const [filteredReclamations, setFilteredReclamations] = useState('');

    const [failureJuncture, setFailureJuncture] = useState([]);
    const [recoveryMethod, setRecoveryMethod] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [resetValues, setResetValues] = useState(false);

    useEffect(() => {
        if (filteredReclamations==='') {
            ReclamationService.getAll().then(resp => { setFilteredReclamations(resp.data) })
        }
    }, [filteredReclamations])

    useEffect(() => {

        async function fetchData() {
            try {
                const failureJunctureResponse = await SelectListService.getFailureJuncture();
                setFailureJuncture(failureJunctureResponse.data);

                const recoveryMethodResponse = await SelectListService.getRecoveryMethod();
                setRecoveryMethod(recoveryMethodResponse.data);

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
                failureJuncture: '',
                recoveryMethod: '',
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
          const response = await ReclamationService.getWithFilters(filterValues);
          setFilteredReclamations(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    const handleResetFilters = () => {
        setFilteredReclamations('')
        setResetValues(true);
    };

    return (
        <div className='filters'>
            <form className='filters-form' onSubmit={handleFilterSubmit}>
                <div className="select">
                    <MySelect
                        label="Узел отказа"
                        name="failureJuncture"
                        value={filterValues.failureJuncture}
                        options={failureJuncture}
                        field={'title'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Способ восстановления"
                        name="recoveryMethod"
                        value={filterValues.recoveryMethod}
                        options={recoveryMethod}
                        field={'title'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Сервисная компания"
                        name="serviceCompany"
                        value={filterValues.serviceCompany}
                        options={serviceCompany}
                        field={'serviceCompanyUser'}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="button">
                    <MyButton type="submit">Применить фильтры</MyButton>
                    <MyButton onClick={handleResetFilters}>Сбросить все фильтры</MyButton>
                </div>
            </form >
            <ReclamationList filteredReclamations={filteredReclamations} />
        </div >
    )
}
