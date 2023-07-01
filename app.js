const express = require("express");
const yaml = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const openAPIValidator = require("express-openapi-validator");
const apis = require("./controller/index.js");

const app = express();
const port = 3000;

const openAPIDocument = yaml.load("./api/openapi.yaml");

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openAPIDocument));

const routes = require("./routes/index");
app.use(routes);

app.use(
  openAPIValidator.middleware({
    apiSpec: "./api/openapi.yaml",
    validateResponses: true,
    operationHandlers: {
      resolver: modulePathResolver,
    },
  })
);

app.get("/", (req, res) => {
  res.json("blog-api");
});

app.listen(port, () => {
  console.log(port, "포트: 서버열림");
});
