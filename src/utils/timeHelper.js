const getTodaysDateAndTime = () => {
  return {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };
};

export { getTodaysDateAndTime };
