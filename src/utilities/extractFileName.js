const extractFileName = (path) => {
  const brokenPath = path.split('/');
  return brokenPath[brokenPath.length - 1];
};

export default extractFileName;
