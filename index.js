const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const trainingRoutes = require("./routes/Training");
app.use("/", trainingRoutes);

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});