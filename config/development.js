module.exports = {
  env: 'development',
  site: {
    url: 'http://113.106.90.226:9008/index.html',
    user: 'yt123',
    password: 'mb778',
  },
  nightmare: {
    openDevTools: {
      mode: 'detach',
    },
    show: true,
  },
}