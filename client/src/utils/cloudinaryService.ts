import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
declare global {
  interface Window {
    cloudinary: any;
  }
}

export const url = (publicId: string, options: Object) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  const cl = CoreCloudinary.new({});
  return cl.url(publicId, scOptions);
};

export const openUploadWidget = (
  options: Object,
  callback: (
    error: any,
    photos: {
      event: string;
      info: { url: any; thumbnail_url: any; public_id: any };
    }
  ) => void
) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(scOptions, callback);
};

export async function fetchPhotos(
  imageTag: { toString: () => string },
  setter: (arg0: any) => any
) {
  const options = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    format: 'json',
    type: 'list',
    version: Math.ceil(new Date().getTime() / 1000),
  };

  const urlPath = url(imageTag.toString(), options);

  fetch(urlPath)
    .then((res) => res.text())
    .then((text) =>
      text
        ? setter(
            JSON.parse(text).resources.map(
              (image: { public_id: any }) => image.public_id
            )
          )
        : []
    )
    .catch((err) => console.error(err));
}
