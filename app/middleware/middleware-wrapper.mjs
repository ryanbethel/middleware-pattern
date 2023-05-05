import enhanceResponse from './enhance-response.mjs'
import globalMiddleware from './global-middleware.mjs'


export default function chainWrapper(...chain) {
  const funcChain = Array.isArray(chain[0]) ? chain[0] : chain
  function global(req) {
    return funcWrapper(globalMiddleware[req.path])(req)
  }
  async function sendIt(req, response) { return response.send() }
  const newChain = funcChain.map(fun => funcWrapper(fun))
  return [global, ...newChain, funcWrapper(sendIt)]
}

export function funcWrapper(func) {
  return function(req) {
    const resp = enhanceResponse(req)
    // binding? ?????
    let result = func(req, resp)
    if (result?.send && ((typeof result.send) === 'function')) {
      return result.send()
    } else {
      return result
    }
  }
}




