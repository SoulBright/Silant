import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APIEndpointChecker = () => {
  const [machineEndpointStatus, setMachineEndpointStatus] = useState(null);
  const [maintenanceEndpointStatus, setMaintenanceEndpointStatus] = useState(null);
  const [reclamationEndpointStatus, setReclamationEndpointStatus] = useState(null);

  useEffect(() => {
    const checkAPIEndpoints = async () => {
      try {
        const machineResponse = await axios.get('http://127.0.0.1:8000/api/machine/');
        if (machineResponse.status === 200) {
          setMachineEndpointStatus('Available');
        }
      } catch (error) {
        setMachineEndpointStatus('Unavailable');
      }

      try {
        const maintenanceResponse = await axios.get('http://127.0.0.1:8000/api/maintenance/');
        if (maintenanceResponse.status === 200) {
          setMaintenanceEndpointStatus('Available');
        }
      } catch (error) {
        setMaintenanceEndpointStatus('Unavailable');
      }

      try {
        const reclamationResponse = await axios.get('http://127.0.0.1:8000/api/reclamation/');
        if (reclamationResponse.status === 200) {
          setReclamationEndpointStatus('Available');
        }
      } catch (error) {
        setReclamationEndpointStatus('Unavailable');
      }
    };

    checkAPIEndpoints();
  }, []);

  return (
    <div>
      <h3>API Endpoint Status:</h3>
      <p>Machine Endpoint: {machineEndpointStatus}</p>
      <p>Maintenance Endpoint: {maintenanceEndpointStatus}</p>
      <p>Reclamation Endpoint: {reclamationEndpointStatus}</p>
    </div>
  );
};

export default APIEndpointChecker;
