const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const trainingRoutes = require("./routes/Training");
app.use("/", trainingRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});