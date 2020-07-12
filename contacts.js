const fs = require("fs");
const path = require("path");

const contactsPath =
  path.dirname("./db/contacts.json") +
  "/" +
  path.basename("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;

    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;

    console.log(JSON.parse(data).filter((item) => item.id === contactId));
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;

    const changedContacts = new Uint8Array(
      Buffer.from(
        JSON.stringify(JSON.parse(data).filter((item) => item.id !== contactId))
      )
    );

    fs.writeFile(contactsPath, changedContacts, "utf8", (err) => {
      if (err) throw err;
      console.log("Contacts is removed!");
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const prevContacts = JSON.parse(data);

    const newContacts = new Uint8Array(
      Buffer.from(
        JSON.stringify([
          ...prevContacts,
          { id: prevContacts.length + 1, name, email, phone },
        ])
      )
    );

    fs.writeFile(contactsPath, newContacts, "utf8", (err) => {
      if (err) throw err;
      console.log("Contacts is added!");
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
