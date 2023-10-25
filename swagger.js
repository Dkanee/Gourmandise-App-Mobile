const swaggerAutogen = require('swagger-autogen');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API GourmandiseSARL",
            description: "API pour l'entreprise GourmandiseSARL, application client.",
            version: "1.0.0"
        },
    },
    apis: ["endpoints.js"]
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./endpoints.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, swaggerOptions);