# OpenFlights API

API REST para buscar dados de companhias aéreas usando dados gratuitos do OpenFlights.

## 🚀 Funcionalidades

- **Dados atualizados**: Busca dados diretamente do repositório OpenFlights no GitHub
- **Cache inteligente**: Cache de 6 horas para reduzir requisições
- **Filtros automáticos**: Apenas companhias com código IATA válido e ativas
- **CORS habilitado**: Pronto para uso em frontend
- **Endpoints REST**: API simples e fácil de usar

## 📊 Endpoints

### GET /api/health
Health check da API
```json
{
  "success": true,
  "message": "API funcionando",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/airlines
Lista todas as companhias aéreas
```json
{
  "success": true,
  "count": 1012,
  "data": [
    {
      "name": "American Airlines",
      "iata": "AA",
      "country": "United States"
    }
  ]
}
```

### GET /api/airlines/:iata
Busca companhia por código IATA
```json
{
  "success": true,
  "data": {
    "name": "American Airlines",
    "iata": "AA",
    "country": "United States"
  }
}
```

## 🛠️ Instalação e Uso

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar servidor**:
   ```bash
   npm start
   # ou para desenvolvimento
   npm run dev
   ```

3. **Acessar API**:
   - Servidor: `http://localhost:3001`
   - Health check: `http://localhost:3001/api/health`
   - Companhias: `http://localhost:3001/api/airlines`

## 🔧 Configuração

- **Porta**: `3001` (configurável via `PORT`)
- **Cache**: 6 horas (configurável)
- **Fonte de dados**: [OpenFlights Airlines Data](https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat)

## 📝 Filtros Aplicados

- ✅ Código IATA válido (2 caracteres)
- ✅ Companhias ativas (`active = 'Y'`)
- ✅ Nome válido (não nulo)
- ✅ Ordenação alfabética por nome

## 🌐 Uso no Frontend

```javascript
// Carregar todas as companhias
const response = await fetch('http://localhost:3001/api/airlines');
const data = await response.json();

if (data.success) {
  data.data.forEach(airline => {
    console.log(`${airline.name} (${airline.iata}) - ${airline.country}`);
  });
}
```

## 📈 Performance

- **Cache**: Dados ficam em cache por 6 horas
- **Filtros**: Apenas dados relevantes são processados
- **Streaming**: Processamento em streaming para grandes volumes
- **CORS**: Configurado para uso em frontend

## 🔒 Segurança

- Validação de entrada
- Tratamento de erros
- Headers de segurança
- Rate limiting (recomendado para produção)

## 📦 Dependências

- `express`: Servidor HTTP
- `csv-parser`: Parser de CSV
- `node-cache`: Cache em memória
- `cors`: Middleware CORS
- `https`: Módulo nativo para requisições

## 🚀 Deploy

A API pode ser deployada em qualquer plataforma que suporte Node.js:
- Heroku
- Vercel
- Railway
- DigitalOcean
- AWS

## 📄 Licença

ISC - Dados do OpenFlights são de domínio público.
