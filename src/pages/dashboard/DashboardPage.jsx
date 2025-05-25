import { useEffect } from 'react';
import { usePatients } from '../../context/PatientContext';
import { useAppointments } from '../../context/AppointmentContext';

const DashboardPage = () => {
  const { patients, getPatients } = usePatients();
  const { appointments, getAppointments } = useAppointments();

  useEffect(() => {
    getPatients();
    getAppointments();
  }, []);

  const recentPatients = patients.slice(0, 5);
  const upcomingAppointments = appointments
    .filter(appt => appt.status === 'scheduled')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Patients */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{patients.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Appointments</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{appointments.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Appointments</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {upcomingAppointments.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Patients */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Patients</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentPatients.map((patient) => (
              <li key={patient._id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-indigo-600 truncate">
                      {patient.name}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {patient.age} yrs
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="text-sm text-gray-500 flex items-center">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28l1.498 4.493-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257 4.493 1.498V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                      </svg>
                      {patient.contactNumber}
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-gray-500 flex items-center">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 12a9 9 0 1112 0 9 9 0 01-12 0z" />
                      </svg>
                      {patient.gender}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Appointments</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {upcomingAppointments.map((appointment) => (
              <li key={appointment._id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-indigo-600 truncate">
                      {appointment.patient?.name || 'Unknown Patient'}
                    </div>
                    <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {appointment.time}
                    </span>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="text-sm text-gray-500 flex items-center">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m-3-4v4m0 8v4m4-4H8" />
                      </svg>
                      {appointment.doctor?.name || 'Doctor N/A'}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
