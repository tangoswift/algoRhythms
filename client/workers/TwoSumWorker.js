export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    try {
      let code = e.data.code
      console.log('E is', e)
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)
      let fn = new Function('a', 'b', bodyCode + '')
      let res = fn(1, 5)
      if (res === 6) postMessage('Thats Right!')
      else postMessage('Thats Wrong ... try again')
    } catch (error) {
      postMessage(error.message)
    }
  })
}
