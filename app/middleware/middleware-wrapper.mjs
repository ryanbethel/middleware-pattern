import enhanceResponse from './enhance-response.mjs'
import globalMiddleware from './global-middleware.mjs'

export default function chainWrapper(...chain) {
  const funcChain = Array.isArray(chain[0]) ? chain[0] : chain

  async function global(req) {
    const match = globalMiddleware?.[req.path]
    // I suspect there is a binding problem somewhere 
    return match ? funcWrapper(match) : false
  }

  // This is a local copy of the same function I want to pull in from a global middleware file
  function globalTest(req, response) {
    response.addData({ globalMiddleware: 'I am not from around here' })
  }

  async function sendIt(req, response) { return response.send() }
  const newChain = funcChain.map(fun => funcWrapper(fun))
  // This works
  return [funcWrapper(globalTest), ...newChain, funcWrapper(sendIt)]
  // This does not work
  // return [global, ...newChain, funcWrapper(sendIt)]
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




