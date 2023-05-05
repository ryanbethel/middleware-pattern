import enhanceResponse from './enhance-response.mjs'

export default function chainWrapper(...chain) {
  const funcChain = Array.isArray(chain[0]) ? chain[0] : chain
  async function sendIt(req) {
    const response = enhanceResponse(req)
    return response.send()
  }
  const newChain = funcChain.map(fun => funcWrapper(fun))
  return [...newChain, sendIt]
}

export function funcWrapper(func) {
  return function(req) {
    const resp = enhanceResponse(req)
    let result = func(req, resp)
    if (result?.send && ((typeof result.send) === 'function')) {
      return result.send()
    } else {
      return result
    }
  }
}



