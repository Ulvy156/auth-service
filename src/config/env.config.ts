export const envConfig = () => ({
  database: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:your-password@localhost:5432/hr_db?schema=public',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-jwt-secret',
  },
  kafka: {
    brokers: process.env.KAFKA_BROKERS || 'localhost:9092',
  },
});
