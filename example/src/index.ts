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
    changeOrigin: true,
    secure: false,
  }
})

startServer(app)
