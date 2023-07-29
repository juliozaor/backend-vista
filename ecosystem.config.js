module.exports = {
    deploy : {
      production : {
        user : 'root',
        host : 'supertransporte_backend_vista_prod',
        ref  : 'origin/main',
        repo : 'https://github.com/juliozaor/backend-vista-vigia',
        path : '/var/pesvsisi/backend_vista',
        'post-deploy': 'npm install && npm run build && cp .env build/.env && cd build && npm ci --production && pm2 restart backend_vista',
      }
    }
  };
  