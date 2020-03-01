const router = require('express').Router();

module.exports = {
    baseRoutes: function () {
        const routesMap = {
            auth: {
                path: "/",
                source: require('./auth')
            },
            area: {
                path: "/area",
                source: require('./area')
            }
        };
        Object.keys(routesMap).forEach(route => {
            router.use(routesMap[route].path, routesMap[route].source)
        });

        return router
    }

}