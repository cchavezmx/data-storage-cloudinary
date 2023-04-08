const UploadBar = () => {
  return (
    <div id="upload-bar" className="h-[130px] grow-1 flex flex-col justify-center gap-1">
      <small>Has usado 815 GB de almacenamiento</small>
      <span className="progress--bar">
        <span className="progress--bar--fill" style={{width: '38%'}}></span>
      </span>
      <div className="progress-info">
        <small>0 GB</small>
        <small>1000 GB</small>
      </div>
      <span className="comic-window">
        185 <small>GB disponibles</small>
      </span>
    </div>      
  )
}

export default UploadBar