import React from "react";

interface MyProps {
    buttonClicked: () => void
}
function CameraButton (props: MyProps) {

    return (
        <div className="nav-button" onClick={()=>props.buttonClicked()}>
            <p>Использовать камеру</p>
        </div>
    )
}

export default CameraButton