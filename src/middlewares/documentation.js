const router = require('express').Router();
const YAML = require("yamljs");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load(process.env.SWAGGER_YAML_FILE)

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;