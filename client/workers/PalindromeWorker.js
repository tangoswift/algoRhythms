export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    try {
      const input = ['cat', 'maddam', '1001', 'true', 'abddba']
      const output = [false, true, true, false, true]
      const code = e.data
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)
      let fn = new Function('a', bodyCode + '')

      const results = []
      input.forEach((arr, index) => {
        //Check if input matches output after calling the fn
        let palindrome = fn(arr[0])
        let correct = palindrome === output[index]
        let res = `Expected ${arr} to equal ${output[index]}: ${correct}`
        results[index] = res
      })
      postMessage(results)
    } catch (error) {
      postMessage([error.message])
    }
  })
}
