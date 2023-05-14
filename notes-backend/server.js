const app = require("./app");
const { port } = require("./configs/config");

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
