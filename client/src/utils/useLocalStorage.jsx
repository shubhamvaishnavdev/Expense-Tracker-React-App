
//custom hook for storing and getting data to and from localstorage

import { useState, useEffect } from 'react';

//avoid conflict in loacal storage due to other app data
const PREFIX = 'expense-tracker'

export default function useLocalStorage(key, initialValue) {
    const preFixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const data = localStorage.getItem(preFixedKey);
        if (data != null) return JSON.parse(data);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(preFixedKey, JSON.stringify(value));
    }, [preFixedKey, value])
    return [value, setValue]
}
