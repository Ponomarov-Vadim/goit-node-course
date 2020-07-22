const { isEqual, throwErr } = require("../helpers");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = `${path.dirname(
  "../goit-node-course/db/contacts.json"
)}/contacts.json`;

const getContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const setContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");
};

const user = {
  get: async (data) => {
    const id = parseInt(data.params.id, 10);

    const users = await getContacts();

    const user = users.find((user) => isEqual(user.id, id));

    if (!user) throwErr(404, "Not found");

    return { status: 200, user };
  },

  getAll: async () => ({ status: 200, users: await getContacts() }),

  create: async (data) => {
    const { name, email, phone } = data;

    if (name === undefined || email === undefined || phone === undefined) {
      throwErr(400, "Missing required name field");
    }

    const users = await getContacts();

    users.push({ id: users.length + 1, name, email, phone });

    setContacts(users);

    return { status: 201, user: { id: users.length, name, email, phone } };
  },

  update: async (data) => {
    const id = parseInt(data.params.id, 10);
    const { name, email, phone } = data;

    if (name === undefined || email === undefined || phone === undefined) {
      throwErr(400, "Missing fields");
    }
    const users = await getContacts();

    const userId = users.findIndex((user) => isEqual(user.id, id));

    if (!users[userId]) throwErr(404, "Not found");

    users[userId] = { id, name, email, phone };

    setContacts(users);

    return { status: 200, user: users[userId] };
  },

  delete: async (data) => {
    const id = parseInt(data.params.id, 10);

    const users = await getContacts();

    const userId = users.findIndex((user) => isEqual(user.id, id));

    if (!users[userId]) throwErr(404, "Not found");

    users.splice(userId, 1);

    setContacts(users);

    return { status: 200, message: "Contact deleted" };
  },
};

module.exports = user;
