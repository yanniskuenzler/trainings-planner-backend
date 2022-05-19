const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const helloRoutes = require("./routes/HelloWorld");
app.use("/hello", helloRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});