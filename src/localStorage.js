export const loadState = () => {
  const localStorageData = localStorage.getItem('todoList');
  return localStorageData ? JSON.parse(localStorageData) : []
}; 

export const saveState = (state) => {
  localStorage.setItem('todoList', JSON.stringify(state));
};