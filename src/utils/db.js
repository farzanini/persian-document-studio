const DB_NAME = "PersianDocStudioCache";
const STORE_NAME = "assets";

/**
 * Opens and initializes the IndexedDB database.
 */
function getDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Retrieves a cached asset by key.
 */
export async function getCachedAsset(key) {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn("IndexedDB getCachedAsset failed, trying localStorage fallback:", e);
    try {
      return localStorage.getItem(`cache_${key}`) || null;
    } catch (localErr) {
      console.error("localStorage fallback failed:", localErr);
      return null;
    }
  }
}

/**
 * Stores an asset by key.
 */
export async function setCachedAsset(key, val) {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(val, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn("IndexedDB setCachedAsset failed, trying localStorage fallback:", e);
    try {
      localStorage.setItem(`cache_${key}`, val);
    } catch (localErr) {
      console.error("localStorage fallback failed (quota limit may have been exceeded):", localErr);
    }
  }
}

/**
 * Removes an asset by key.
 */
export async function removeCachedAsset(key) {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn("IndexedDB removeCachedAsset failed, trying localStorage fallback:", e);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (localErr) {
      console.error("localStorage fallback remove failed:", localErr);
    }
  }
}
