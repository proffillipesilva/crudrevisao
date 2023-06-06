import multer from 'multer';
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb) {
      cb(null, 'uploads')
    },
    filename: function (req:Request, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
export default upload;