import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatients } from '../../context/PatientContext';

const PatientFormPage = () => {
  const { createPatient, updatePatient, getPatientById } = usePatients();
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    contactNumber: '',
    address: '',
    bloodGroup: '',
    medicalHistory: ''
  });

  useEffect(() => {
    if (params.id) {
      const loadPatient = async () => {
        const patient = await getPatientById(params.id);
        setFormData({
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          contactNumber: patient.contactNumber,
          address: patient.address,
          bloodGroup: patient.bloodGroup,
          medicalHistory: patient.medicalHistory
        });
      };
      loadPatient();
    }
  }, [params.id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updatePatient(params.id, formData);
    } else {
      await createPatient(formData);
    }
    navigate('/patients');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {params.id ? 'Edit Patient' : 'Add New Patient'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              required
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <input
              type="text"
              name="bloodGroup"
              id="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
              Medical History
            </label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              rows={3}
              value={formData.medicalHistory}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientFormPage;