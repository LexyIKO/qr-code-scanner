import React from "react";
import './Result.sass'

interface MyProps {
    scanRes: string
}


function Result (props: MyProps) {

    let linkRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

    const isDefaultValue = () => {
        return props.scanRes === '';
    }

    const isJsonFormat = () => {
        return props.scanRes[0] === '{' && props.scanRes[props.scanRes.length - 1] === '}'
    }

    const jsonData = () => {
        try{
            let data:object = JSON.parse(props.scanRes)
            return JSON.stringify(data, null, 4)
        }
        catch (error) {
            alert('При считывании QR-кода произошла ошибка: ' + (error as Error).message)
        }
    }

    return (
        <div className ={isDefaultValue() ? "result centering-text" : "result default-text"}>
            <p className={isDefaultValue() ? "add-opacity result-text" : "result-text"}>
                {
                    isDefaultValue()
                        ? 'Здесь будет результат сканирования'
                        : linkRegExp.test(props.scanRes)
                            ? <a href={props.scanRes}>{props.scanRes}</a>
                            : isJsonFormat()
                                ? (
                                    <>
                                        <span className="add-opacity">QR-код содержит в себе json-объект, вы можете скопировать результат и воспользоваться сервисом, который отобразит его в удобном виде</span>
                                        <br/><br/>
                                        <span>{jsonData()}</span>
                                    </>
                                )
                                : props.scanRes
                }
            </p>
        </div>
    )
}

export default Result