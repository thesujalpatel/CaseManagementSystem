const config = require("../../config.json");
exports.config = (req, res) => {
  res.send(config);
};