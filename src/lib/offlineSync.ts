import { Task } from '@/types';

const DB_NAME = 'AurtisticOfflineDB';
const DB_VERSION = 1;
const TASKS_STORE = 'tasksCache';
const MUTATIONS_STORE = 'mutationsQueue';

export type MutationType = 'create' | 'update' | 'delete';

export interface MutationAction {
  id: string; // unique mutation id
  type: MutationType;
  taskId: string;
  payload?: any;
  timestamp: number;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(TASKS_STORE)) {
        db.createObjectStore(TASKS_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(MUTATIONS_STORE)) {
        db.createObjectStore(MUTATIONS_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: any) => resolve(event.target.result);
    request.onerror = (event: any) => reject(event.target.error);
  });
};

// --- Tasks Cache ---
export const saveTasksToCache = async (tasks: Task[]) => {
  if (typeof window === 'undefined') return;
  const db = await openDB();
  const tx = db.transaction(TASKS_STORE, 'readwrite');
  const store = tx.objectStore(TASKS_STORE);
  
  tasks.forEach(task => store.put(task));
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

export const getTasksFromCache = async (): Promise<Task[]> => {
  if (typeof window === 'undefined') return [];
  const db = await openDB();
  const tx = db.transaction(TASKS_STORE, 'readonly');
  const store = tx.objectStore(TASKS_STORE);
  const request = store.getAll();
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// --- Mutations Queue ---
export const pushMutation = async (action: Omit<MutationAction, 'id' | 'timestamp'>) => {
  if (typeof window === 'undefined') return;
  const db = await openDB();
  const tx = db.transaction(MUTATIONS_STORE, 'readwrite');
  const store = tx.objectStore(MUTATIONS_STORE);
  
  const mutation: MutationAction = {
    ...action,
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    timestamp: Date.now()
  };
  
  store.put(mutation);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(mutation);
    tx.onerror = () => reject(tx.error);
  });
};

export const getMutations = async (): Promise<MutationAction[]> => {
  if (typeof window === 'undefined') return [];
  const db = await openDB();
  const tx = db.transaction(MUTATIONS_STORE, 'readonly');
  const store = tx.objectStore(MUTATIONS_STORE);
  const request = store.getAll();
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      // Sort by timestamp
      const results = request.result.sort((a: MutationAction, b: MutationAction) => a.timestamp - b.timestamp);
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
};

export const removeMutation = async (id: string) => {
  if (typeof window === 'undefined') return;
  const db = await openDB();
  const tx = db.transaction(MUTATIONS_STORE, 'readwrite');
  const store = tx.objectStore(MUTATIONS_STORE);
  store.delete(id);
  
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};
