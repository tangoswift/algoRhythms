export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    try {
      const input = [[1, 5], [2, 6], [3, 9], [100, 101]]
      const output = [6, 8, 12, 201]

      const code = e.data
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)
      let fn = new Function('a', 'b', bodyCode + '')

      const results = []
      input.forEach((arr, index) => {
        //Check if input matches output after calling the fn
        let sum = fn(arr[0], arr[1])
        let correct = sum === output[index]
        let res = `Expected ${arr[0]} + ${arr[1]} to equal ${output[index]}: ${
          correct ? 'Pass' : 'Fail'
        }`
        results[index] = res
      })

      postMessage(results)
    } catch (error) {
      postMessage([error.message])
    }
  })
}
