import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadPhoto } from '../utils/cloudinary.js';
import fs from 'node:fs/promises';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;
  const { data, ...paginationData } = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: { data, ...paginationData },
  });
};

export const getContactByIdController = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const userId = req.user._id;
  let photoUrl = null;

  if (req.file) {
    photoUrl = await uploadPhoto(req.file.path);
    await fs.unlink(req.file.path);
  }
  const contact = await createContact({ ...req.body, userId, photo: photoUrl });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const userId = req.user._id;
  let photoUrl = null;

  if (req.file) {
    photoUrl = await uploadPhoto(req.file.path);
    await fs.unlink(req.file.path);
  }

  const updatedData = { ...req.body };
  if (photoUrl) {
    updatedData.photo = photoUrl;
  }

  const result = await patchContact(req.params.contactId, userId, updatedData);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const userId = req.user._id;
  const result = await deleteContact(req.params.contactId, userId);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};
