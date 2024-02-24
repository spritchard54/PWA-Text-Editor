import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

// Homework review mentioned that all the steps for these methods have been shown in class.

export const putDb = async (id, content) => {
  console.error("putDb not implemented");

  // Database Connection
  const jdb = await openDB("jate", 1);

  // Database read/write transaction
  const transact = jdb.transaction("jate", "readwrite");

  // Open the object store
  const storeData = transact.objectStore("jate");

  // Update content
  const requestData = storeData.put({ id: id, value: content });
  const result = await requestData;
  console.log("Database updated", result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error("getDb not implemented");

  // Connect to the DB
  const jdb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const transact = jdb.transaction("jate", "readonly");
  // Open up the desired object store.
  const storeData = transact.objectStore("jate");
  // Request data from object store; Use the .getAll() method to get all data in the database.
  const requestData = storeData.getAll();
  // Return the results of the request / get confirmation.
  const result = await requestData;
  return result?.value;
};

// Start the database.
initdb();
