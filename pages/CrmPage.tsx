
import React, { useEffect, useState, useMemo } from 'react';
import { useCrmStore } from '../store/useCrmStore';
import { useAuth } from '../hooks/useAuth';
import CreateContactModal from '../components/crm/CreateContactModal';
import { Company, Contact } from '../types';

type CrmTab = 'Contacts' | 'Companies';

interface ContactListProps {
    entityLabel: string;
}

// --- Contact List Component ---
const ContactList: React.FC<ContactListProps> = ({ entityLabel }) => {
  const { contacts, companies } = useCrmStore();
  
  const companyMap = useMemo(() => 
    companies.reduce((acc, company) => {
      acc[company.id] = company.name;
      return acc;
    }, {} as Record<string, string>), 
  [companies]);

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {contacts.map((contact) => (
        <div key={contact.id} className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-shadow">
          <p className="font-semibold text-lg text-gray-800 dark:text-white">{contact.name}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">{contact.email}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {entityLabel}: {companyMap[contact.companyId] || 'Unknown'}
          </p>
        </div>
      ))}
    </div>
  );
};

// --- Company List Component ---
const CompanyList: React.FC = () => {
  const { companies } = useCrmStore();
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <div key={company.id} className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-green-500 dark:hover:border-green-500 transition-shadow">
          <p className="font-semibold text-lg text-gray-800 dark:text-white">{company.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{company.industry}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{company.city}</p>
        </div>
      ))}
    </div>
  );
};

const CrmLabelCustomizer: React.FC = () => {
    const { entityLabel, pluralEntityLabel, setEntityLabels } = useCrmStore();
    const [singular, setSingular] = useState(entityLabel);
    const [plural, setPlural] = useState(pluralEntityLabel);

    useEffect(() => {
        setSingular(entityLabel);
        setPlural(pluralEntityLabel);
    }, [entityLabel, pluralEntityLabel]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (singular.trim() && plural.trim()) {
            setEntityLabels(singular.trim(), plural.trim());
        }
    };

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700 mt-6 mb-4">
            <h4 className="font-semibold text-md mb-2">Customize Labels</h4>
            <form onSubmit={handleSave} className="flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1 w-full">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Singular</label>
                    <input 
                        type="text"
                        value={singular}
                        onChange={(e) => setSingular(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-sm"
                        placeholder="e.g., Client"
                    />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Plural</label>
                    <input 
                        type="text"
                        value={plural}
                        onChange={(e) => setPlural(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-sm"
                        placeholder="e.g., Clients"
                    />
                </div>
                <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">Save Labels</button>
            </form>
        </div>
    )
}


// --- Main CRM Page Component ---
const CrmPage: React.FC = () => {
  const { loading, error, fetchCrmData, entityLabel, pluralEntityLabel } = useCrmStore();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<CrmTab>('Contacts');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canCreateContact = hasPermission('crm.create');

  useEffect(() => {
    fetchCrmData();
  }, [fetchCrmData]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="flex items-center space-x-2 text-blue-500">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading CRM Data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">CRM Dashboard</h1>
        {canCreateContact && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add Contact</span>
          </button>
        )}
      </div>
      
      <CrmLabelCustomizer />

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('Contacts')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Contacts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-200 dark:hover:border-gray-600'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('Companies')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Companies'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-200 dark:hover:border-gray-600'
            }`}
          >
            {pluralEntityLabel}
          </button>
        </nav>
      </div>

      <div className="flex-1 mt-4 overflow-y-auto">
        {activeTab === 'Contacts' && <ContactList entityLabel={entityLabel} />}
        {activeTab === 'Companies' && <CompanyList />}
      </div>

      {isModalOpen && (
        <CreateContactModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CrmPage;