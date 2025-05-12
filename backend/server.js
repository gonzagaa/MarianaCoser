const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

function hashData(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

app.post('/send-event', async (req, res) => {
  const {
    event_name,
    event_time,
    fbp,
    fbc,
    email,
    phone,
    value,
    currency,
    ip,
    user_agent,
    source_url,
  } = req.body;

  const hashedEmail = email ? hashData(email.trim().toLowerCase()) : undefined;
  const hashedPhone = phone ? hashData(phone.replace(/\D/g, '')) : undefined;

  const payload = {
    data: [
      {
        event_name,
        event_time: event_time || Math.floor(Date.now() / 1000),
        event_source_url: source_url || '',
        user_data: {
          client_ip_address: ip || '',
          client_user_agent: user_agent || '',
          fbp,
          fbc,
          em: hashedEmail ? [hashedEmail] : undefined,
          ph: hashedPhone ? [hashedPhone] : undefined,
        },
        custom_data: {
          value: value || 0.00,
          currency: currency || 'BRL',
        },
        action_source: 'website',
      },
    ],
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.FACEBOOK_PIXEL_ID}/events`,
      payload
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao enviar evento:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao enviar evento' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
