import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import { Cloudinary } from '@cloudinary/base';

declare global {
  interface Window {
    cloudinary: any;
  }
}

export const url = (publicId, options) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  const cl = CoreCloudinary.new({});
  return cl.url(publicId, scOptions);
};

export const openUploadWidget = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(scOptions, callback);
};

export async function fetchPhotos(imageTag, setter) {
  const options = {
    cloudName: 'dwtfrbyt5',
    format: 'json',
    type: 'list',
    version: Math.ceil(new Date().getTime() / 1000),
  };

  const urlPath = url(imageTag.toString(), options);

  fetch(urlPath)
    .then((res) => res.text())
    .then((text) =>
      text
        ? setter(JSON.parse(text).resources.map((image) => image.public_id))
        : []
    )
    .catch((err) => console.log(err));
}

// export const deleteImage = (id: string) => {
//   console.log('!!!!!!!!!!!!!1deleteCalled!!!!!!!!!!!!!!!!!');
//   console.log(window.cloudinary);
//   var cloudinary = require('cloudinary').v2;

//   cloudinary.config({
//     cloud_name: 'dwtfrbyt5',
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   const cld = new Cloudinary({
//     cloud: {
//       cloudName: 'dwtfrbyt5',
//     },
//   });
//   console.log('cld', cld);
//   cloudinary.uploader.destroy(
//     id,
//     { type: 'upload', resource_type: 'image' },
//     (result: any) => {
//       console.log(result);
//       return result;
//     }
//   );
// };
