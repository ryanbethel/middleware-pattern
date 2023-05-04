import { getTeams } from '../models/teams.mjs'
import enhanceResponse from '../middleware/enhance-response.mjs'
import { auth, checkRole } from '../middleware/auth-middleware.mjs'

export const get = [auth, checkRole('admin'), sendTeams]

async function sendTeams(req) {
  const response = enhanceResponse(req)
  const teams = await getTeams()

  return response.addData({ teams }).send()
}


// This is the API I want to create. 

/*********************
import {auth,checkRole} from '../middleware/auth-middleware.mjs'

// import enhanceResponse from '../middleware/enhance-response.mjs'
import {middlewareWrapper} from '../middleware/middleware-wrapper.mjs'

// The send middleware at the end just returns response.send() in case 
// none of the other middleware return. This wrapper runs it to simplify.
// export const get = [auth, checkRole('admin'), myStuff, send]
export const get = middlewareWrapper([auth, checkRole('admin'), myStuff])

async function myStuff(req,resp) {
  // removes the following line by passing `resp`
  // const response = enhanceResponse(req)

  const teams = await getTeams()

  // If you return the req `return req` it will `return req.send()` 
  // Otherwise if there is no send method it returns the object as normal
  // return response.addData({ teams }).send()
  return resp.addData({ teams })
}

**********************/

