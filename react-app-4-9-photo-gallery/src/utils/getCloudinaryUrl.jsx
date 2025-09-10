function getCloudinaryUrl(url, options = {}) {
  let transformation = [];

  if (options.width) transformation.push(`w_${options.width}`);
  if (options.height) transformation.push(`h_${options.height}`);
  if (options.crop) transformation.push(`c_${options.crop}`);
  if (options.quality) transformation.push(`q_${options.quality}`);

  return url.replace("/upload/", `/upload/${transformation.join(",")}/`);
}

export default getCloudinaryUrl;
