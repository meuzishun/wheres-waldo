const timer = (() => {
  let startTime;
  let endTime;

  const start = () => {
    startTime = Date.now();
    endTime = undefined;
  };

  const stop = () => {
    endTime = Date.now();
  };

  const getTotalTime = () => {
    return `${(endTime - startTime) / 1000} seconds`;
  };

  return {
    start,
    stop,
    getTotalTime,
  };
})();

export default timer;
