import express from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import accountsRouter from "@/api/routes/accounts.route";
import { errorMiddleware } from "./api/middleware/error.middleware";

const app = express();
const port = process.env.PORT || 3000;

// Body Parser
app.use(express.json());

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Express.js API",
      version: "1.0.0",
      description: "A sample Express.js API built with TypeScript and Swagger",
    },
  },
  apis: ["./src/api/routes/*.ts"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs", serve, setup(swaggerDocs));

// Routes
app.use("/api/accounts", accountsRouter);

// Middleware
app.use(errorMiddleware);

app.listen(port, () =>
  console.log(`Listening on port ${port} - http://localhost:${port}`)
);
