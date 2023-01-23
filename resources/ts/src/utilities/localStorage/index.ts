import { TStorageItems } from "./types";

export const setItem = (data: { key: TStorageItems; value: any }): void => {
    if (typeof window !== "undefined") {
        localStorage?.setItem(data.key, data.value);
    }
};

export const getItem = (key: TStorageItems): string | null => {
    if (typeof window !== "undefined") {
        const data = localStorage?.getItem(key);

        return data;
    }

    return null;
};

export const removeItem = (key: TStorageItems): void => {
    if (typeof window !== "undefined") {
        localStorage?.removeItem(key);
    }
};

export const clearStorage = (): void => {
    if (typeof window !== "undefined") {
        localStorage?.clear();
    }
};
