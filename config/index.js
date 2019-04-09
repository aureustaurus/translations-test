const config = {};

config.production = {
  port: 5000,
};

config.development = {
  port: 5000,
};

const env = process.env.NODE_ENV || "development";

module.exports = config[env];
