const db_config = {
    host: process.env.DB_HOST || 'mysql-container',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cyber_school',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    pool: { 
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
};

module.exports = db_config;