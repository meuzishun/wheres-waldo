const formatTime = (ms) => {
  return new Date(ms).toISOString().slice(11, -1);
};

export default formatTime;
