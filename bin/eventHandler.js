export function pageEventHandler (type, ...args){
  if (type === 'error') {
    error(args)
  } else if (type === 'alert') {
    print('alert')
  } else if (type === 'prompt') {
    print('prompt', args)
  } else if (type === 'confirm') {
    print('confirm', args)
  }
}

export function willNavigateHandler(event, url) {
  print('will navigate:', event, url)
}

export function errorHandler(nightmare, ...err) {
  printWithTime('fatal', err)
  nightmare.unbind('custom-event')
  nightmare.end().then(() => {
    process.exit(1)
  })
}
