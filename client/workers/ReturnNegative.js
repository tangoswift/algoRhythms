export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    try {
      const input = [0, 1, -1, 10, -10]
      const output = [0, -1, -1, -10, -10]

      let code = e.data
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)
      let fn = new Function('arr', bodyCode + '')
      /**
       * Compute the input and store in returnArr
       */
      const returnArr = fn(input)

      const results = []

      returnArr.forEach((num, index) => {
        //Check if input matches output after calling the fn
        let correct = num === output[index]
        let res = `Expected ${num} to equal ${output[index]}: ${correct}`
        results[index] = res
      })

      postMessage(results)
    } catch (error) {
      postMessage([error.message])
    }
  })
}
