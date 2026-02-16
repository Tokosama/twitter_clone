import EditableImage from "./EditableImage";

export default function Avatar({ src, big, onChange, editable=false }) {
  const widthClass = big ? " w-32 h-32 " : "w-11 h-11";
  return (
    <>
    <div className="rounded-full overflow-hidden"> 
      <EditableImage type={'image'}  src={src} onChange={onChange} editable={editable} className={'rounded-full overflow-hidden '+widthClass}   />
    </div>
    </>
 
  );
}
