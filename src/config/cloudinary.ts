import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.VITE_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true
  }
});

export default cld;
