export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    try {
      let code = e.data.code
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)
      let fn = new Function('arr', 'target', bodyCode + '')
      let res = fn([2, 4, 5, 11, 8, 7, 0, 9], 10)
      postMessage(res)
    } catch (error) {
      postMessage(error.message)
    }
  })
}
