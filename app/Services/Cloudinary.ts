import {
  DeliveryType,
  ResourceType,
  ResponseCallback,
  TransformationOptions,
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary'
import { v2 as BaseCloudinary } from 'cloudinary'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export interface CloudinaryConfig {
  cloudName: string
  apiKey: string
  apiSecret: string
  secure: boolean
  [key: string]: TransformationOptions
}

export default class Cloudinary {
  private readonly config: CloudinaryConfig
  private uploadResponse: UploadApiResponse
  private readonly cloudinary: typeof BaseCloudinary

  constructor(config: CloudinaryConfig) {
    this.cloudinary = BaseCloudinary

    this.config = config

    this.cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
      secure: config.secure,
    })
  }

  public getCloudinary() {
    return this.cloudinary
  }

  private static getPathFromFile(file: MultipartFileContract): string {
    const path = file.tmpPath ?? file.filePath

    if (!path) {
      throw new Error("File's tmpPath or filePath must exist")
    }
    return path
  }

  public async upload(
    file: string | MultipartFileContract,
    publicId: string | undefined = undefined,
    uploadOptions: UploadApiOptions = {},
    callback?: ResponseCallback
  ) {
    let filePath: string

    if (typeof file === 'string') {
      filePath = file
    } else {
      filePath = Cloudinary.getPathFromFile(file)
    }

    return (this.uploadResponse = await this.cloudinary.uploader.upload(
      filePath,
      {
        public_id: publicId,
        ...uploadOptions,
      },
      callback
    ))
  }

  public async unsignedUpload(
    file: string | MultipartFileContract,
    uploadPreset: string,
    publicId: string | undefined = undefined,
    uploadOptions: UploadApiOptions = {},
    callback?: ResponseCallback
  ) {
    let filePath: string

    if (typeof file === 'string') {
      filePath = file
    } else {
      filePath = Cloudinary.getPathFromFile(file)
    }
    return (this.uploadResponse = await this.cloudinary.uploader.unsigned_upload(
      filePath,
      uploadPreset,
      {
        public_id: publicId,
        ...uploadOptions,
      },
      callback
    ))
  }

  public getResult() {
    return this.uploadResponse
  }

  public getPublicId() {
    return this.uploadResponse.public_id
  }

  public show(publicId: string, options: Object = {}) {
    const defaults = this.config.scaling as Object

    options = { ...defaults, ...options }

    return this.cloudinary.url(publicId, options)
  }

  public secureShow(publicId: string, options: Object = {}) {
    return this.show(publicId, { ...options, secure: true })
  }

  public async destroy(
    publicId: string,
    options?: {
      resource_type?: ResourceType
      type?: DeliveryType
      invalidate?: boolean
    }
  ) {
    return await this.cloudinary.uploader.destroy(publicId, options)
  }
}
