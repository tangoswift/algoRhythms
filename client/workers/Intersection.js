export default () => {
  self.addEventListener('message', e => {
    if (!e) return undefined
    try {
      const inputs = [
        [[1, 4, 9, 10, 11], [2, 3, 4, 5, 8, 10]],
        [[5, 4, 1, 7, 2], [4, 2, 3, 5]]
      ]
      const outputs = [[4, 10], [5, 4, 2]]

      let code = e.data
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)
      let intersection = new Function('arrA', 'arrB', bodyCode + '')

      const results = []
      inputs.forEach((input, idx) => {
        let intersectionArr = intersection(input[0], input[1])
        let correct = true
        if (intersectionArr.length !== outputs[idx].length) {
          correct = false
        } else {
          for (let i = 0; i < outputs[idx].length; i++) {
            if (intersectionArr[i] !== outputs[idx][i]) {
              correct = false
              break
            }
          }
        }
        let res = `Expected [${input[0]}] and [${input[1]}] to return [${
          outputs[idx]
        }]: ${correct ? 'Pass' : 'Fail'}`
        results[idx] = res
      })

      postMessage(results)
    } catch (error) {
      postMessage([error.message])
    }
  })
}
