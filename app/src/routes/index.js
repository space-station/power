const Router = require("koa-router");

const resources = require("./resources");
const role = require("./role");
const user = require("./user");
const log = require("./log");
const personal = require("./personal");
const fileParse = require("./fileParse");

const router = Router({
    prefix: '/manage'
});

const routes = [
    resources,
    role,
    user,
    log,
    personal,
    fileParse
];

for (route of routes) {
    router.use(route.routes(), route.allowedMethods());
}

module.exports = router;