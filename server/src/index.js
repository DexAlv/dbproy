import app from "./app.js";

app.listen(app.get("port"), () =>
  console.log("Server is listening on port:", app.get("port"))
);
