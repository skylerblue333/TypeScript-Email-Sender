import express from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Transactional email sending service with template support

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  template: z.string().optional()
});

const sentEmails: any[] = [];

app.post('/api/v1/send', (req, res) => {
  try {
    const email = emailSchema.parse(req.body);
    const messageId = `msg-${Date.now()}`;
    sentEmails.push({ ...email, messageId, sentAt: new Date().toISOString() });
    res.json({ status: 'sent', message_id: messageId, to: email.to });
  } catch (e) {
    res.status(400).json({ error: 'Invalid email payload' });
  }
});


app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'TypeScript-Email-Sender', version: '3.0.0' });
});

if (require.main === module) {
  app.listen(8080, () => console.log('TypeScript-Email-Sender running on :8080'));
}

export default app;
