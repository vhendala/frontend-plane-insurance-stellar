const express = require('express');
const csvParser = require('csv-parser');
const NodeCache = require('node-cache');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_URL = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat';
const cache = new NodeCache({ stdTTL: 60 * 60 * 6 }); // cache de 6 horas

// Middleware
app.use(cors());
app.use(express.json());

// Função que busca e parseia o CSV, retornando só companhias com IATA válido
async function fetchAirlines() {
  // Tenta ler do cache
  const cached = cache.get('airlines');
  if (cached) return cached;

  console.log('Baixando dados do OpenFlights...');
  
  return new Promise((resolve, reject) => {
    const list = [];
    
    https.get(DATA_URL, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Erro ao baixar dados: ${res.statusCode}`));
        return;
      }
      
      res
        .pipe(csvParser({
          headers: ['id','name','alias','iata','icao','callsign','country','active'],
          separator: ','
        }))
        .on('data', row => {
          // Filtra apenas companhias com código IATA válido e ativas
          if (row.iata && 
              row.iata !== '\\N' && 
              row.iata.length === 2 && 
              row.active === 'Y' &&
              row.name && 
              row.name !== '\\N') {
            list.push({
              name: row.name.trim(),
              iata: row.iata.trim().toUpperCase(),
              country: row.country && row.country !== '\\N' ? row.country.trim() : 'Unknown'
            });
          }
        })
        .on('end', () => {
          console.log(`Processadas ${list.length} companhias aéreas`);
          cache.set('airlines', list);
          resolve(list);
        })
        .on('error', reject);
    }).on('error', reject);
  });
}

// Endpoint para buscar companhias aéreas
app.get('/api/airlines', async (req, res) => {
  try {
    const airlines = await fetchAirlines();
    res.json({
      success: true,
      count: airlines.length,
      data: airlines
    });
  } catch (err) {
    console.error('Erro ao buscar companhias aéreas:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// Endpoint de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Endpoint para buscar companhia por código IATA
app.get('/api/airlines/:iata', async (req, res) => {
  try {
    const { iata } = req.params;
    const airlines = await fetchAirlines();
    const airline = airlines.find(a => a.iata === iata.toUpperCase());
    
    if (!airline) {
      return res.status(404).json({
        success: false,
        error: 'Companhia aérea não encontrada'
      });
    }
    
    res.json({
      success: true,
      data: airline
    });
  } catch (err) {
    console.error('Erro ao buscar companhia:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor OpenFlights API rodando em http://localhost:${PORT}`);
  console.log(`📊 Endpoints disponíveis:`);
  console.log(`   GET /api/health - Health check`);
  console.log(`   GET /api/airlines - Lista todas as companhias`);
  console.log(`   GET /api/airlines/:iata - Busca por código IATA`);
});
