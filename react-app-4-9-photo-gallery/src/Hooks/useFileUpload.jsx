import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useFileUpload() {
  const [progress, setProgress] = useState(0);
  const [gallery, setGallery] = useState(
    JSON.parse(localStorage.getItem("gallery") || "[]")
  );
  const controllerRef = useRef(null);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ file, tempId }) => {
      const controller = new AbortController();
      controllerRef.current = controller;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "photoGallery");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dmwx0rowk/image/upload",
        formData,
        {
          onUploadProgress: (uploadPrgress) => {
            setProgress(
              Math.round((uploadPrgress.loaded / uploadPrgress.total) * 100)
            );
          },
          signal: controller.signal,
        }
      );

      if (res?.data?.secure_url) {
        const fullUrl = res.data.secure_url;

        const lowResUrl = fullUrl.replace(
          "/upload/",
          "/upload/w_20,e_blur:200,q_30/"
        );
        setGallery((prev) => {
          const updatedGallery = prev.map((img) =>
            img.id === tempId
              ? {
                  ...img,
                  url: fullUrl,
                  lowRes: lowResUrl,
                  status: "completed",
                }
              : img
          );
          localStorage.setItem("gallery", JSON.stringify(updatedGallery));
          return updatedGallery;
        });
      }
    },

    onSuccess: () => {
      setProgress(0);
    },

    onError: (_, { tempId }) => {
      setGallery((prev) => {
        const updatedGallery = prev.filter((img) => img.id !== tempId);
        localStorage.setItem("gallery", JSON.stringify(updatedGallery));
        return updatedGallery;
      });
    },
  });

  function handleUpload(file) {
    if (!file) return;
    // navigate("/gallery");
    const tempId = Date.now();

    const newImage = {
      id: tempId,
      url: URL.createObjectURL(file),
      status: "uploading",
    };

    setGallery((prev) => {
      const updatedGallery = [...prev, newImage];
      localStorage.setItem("gallery", JSON.stringify(updatedGallery));
      return updatedGallery;
    });

    mutation.mutate({ file, tempId });
  }

  function handleCancel() {
    if (controllerRef.current) {
      controllerRef.current.abort();
      console.log("Upload cancelled");
    }
  }

  return { mutation, progress, handleUpload, handleCancel };
}
