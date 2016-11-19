module.exports = {
  env: 'development',
  site: {},
  nightmare: {
    openDevTools: {
      mode: 'bottom', // right, bottom, undocked, detach
    },
    show: true,
    dock: true,
    waitTimeout: 60000,
    executionTimeout: 86400000,
  },
}