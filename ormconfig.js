require('dotenv').config()

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/**/*.ts'],
  cli: {
    entitiesDir: 'src/**',
    migrationsDir: 'src/migration'
  }
}
