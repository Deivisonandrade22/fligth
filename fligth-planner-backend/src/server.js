import app from './app.js';

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});

