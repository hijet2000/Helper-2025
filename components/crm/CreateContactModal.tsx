
import React, { useState } from 'react';
import { useCrmStore } from '../../store/useCrmStore';
import { useAuth } from '../../hooks/useAuth';

interface CreateContactModalProps {
  onClose: () => void;
}

const CreateContactModal: React.FC<CreateContactModalProps> = ({ onClose }) => {
  const { companies, createContact, entityLabel } = useCrmStore();
  const { hasPermission } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState(companies[0]?.id || '');

  const canCreate = hasPermission('crm.create');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreate || !name || !email || !companyId) return;

    await createContact({ name, email, companyId });
    onClose();
  };

  if (!canCreate) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-xl font-bold mb-4 text-red-600">Permission Denied</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">You do not have permission to create contacts.</p>
            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Close
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Add New Contact</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="e.g., Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="e.g., jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{entityLabel}</label>
            <select
              id="contact-company"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            >
              <option value="" disabled>Select a {entityLabel.toLowerCase()}</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!name || !email || !companyId}
            >
              Create Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContactModal;