const taskRoutes = require('./task.route');
const systemConfig = require("../../../config/system")
const authMiddleware = require("../middlewares/auth.middleware")
const userRoutes = require("./user.route")
module.exports = (app) => {
  const PATH_V1 = systemConfig.pathApi;
  app.use(PATH_V1 + '/tasks', authMiddleware.requireAuth, taskRoutes);
  app.use(PATH_V1 + '/user', userRoutes);
  
  
} 