import Nightmare from 'nightmare'

const nightmare = new Nightmare(config.nightmare)

nightmare
  .goto(config.site.url)
  .viewport(1024, 768)
  .cookies.clearAll()
  .type('#username', config.site.user)
  .type('#password', config.site.password)
  .click('img[src*="images/login2/dl_1.jpg"]')
  .wait('#mainPanel')
  .evaluate(() => document.title)
  .then(title => print(`${title} => 加载完成`))
  .catch(err => error(err))

nightmare.on('page', (type, ...args) => {
  if (type === 'error') {
    error(args)
  } else if (type === 'alert') {
    print('alert')
  } else if (type === 'prompt') {
    print('prompt', args)
  } else if (type === 'confirm') {
    print('confirm', args)
  }
})

