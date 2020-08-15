import { Component, Prop, Vue } from 'vue-property-decorator';
// import jwtDecode from 'jwt-decode';
// let cookieparser = require('cookieparser');

export  class LoginUtils extends Vue {
  static getUserFromCookie(req: Request) {
    console.log('call getUserFromCookie');
    if (process.env.server && process.env.static) return;
    console.log('headers : ' + req.headers);
    // if (!req.headers.cookie) return;

    // if (req.headers.cookie) {
    //   const parsed = cookieparser.parse(req.headers.cookie);
    //   const accessTokenCookie = parsed.access_token;
    //   if (!accessTokenCookie) return;

    //   var decodedToken: string = jwtDecode(accessTokenCookie);
    //   if (!decodedToken) return;

    //   return decodedToken;
    // }
    return 'test';
  }
}