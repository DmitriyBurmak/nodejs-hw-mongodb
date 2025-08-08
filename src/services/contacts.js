import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const newContact = await Contact.create(payload);
  return newContact;
};

export const patchContact = async (contactId, payload) => {
  const updatedContatct = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true },
  );
  return updatedContatct;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findOneAndDelete({ _id: contactId });
  return deletedContact;
};
