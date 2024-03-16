import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('PUT in database');
const jateDb =  await openDB('jate', 1);
const tx = await jateDb.transaction(['jate'],'write');
const store = tx.objectStore('jate');
const request = store.put({id: 1, value: content });
const result = await request;
console.log('Data has been saved'    + result.value);
return result;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('GET from database')
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction ('jate',"readonly");
const store  = tx.objectStore("jate");
const request = store.get(1)
const result = await request;

result
? console.log('Data retrieved from the database', result.value)
: console.log('Data not found in the database');
};


initdb();
