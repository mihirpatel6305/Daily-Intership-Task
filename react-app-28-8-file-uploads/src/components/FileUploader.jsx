import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import UploadFile from "./UploadFile";

function FileUploader() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [controller, setController] = useState(null);

  const mutation = useMutation({
    mutationFn: ({ file }) => {
      const ctrObj = new AbortController();
      setController(ctrObj);

      return UploadFile({
        file,
        progress: (percent) => setProgress(percent),
        signal: ctrObj.signal,
      });
    },
    onSuccess: (data) => {
      setProgress(0);
    },
    onError: (Err) => {
      setProgress(0);
    },
  });

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setProgress(0);
  }

  function handleUpload() {
    setProgress(0);
    mutation.mutate({ file });
  }

  function handleCancel() {
    if (controller) {
      controller.abort();
    }
    setFile(null);
    setPreview(null);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Upload Image
      </h1>

      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-gray-700 file:border-0 file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-lg mb-4 cursor-pointer"
      />

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-contain rounded-lg mb-2"
          />
        </div>
      )}

      {progress > 0 && (
        <div className="mb-4">
          <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-600 mt-1">
            {progress}%
          </div>
        </div>
      )}
      {mutation.status === "success" && (
        <div className="text-green-600 font-medium">Successfully Uploaded</div>
      )}

      {mutation.status === "error" && (
        <div className="text-red-600 font-medium">
          {" "}
          {mutation?.error?.message}
        </div>
      )}

      {file && <div className="flex gap-3 mt-4">
        <button
          onClick={handleUpload}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Upload
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>}
    </div>
  );
}

export default FileUploader;
