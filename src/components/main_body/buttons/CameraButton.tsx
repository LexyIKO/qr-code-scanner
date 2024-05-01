import React from "react";
import './CameraButton.sass'

interface MyProps {
    buttonClicked: () => void
}
function CameraButton (props: MyProps) {
    const buttonPressed = () => [
        props.buttonClicked()
    ]

    return (
        <div className="nav-button" onClick={buttonPressed}>
            <p>Использовать камеру</p>
        </div>
    )
}

export default CameraButton