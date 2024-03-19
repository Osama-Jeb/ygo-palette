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
                className={`relative rounded-xl text-3xl flex items-center justify-center w-[275px] h-[175px] font-bold cursor-pointer ${textColor(props.color)}`}>
                <span className="absolute text-sm top-[10px] right-[10px] z-10"></span>
                {copied ? 'COPIED' : props.color.toUpperCase()}
            </span>
        </>
    )
}

export default Listitem;