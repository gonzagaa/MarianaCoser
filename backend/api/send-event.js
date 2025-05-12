const axios = require('axios');
const crypto = require('crypto');

function hashData(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

module.exports = async (req, res) => {
  // ✅ Cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://marianacoser.com.br');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

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
          value: value || 0,
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

    res.status(200).json({
      status: 'Evento enviado com sucesso',
      response: response.data,
    });
  } catch (error) {
    console.error('Erro ao enviar evento:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao enviar evento' });
  }
};
