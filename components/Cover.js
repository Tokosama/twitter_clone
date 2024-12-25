import { useState } from "react";
import { FileDrop } from "react-file-drop"; //permet de gerer le drag and drop
import { PulseLoader } from "react-spinners"; // pour gerer les animation de chargement 
import EditableImage from "./EditableImage";

export default function Cover({ src,onChange,editable }) {
  
  
  return (
    <>
    <EditableImage type={"cover"} src={src} onChange={onChange} editable={editable} className={' h-36'} />
    </>
  );
}
