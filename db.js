// IndexedDB storage: item records in "items", audio blobs in "audio" (keyed by item id).
const DB = (() => {
  let dbp;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      const req = indexedDB.open('voice-note', 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        db.createObjectStore('items', { keyPath: 'id' });
        db.createObjectStore('audio');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbp;
  }
  async function run(store, mode, fn) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, mode);
      const req = fn(tx.objectStore(store));
      tx.oncomplete = () => resolve(req && req.result);
      tx.onerror = () => reject(tx.error);
    });
  }
  return {
    allItems: () => run('items', 'readonly', s => s.getAll()),
    putItem: item => run('items', 'readwrite', s => s.put(item)),
    deleteItem: id => run('items', 'readwrite', s => s.delete(id)),
    getAudio: id => run('audio', 'readonly', s => s.get(id)),
    putAudio: (id, blob) => run('audio', 'readwrite', s => s.put(blob, id)),
    deleteAudio: id => run('audio', 'readwrite', s => s.delete(id)),
  };
})();
