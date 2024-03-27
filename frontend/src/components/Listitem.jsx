import { useState } from "react";
import { textColor } from "../helpfulfunction";

const Listitem = (props) => {
    const [copied, setCopied] = useState(false);
    const copyToClipBoard = (e) => {
        const color = e.target.innerText;
        navigator.clipboard.writeText(color);
    }

    return (
        <>
            <span
                onClick={(e) => {
                    copyToClipBoard(e);
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false)
                    }, 1000)

                }}
                style={{ backgroundColor: props.color }}
                className={`relative rounded-xl sm:text-3xl text-sm flex items-center justify-center w-[30vw] sm:w-[20vw] h-[20vh] font-bold cursor-pointer ${textColor(props.color)} ${props.index == 8 ? 'hidden sm:flex' : ''}`}>
                {copied ? 'COPIED' : props.color.toUpperCase()}
            </span>
        </>
    )
}

export default Listitem;