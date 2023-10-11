const getCurrentTime = () => {
  return Date.now();
};

const getPath = (target) => {
  return target?.foo?.bar?.wad?.awa;
};

export default {
  getCurrentTime,
  getPath,
};
