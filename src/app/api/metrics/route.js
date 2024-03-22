import { register, collectDefaultMetrics } from 'prom-client';

collectDefaultMetrics({ prefix: 'web_server_' });

export default async function handler(req, res) {
    res.setHeader('Content-type', register.contentType);
    res.setHeader('Cache-Control', 'no-store');
    res.send(await register.metrics());
}
