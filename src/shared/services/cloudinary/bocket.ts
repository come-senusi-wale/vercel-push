import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

cloudinary.config({
    cloud_name: "df2jfb5zp",
    api_key: "258772772892371",
    api_secret: "sxSl71qq7StRRQCVz0eJkCd7Ofc",
});

export default cloudinary;