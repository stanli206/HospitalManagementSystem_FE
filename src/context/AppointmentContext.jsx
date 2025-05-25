import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all appointments
  const getAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5002/api/appointments');
      setAppointments(data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching appointments');
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error fetching appointments');
    }
  };

  // Create appointment
  const createAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:5002/api/appointments', appointmentData);
      setAppointments(prev => [...prev, data]);
      setLoading(false);
      toast.success('Appointment created successfully');
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating appointment');
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error creating appointment');
      return null;
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (id, status) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`http://localhost:5002/api/appointments/${id}/status`, { status });
      setAppointments(prev => prev.map(appt => appt._id === id ? data : appt));
      setLoading(false);
      toast.success('Appointment status updated');
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating appointment');
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error updating appointment');
      return null;
    }
  };

  // Delete appointment
  const deleteAppointment = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5002/api/appointments/${id}`);
      setAppointments(prev => prev.filter(appt => appt._id !== id));
      setLoading(false);
      toast.success('Appointment deleted successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting appointment');
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error deleting appointment');
    }
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      loading,
      error,
      getAppointments,
      createAppointment,
      updateAppointmentStatus,
      deleteAppointment
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);