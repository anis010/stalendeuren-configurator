module.exports = {
  apps: [{
    name: 'proinn-configurator',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3002',
    cwd: '/home/anisy/projects/stalendeuren',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3002
    }
  }]
};
