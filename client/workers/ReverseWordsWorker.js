export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    try {
      const input = [
        'I love JavaScript!',
        'What we think, we become',
        'Love For All, Hatred For None'
      ]
      const output = [
        'I evol !tpircSavaJ',
        'tahW ew ,kniht ew emoceb',
        'evoL roF ,llA dertaH roF enoN'
      ]

      let code = e.data
      let bodyCode = code.slice(code.indexOf('{') + 1)
      bodyCode = bodyCode.slice(0, -1)
      let fn = new Function('str', bodyCode + '')

      const results = []
      input.forEach((str, index) => {
        //Check if input matches output after calling the fn
        let targetStr = fn(str)
        let correct = targetStr === output[index]

        let res = `Expected ${targetStr} to equal ${output[index]}: ${
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
