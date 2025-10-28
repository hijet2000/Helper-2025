

import { create } from 'zustand';
import { Company, Contact } from '../types';
import { crmService } from '../services/crmService';

interface CrmState {
  contacts: Contact[];
  companies: Company[];
  loading: boolean;
  error: string | null;
  entityLabel: string;
  pluralEntityLabel: string;
  fetchCrmData: () => Promise<void>;
  createContact: (contactData: Omit<Contact, 'id'>) => Promise<void>;
  setEntityLabels: (singular: string, plural: string) => void;
}

export const useCrmStore = create<CrmState>((set, get) => ({
  contacts: [],
  companies: [],
  loading: false,
  error: null,
  entityLabel: 'Company',
  pluralEntityLabel: 'Companies',

  fetchCrmData: async () => {
    // Prevent duplicate fetches if data exists or is already loading
    if (get().contacts.length > 0 || get().loading) {
        return;
    };
    set({ loading: true, error: null });
    try {
      // Fetch both contacts and companies concurrently for efficiency
      const [contacts, companies] = await Promise.all([
        crmService.fetchContacts(),
        crmService.fetchCompanies(),
      ]);
      set({ contacts, companies, loading: false });
      console.log('CrmStore: Both Contacts and Companies loaded.');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch CRM data';
      set({ error: errorMessage, loading: false });
      console.error(err);
    }
  },

  createContact: async (contactData) => {
    try {
      const newContact = await crmService.createContact(contactData);
      // Optimistically prepend the new contact to the state for immediate UI feedback
      set((state) => ({
        contacts: [newContact, ...state.contacts],
      }));
    } catch (error) {
      console.error('Error creating contact:', error);
      // In a real app, you might set an error state here
    }
  },
  
  setEntityLabels: (singular, plural) => {
    set({ entityLabel: singular, pluralEntityLabel: plural });
  }
}));