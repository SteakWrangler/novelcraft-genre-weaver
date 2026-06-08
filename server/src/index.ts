import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import booksRouter from './routes/books.js';
import jobsRouter from './routes/jobs.js';
import seriesRouter from './routes/series.js';
import testRouter from './routes/test.js';
import { getOllamaClient } from './llm/ollama-client.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/books', booksRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/series', seriesRouter);
app.use('/api/test', testRouter);

// Health check
app.get('/api/health', async (_req, res) => {
  const ollamaReachable = await getOllamaClient().ping();
  res.json({
    status: 'ok',
    ollamaConnected: ollamaReachable,
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(config.port, config.host, () => {
  console.log(`\n  NovelCraft Server running at http://${config.host}:${config.port}`);
  console.log(`  Ollama API: ${config.ollama.baseUrl}`);
  console.log(`  API key: ${config.ollama.apiKey ? '***configured***' : 'NOT SET'}\n`);
});
