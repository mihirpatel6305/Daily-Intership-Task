import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "../Hooks/useFileUpload";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { mutation, progress, handleUpload, handleCancel } = useFileUpload();
  const fileInputRef = useRef();

  function handleFileChange(e) {
    const newFile = e.target.files[0];
    if (newFile) {
      setPreview(URL.createObjectURL(newFile));
      setFile(newFile);
    }
  }

  function handleCancelClick() {
    handleCancel();
    setFile(null);
    setPreview(null);
    fileInputRef.current.value = null;
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      setFile(null);
      setPreview(null);
      fileInputRef.current.value = null;
    }
  }, [mutation.isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6 items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />

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
          <div className="w-full h-3 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className="h-3 bg-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
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
        {((!mutation.isSuccess && !mutation.isError) || preview) && (
          <div className="flex gap-4">
            <button
              onClick={() => handleUpload(file)}
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
