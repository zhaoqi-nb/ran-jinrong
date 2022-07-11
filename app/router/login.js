'use strict';

module.exports = app => {
    const verifyApi = app.middleware.verifyApi();

    //api
    app.router.post('/api/doLogin', app.controller.loginController.doLogin);
    app.router.get('/doLogout', app.controller.loginController.doLogout);
    app.router.post('/api/usermanager/resetPassword', verifyApi, app.controller.loginController.resetPassword);
}