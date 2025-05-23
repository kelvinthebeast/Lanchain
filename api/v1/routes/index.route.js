const taskRoutes = require('./task.route');
const systemConfig = require("../../../config/system")

const userRoutes = require("./user.route")
module.exports = (app) => {
  const PATH_V1 = systemConfig.pathApi;
  app.use(PATH_V1 + '/tasks', taskRoutes);
  app.use(PATH_V1 + '/user', userRoutes);
  
  
} 