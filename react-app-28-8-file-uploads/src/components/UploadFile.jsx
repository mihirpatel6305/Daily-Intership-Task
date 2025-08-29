import axios from "axios";

export default async function UploadFile({ file, progress, signal }) {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mihir12345");
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dmwx0rowk/image/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (uploadProgress) => {
        const completePercent = Math.round(
          (uploadProgress.loaded * 100) / uploadProgress.total
        );
        progress(completePercent);
      },
      signal,
    }
  );
  return res.data;
}
