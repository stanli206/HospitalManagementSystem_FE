import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../context/AppointmentContext';
import { usePatients } from '../../context/PatientContext';
import { useAuth } from '../../context/AuthContext';

const AppointmentFormPage = () => {
  const { createAppointment } = useAppointments();
  const { patients, getPatients } = usePatients();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: user?._id || '',
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    getPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAppointment(formData);
    navigate('/appointments');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule New Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
              Patient
            </label>
            <select
              id="patientId"
              name="patientId"
              required
              value={formData.patientId}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name} ({patient.age} yrs, {patient.gender})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={3}
              required
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/appointments')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentFormPage;