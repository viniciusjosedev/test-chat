const logging = () => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return true;
  }
  return false;
};

const config = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'database_development',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: logging(),
  migrationStorageTableName: process.env.DB_MIGRATION_NAME || 'SequelizeMeta',
};

module.exports = {
  production: config,
  test: config,
  development: config,
};
