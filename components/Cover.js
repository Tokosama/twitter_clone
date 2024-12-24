import { useState } from "react";
import { FileDrop } from "react-file-drop"; //permet de gerer le drag and drop
import { PulseLoader } from "react-spinners"; // pour gerer les animation de chargement 

export default function Cover({ src,onChange }) {
  const [isFileNearby, setIsFileNearby] = useState(false);
  const [isFileOver, setIsFileOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  let extraClasses = "";
  if (isFileNearby && !isFileOver) extraClasses += " bg-blue-500 opacity-30";
  if (isFileOver) extraClasses += " bg-blue-500 opacity-80 ";
  function updateImage(files, e) {
    e.preventDefault();
    setIsFileNearby(false);
    setIsFileOver(false);
    setIsUploading(true);
    const data = new FormData();
    data.append("cover", files[0]);
    fetch("/api/upload", {
      method: "POST",
      body: data,
    }).then(async (response) => {
      const json = await response.json();
      console.log(json.link);

      onChange(json.link)

      setIsUploading(false);
    });
  }
  return (
    <>
      <FileDrop
        onDrop={updateImage}
        onDragOver={() => setIsFileOver(true)}
        onDragLeave={() => setIsFileOver(false)}
        onFrameDragEnter={() => setIsFileNearby(true)}
        onFrameDragLeave={() => setIsFileNearby(false)}
      >
        <div className={" bg-twitterBorder relative "}>
          <div className={"absolute inset-0 " + extraClasses}></div>
          {isUploading && (
            <div
              className=" absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(48, 140, 216,0.9)" }}
            >
              <PulseLoader size={14} color={'#fff'}/>
            </div>
          )}

          {src && (
            <div className="flex items-center overflow-hidden h-36 ">
              {" "}
              <img
                className="w-full"
                src={src}
                alt=""
              />
            </div>
          )}
        </div>
      </FileDrop>
    </>
  );
}
