import Env from '@ioc:Adonis/Core/Env'
import { CloudinaryConfig } from 'App/Services/Cloudinary'

const cloudinaryConfig: CloudinaryConfig = {
  cloudName: Env.get('CLOUDINARY_CLOUD_NAME'),
  apiKey: Env.get('CLOUDINARY_API_KEY'),
  apiSecret: Env.get('CLOUDINARY_API_SECRET'),
  secure: Env.get('CLOUDINARY_SECURE', true),

  scaling: {
    transformation: {
      format: 'png',
    },
    width: 150,
    height: 150,
    crop: 'fit',
  },
}

export default cloudinaryConfig
