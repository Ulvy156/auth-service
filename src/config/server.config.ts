export function getServerConfig() {
  return {
    ip: process.env.IP ?? 'localhost',
    port: parseInt(process.env.PORT ?? '3000'),
  };
}
