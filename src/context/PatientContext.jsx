import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all patients
  const getPatients = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://hospitalmanagement-ocj3.onrender.com/api/patients');
      setPatients(data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching patients');
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error fetching patients');
    }
  };

  // Create patient
  const createPatient = async (patientData) => {
    try {
      setLoading(true);
      const { data } = await axios.post('https://hospitalmanagement-ocj3.onrender.com/api/patients', patientData);
      setPatients(prev => [...prev, data]);
      setLoading(false);
      toast.success('Patient created successfully');
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating patient');
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error creating patient');
      return null;
    }
  };

  // Update patient
  const updatePatient = async (id, patientData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`https://hospitalmanagement-ocj3.onrender.com/api/patients/${id}`, patientData);
      setPatients(prev => prev.map(patient => patient._id === id ? data : patient));
      setLoading(false);
      toast.success('Patient updated successfully');
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating patient');
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error updating patient');
      return null;
    }
  };

  // Delete patient
  const deletePatient = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://hospitalmanagement-ocj3.onrender.com/api/patients/${id}`);
      setPatients(prev => prev.filter(patient => patient._id !== id));
      setLoading(false);
      toast.success('Patient deleted successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting patient');
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error deleting patient');
    }
  };

  return (
    <PatientContext.Provider value={{
      patients,
      loading,
      error,
      getPatients,
      createPatient,
      updatePatient,
      deletePatient
    }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => useContext(PatientContext);