
import { Company, Contact } from '../types';
import { MOCK_COMPANIES, MOCK_CONTACTS } from '../data/mockData';

const NETWORK_DELAY = 300; // ms
const PERSIST_DELAY = 200; // ms

export const crmService = {
  /**
   * Simulates fetching all contacts.
   */
  fetchContacts(): Promise<Contact[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('CRM Service: Contacts fetched.');
        resolve([...MOCK_CONTACTS]);
      }, NETWORK_DELAY);
    });
  },

  /**
   * Simulates fetching all companies.
   */
  fetchCompanies(): Promise<Company[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('CRM Service: Companies fetched.');
        resolve([...MOCK_COMPANIES]);
      }, NETWORK_DELAY);
    });
  },

  /**
   * Simulates creating a new contact.
   */
  createContact(contactData: Omit<Contact, 'id'>): Promise<Contact> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newContact: Contact = {
          ...contactData,
          id: `ct${Date.now()}`, // Simulate ID generation
        };
        console.log(`CRM Service: New contact created: ${newContact.name}`);
        // Note: In a real app, you would add this to your mock data source
        // MOCK_CONTACTS.unshift(newContact);
        resolve(newContact);
      }, PERSIST_DELAY);
    });
  },
};
