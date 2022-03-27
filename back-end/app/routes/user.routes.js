const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // admin APIs
    app.get(
        "/api/admin/pending",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getPendingRequests
    );
    app.post(
        "/api/admin/acceptRequest",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.acceptRequest
    );
    app.post(
        "/api/admin/rejectRequest",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.rejectRequest
    );
    app.post(
        "/api/admin/getAllProjects",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getAllProjects
    );
    app.post(
        "/api/admin/createProject",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.createProject
    );
    
    
    // TEST APIs
    app.get("/api/test/all", controller.allAccess);
    app.get(
        "/api/test/employee",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.employeeBoard
    );
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};