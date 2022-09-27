module.exports = () => {
  return ({ time = new Date(), message }) => {
    console.log(`${time}\t${message}`);
  };
};
