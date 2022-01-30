export default (...args) =>
  import('../webhook/dist/serverless').then((fn) => {
    fn.default(...args);
  });
