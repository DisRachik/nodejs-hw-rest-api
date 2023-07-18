const fs = require('fs/promises');
const path = require('path');
// const { nanoid } = require('nanoid');
const generateID = async () => {
  const { nanoid } = await import('nanoid');

  return nanoid();
};

const filePath = path.join(__dirname, 'contacts.json');

const changeContacts = (contacts) => fs.writeFile(filePath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(filePath);

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contactId === contact.id);

  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await changeContacts(contacts);

  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: await generateID(),
    ...body,
  };
  contacts.push(newContact);
  await changeContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { contactId, ...body };
  await changeContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
