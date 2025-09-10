import { useDropzone } from "react-dropzone";
import { useState } from "react";

function Dropzone({ onFileSelect }) {
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 2 * 1024 * 1024,
    accept: { "image/jpeg": [".jpeg", ".jpg"] },
    onDrop: (acceptedFiles, fileRejections) => {
      setError(null);

      if (acceptedFiles?.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }

      if (fileRejections?.length > 0) {
        const rejection = fileRejections[0];
        if (rejection.errors.some((err) => err.code === "file-too-large")) {
          setError("File is too large. Max size is 2MB.");
        } else if (
          rejection.errors.some((err) => err.code === "file-invalid-type")
        ) {
          setError("Invalid file type. Only JPEG/JPG allowed.");
        } else {
          setError("File not accepted. Please try again.");
        }
      }
    },
  });

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed w-72 h-72  flex items-center justify-center rounded-lg cursor-pointer transition ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600">Drop the file here ...</p>
        ) : (
          <p className="text-gray-600 text-xs">
            Drag & drop an image here, or click to select
          </p>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium text-center">{error}</p>
      )}
    </div>
  );
}

export default Dropzone;
