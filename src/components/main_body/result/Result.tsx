import React from "react";
import './Result.sass'

interface MyProps {
    scanRes: string
}


function Result (props: MyProps) {

    let RegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
    function checkIsDefaultValue () {
        if(props.scanRes === ''){
            return true
        }
        else{
            return false
        }
    }

    return (
        <div
            className = "result"
            style={{
                justifyContent: checkIsDefaultValue() ? "center" : "left",
                alignItems: checkIsDefaultValue() ? "center" : "normal"
            }}
        >
            <p
                style={{
                    opacity: checkIsDefaultValue() ? 0.7 : 1,
                }}
            >
                {checkIsDefaultValue() ? 'Здесь будет результат сканирования' :
                    RegExp.test(props.scanRes) ? <a href={props.scanRes}>{props.scanRes}</a> : props.scanRes}
            </p>
        </div>
    )
}

export default Result