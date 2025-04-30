import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
    
  } from '@aws-sdk/client-s3';



  import { v4 as uuidv4 } from 'uuid';
  
  export class Uploader {
    private client: S3Client;
  
    constructor() {
      this.client = new S3Client({
        region: 'eu-central-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });
    }
  
    async uploadFile(file: Express.Multer.File) {
      const key: string = uuidv4() ?? file.originalname;
      const params: PutObjectCommandInput = {
        // Bucket: process.env.AWS_S3_BUCKET_NAME,
        Bucket: 'yawa-bucket',
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
  
      try {
        const command = new PutObjectCommand(params);
        await this.client.send(command);
  
        // const url = `${process.env.AWS_S3_BUCKET_URL}/${key}`;
        const url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        return { url, type: file.mimetype.split('/')[0] };
      } catch (error) {
        console.error(error);
        throw new Error('Error uploading file');
      }
    }
  
    async uploadFiles(files: Express.Multer.File[]) {
      const uploadPromises = files.map(file => this.uploadFile(file));
      return Promise.all(uploadPromises);
    }
  }
  
  
  export const uploadToS3 = async (buffer: Buffer, originalFilename: string): Promise<null | {Location:string,response:any}> => {
    const s3 = new S3Client({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  
    const timestamp = Date.now().toString();
    const key = `${timestamp}-${originalFilename}`;
  
    const params: PutObjectCommandInput = {
      Bucket: 'yawa-bucket',
      Key: key,
      Body: buffer,
      ContentType: 'image/jpeg',
      // ACL: 'public-read',
    };
  
    const command = new PutObjectCommand(params);
  
    try {
     const response = await s3.send(command);
      const fileLocation = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
      return { response,Location:fileLocation };
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  };
  