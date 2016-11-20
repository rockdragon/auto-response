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