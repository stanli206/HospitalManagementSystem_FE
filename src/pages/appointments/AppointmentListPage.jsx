import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppointments } from '../../context/AppointmentContext';
import { useAuth } from '../../context/AuthContext';

const AppointmentListPage = () => {
  const { appointments, loading, error, getAppointments, updateAppointmentStatus, deleteAppointment } = useAppointments();
  const { user } = useAuth();

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateAppointmentStatus(id, status);
    getAppointments();
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
        <Link
          to="/appointments/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Schedule New Appointment
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.patient?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {appointment.patient?.age} yrs, {appointment.patient?.gender}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.doctor?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {appointment.doctor?.specialization}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(appointment.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">{appointment.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{appointment.reason}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                    ${appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {user?.role === 'doctor' && appointment.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(appointment._id, 'completed')}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment._id, 'cancelled')}
                        className="text-red-600 hover:text-red-900 mr-2"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteAppointment(appointment._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentListPage;