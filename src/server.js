require("express-async-errors");
const database = require("./database/sqlite");
const AppError = require("./utils/AppError");
const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = 3333;
const { setGlobalDateMasks } = require("fecha");
setGlobalDateMasks({
    dateTimeMask: 'YYYY-MM-DD HH:mm:ss'
});

app.use(express.json());
app.use(routes);

database();

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            "status": "error",
            "message": error.message
        });
    }

    return response.status(500).json({
        "status": "error",
        "message": "Internal server error"
    });
});
app.listen(PORT);
