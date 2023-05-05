const manifest = {
  '/': someGlobalStuff
}
function someGlobalStuff(req, response) {
  response.addData({ globalMiddleware: 'I am not from around here' })
}

export default manifest


