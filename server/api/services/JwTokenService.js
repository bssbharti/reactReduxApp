/*
   Author :- Mangal Singh
   Purpose :- Service used to generate & verify user token
 */


const jwt = require('jsonwebtoken');
const tokenSecret = "KGKGKJG&*575765VGJHGJ";
module.exports = {

     // Generates a token from supplied payload
     issueToken : function(payload) {
          //   return jwt.sign(
          //       payload,
          //       tokenSecret,// Token Secret that we sign it with
          //       '2 days'
          //   //     {
          //   //       expiresIn : '1d' // Token Expire time
          //   //     }
          //   );
          let token = jwt.sign(
                              {
                                   auth:  payload,
                                   exp:  Math.floor(new Date().getTime()/1000) + 7*24*60*60 // Note: in seconds!
                              },
                              tokenSecret);  // secret is defined in the environment variable JWT_SECRET
          return token;
     },

     // Verifies token on a request
     verify : function(token, callback) {
          return jwt.verify(
               token, // The token to be verified
               tokenSecret, // Same token we used to sign
               {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
               callback //Pass errors or decoded token to callback
          );
     }
}
