import { createServer, startServer } from '../../lib/smoke'
import * as path from "path";

const mocksPath = path.join(__dirname, '../mocks')

const API_END_POINT = '/api/v1/'

const app = createServer({
  logs: true,
  port: 3001,
  basePath: mocksPath,
  saveHeaders: true,
  recordOpt: {
    record: true,
    recordWhen: (proxyRes, req, res) => {
      return req.url.includes(API_END_POINT)
    }
  },
  proxyOpts: {
    target: 'https://staging.cloudinary.com',
    // target: 'https://0.0.0.0:8081',
    changeOrigin: true,
    secure: false,
    router: function (req) {
      if(req.headers.host.includes('folders/folder')){
        console.log(req.headers.host)
        console.log('*************************')
        return 'https://api-staging.cloudinary.com';
      }
    },

    // router:{
    //   "api-localhost:3001" : 'https://api-staging.cloudinary.com',
    //   "api-mock.cloudinary.com" : 'https://api-staging.cloudinary.com'
    // }
  }
})

startServer(app)
