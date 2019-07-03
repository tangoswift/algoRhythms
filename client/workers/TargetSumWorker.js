export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    try {
      const input = [
        [[1, 5, 3, 4, 6, 7, 12, 31], 19],
        [[2, 6, 3, 4, 20, 11, 22, 43], 31],
        [[3, 9, 4, 5], 8]
      ]
      const output = [[7, 12], [20, 11], [3, 5]]

      let code = e.data
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)
      let fn = new Function('arr', 'target', bodyCode + '')

      const results = []
      input.forEach((arr, index) => {
        //Check if input matches output after calling the fn
        let targetArr = fn(arr[0], arr[1])
        let correct =
          targetArr[0] === output[index][0] && targetArr[1] === output[index][1]

        let res = `Expected ${arr[0]} to equal ${output[index]}: ${correct}`
        results[index] = res
      })

      postMessage(results)
    } catch (error) {
      postMessage([error.message])
    }
  })
}
