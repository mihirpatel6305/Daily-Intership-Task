import { useEffect, useState } from "react";
import { useFileUpload } from "../Hooks/useFileUpload";
import Dropzone from "./Dropzone.jsx";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { mutation, progress, handleUpload, handleCancel } = useFileUpload();

  function handleFileChange(newFile) {
    if (newFile) {
      mutation.reset();
      const objectUrl = URL.createObjectURL(newFile);
      setPreview(objectUrl);
      setFile(newFile);
    }
  }

  function handleCancelClick() {
    handleCancel();
    setFile(null);
    setPreview(null);
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (mutation.isSuccess) {
      setFile(null);
      setPreview(null);

      const timer = setTimeout(() => {
        mutation.reset();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [mutation.isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6 items-center">
        {!file && <Dropzone onFileSelect={handleFileChange} />}

        {preview && (
          <div className="w-72 h-72 flex justify-center items-center overflow-hidden rounded-lg border">
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {mutation.isPending && (
          <div className="relative w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>

            <span className="absolute inset-0 flex items-center justify-center text-white font-medium">
              {progress}%
            </span>
          </div>
        )}

        {mutation.isSuccess && (
          <div className="text-green-600 font-medium">
            File Successfully Uploaded
          </div>
        )}
        {mutation.isError && (
          <div className="text-red-600 font-medium">Upload Failed</div>
        )}

        {file && !mutation.isSuccess && (
          <div className="flex gap-4">
            <button
              onClick={() => {
                mutation.reset();
                const res = handleUpload(file);
                if (res === false) {
                  setFile(null);
                  setPreview(null);
                }
              }}
              disabled={mutation.isPending || !file}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Upload
            </button>
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadFile;
