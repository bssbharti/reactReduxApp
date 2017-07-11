module.exports = function(app, express) {
      let router = express.Router();
      let routeObj = require(APP_PATH + '/server/api/controller/AuthController.js');
      let userAuth =  require(APP_PATH + '/server/api/middlewares/user_token.js');
     router.post('/auth/register', routeObj.register);
     router.post('/auth/login',routeObj.login);
     router.get('/user/list',routeObj.userList);
     router.get('/user/delete',routeObj.deleteUser);
     router.get('/user/profile',routeObj.userProfile);
     router.post('/user/update',routeObj.updateProfile);
     app.use('/api', router);
}
