import { useEffect, useMemo, useState } from "react";
import z from "zod";

type DbEvent = IDBRequest<IDBDatabase>;
type CursorEvent = IDBRequest<IDBCursorWithValue>;

type IndexDbData = {
    name: string; // actual name of field
    data: string | File; // actual data
};

class IndexDB {
    static readonly version = 1;
    static readonly keyPath = "name";

    db?: IDBDatabase;
    formName: string;

    constructor(formName: string) {
        this.formName = formName;
    }

    private initDB(dbName: string) {
        return new Promise<IDBDatabase>((res, rej) => {
            if (this.db) {
                res(this.db);
                return;
            }

            const request = indexedDB.open(dbName, IndexDB.version);
            request.onerror = (event) => {
                rej((event.target as DbEvent).error);
            };
            request.onsuccess = (event) => {
                res((event.target as DbEvent).result);
            };
            request.onupgradeneeded = (event) => {
                const objectStore = (
                    event.target as DbEvent
                ).result.createObjectStore(dbName, {
                    keyPath: IndexDB.keyPath,
                });

                objectStore.createIndex(IndexDB.keyPath, IndexDB.keyPath, {
                    unique: true,
                });
            };
        });
    }

    getData(name: string) {
        return new Promise<IndexDbData | null>(async (res) => {
            const db: IDBDatabase = await this.initDB(this.formName);

            const store = db
                .transaction(this.formName, "readonly")
                .objectStore(this.formName);

            store.openCursor().onsuccess = (event) => {
                const cursor = (event.target as CursorEvent).result;

                if (cursor) {
                    if (cursor.value[IndexDB.keyPath] === name) {
                        res(cursor.value);
                        return;
                    }
                    cursor.continue();
                } else {
                    res(null);
                }
            };
        });
    }

    getAllData() {
        return new Promise<IndexDbData[] | []>(async (res) => {
            const data: IndexDbData[] = [];

            const db: IDBDatabase = await this.initDB(this.formName);

            const store = db
                .transaction(this.formName, "readonly")
                .objectStore(this.formName);

            store.openCursor().onsuccess = (event) => {
                const cursor = (event.target as CursorEvent).result;

                if (cursor) {
                    data.push(cursor.value);
                    cursor.continue();
                } else {
                    res(data);
                    return;
                }
            };
        });
    }

    setData(name: string, data: string | File) {
        return new Promise<boolean>(async (res) => {
            const db: IDBDatabase = await this.initDB(this.formName);

            const store = db
                .transaction(this.formName, "readwrite")
                .objectStore(this.formName);

            store.put({ name, data });

            store.transaction.oncomplete = () => res(true);
            store.transaction.onerror = () => res(false);
        });
    }

    deleteData(name: string) {
        return new Promise<boolean>(async (res) => {
            const db: IDBDatabase = await this.initDB(this.formName);

            const store = db
                .transaction(this.formName, "readwrite")
                .objectStore(this.formName);

            store.delete(name);

            store.transaction.oncomplete = () => res(true);
            store.transaction.onerror = () => res(false);
        });
    }

    deleteAllData() {
        return new Promise<boolean>(async (res) => {
            const db: IDBDatabase = await this.initDB(this.formName);

            const store = db
                .transaction(this.formName, "readwrite")
                .objectStore(this.formName);

            store.openCursor().onsuccess = (event) => {
                const cursor = (event.target as CursorEvent).result;

                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                } else {
                    res(true);
                    return;
                }
            };
        });
    }
}

export function useData<T>(validator: z.ZodType, formName: string) {
    const [data, setData] = useState<T | object>({});
    const [display, setDisplay] = useState<{ [key: string]: string | File }>(
        {}
    );

    const indexDB = useMemo(() => new IndexDB(formName), [formName]);

    useEffect(() => {
        indexDB.getAllData().then((val) => {
            const rows: { [key: string]: string | File } = {};

            for (const { name, data } of val) {
                rows[name] = data;
            }

            setData(rows);
            setDisplay(rows);
        });
    }, []);

    const handleChange = (
        name: string,
        value: string | File,
        actionType: "add" | "delete"
    ) => {
        setData((prev) => {
            const newData = {
                ...prev,
            };

            if (actionType === "add") {
                newData[name] = value;
                indexDB.setData(name, value);
            } else {
                delete newData[name];
                indexDB.deleteData(name);
            }

            return newData;
        });

        setDisplay((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getData = (): T | null => {
        const response = validator.safeParse(data);
        console.log(response.error);
        return response.success ? (response.data as T) : null;
    };

    const clearData = () => {
        indexDB.deleteAllData();
    };

    return {
        getData,
        display,
        handleChange,
        setData,
        clearData,
        data,
    };
}
