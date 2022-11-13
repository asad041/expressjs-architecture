const { BadRequestError } = require('./api-error.js');

const provider = (model) => {
  return {
    addOne: async (data) => await model.create(data),

    findById: async (id, select = '-none') => await model.findById(id, select),

    findOne: async (condition, select = '-none', sort = { _id: -1 }) =>
      await model.findOne(condition, select).sort({ ...sort }),

    find: async (condition, select = '-none') =>
      await model.find(condition, select),

    updateOne: async (condition, update, select = '-none') =>
      await model.findOneAndUpdate(condition, update, {
        new: true,
        runValidators: true,
        select,
      }),

    deleteOne: async (condition) => await model.findOneAndDelete(condition),

    deleteMany: async (condition) => await model.deleteMany(condition),

    runAggregate: async (aggregateArry) => await model.aggregate(aggregateArry),

    badRequestError: (message = 'Bad request') => {
      throw new BadRequestError(message);
    },
  };
};

module.exports = provider;
