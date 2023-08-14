'use client'
import { Close } from "@mui/icons-material"

// Component that essentially is a cancel button for close modals and 
// specific pages
export default function CloseIcon({handleClose, width, color}) {
  // Create styles for the close X
  const iconStyle = {
    fontSize: width,
    color
  }
  // Stop click from propogating
  function handleCloseLocal(e) {
    e.stopPropagation();
    handleClose()
  }
  return (
    <div onClick={(e) => handleCloseLocal(e)} className="closeIcon">
      <Close style={iconStyle}/>
    </div>
  )
}
