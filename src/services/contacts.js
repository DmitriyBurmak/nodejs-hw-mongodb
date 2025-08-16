import { Contact } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  const [contactsCount, contacts] = await Promise.all([
    Contact.countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
