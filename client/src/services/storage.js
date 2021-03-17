const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const clearStorage = () => {
    localStorage.clear();
}
const removeItem = (key) => {
    localStorage.removeItem(key);
}

export { getItem, setItem, removeItem, clearStorage }