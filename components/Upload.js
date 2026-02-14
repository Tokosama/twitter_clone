import { useState } from "react";
import { FileDrop } from "react-file-drop";

export default function Upload({ children, onUploadFinish }) {
  const [isFileNearby, setIsFileNearby] = useState(false);
  const [isFileOver, setIsFileOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  function uploadImage(files, e) {
    e.preventDefault();
    setIsFileNearby(false);
    setIsFileOver(false);
    setIsUploading(true);
    if ( files.length === 0) {
      setIsUploading(false);
    }
    const data = new FormData();
    data.append("post", files[0]);
    fetch("/api/upload", {
      method: "POST",
      body: data,
    })
      .then(async (response) => {
        const json = await response.json();
        const src = json.src;
        onUploadFinish(src);

        setIsUploading(false);
      })
      .finally(() => {
        setIsUploading(false);
      });
  }
  return (
    <>
      <FileDrop
        onDrop={uploadImage}
        onDragOver={() => setIsFileOver(true)}
        onDragLeave={() => setIsFileOver(false)}
        onFrameDragEnter={() => setIsFileNearby(true)}
        onFrameDragLeave={() => setIsFileNearby(false)}
        onFrameDrop={() => {
          setIsFileNearby(false);
          setIsFileOver(false);
        }}
      >
        <div className="relative">
          {(isFileNearby || isFileOver) && (
            <div className="bg-twitterBlue absolute inset-0 flex items-center justify-center ">
              {" "}
              drop your file here{" "}
            </div>
          )}
          {/* input caché */}
          <input
            type="file"
            accept="image/*"
            hidden
            id="upload-input"
            onChange={(e) => {
              //console.log(e.target.files);
              uploadImage(e.target.files, e);
            }}
          />
          {children({
            isUploading,
            openFileDialog: () =>
              document.getElementById("upload-input").click(),
          })}
        </div>
      </FileDrop>
    </>
  );
}
