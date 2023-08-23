const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db2.sqlite', // using 2 to preserve db from course
      entities: ['**/*.entities.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test2.sqlite', // using 2 to preserve db from course
      entities: ['**/*.entities.ts'],
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL, // set by heroku
      migrationsRun: true,
      entities: ['**/*.entities.ts'],
      ssl: {
        rejectUnautharized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
