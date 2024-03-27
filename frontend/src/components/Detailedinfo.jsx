import { useContext } from "react";
import { textColor } from "../helpfulfunction";
import { tag, level, atkNdef } from "./tagsNphrases";
import { allInfo } from "../App";

const Detailedinfo = (props) => {

    const myInfo = useContext(allInfo);
    const data = myInfo.data;
    const number = myInfo.number;
    const palette = myInfo.palette;
    return (
        <>
            <div
                style={{ backgroundColor: palette[2] }}
                className={`min-h-[95vh] flex items-center justify-around p-12 w-[100%] ${palette[2] ? textColor(palette[2]) : ''}`}>
                <div className="flex flex-col w-[100%] items-start">
                    <p className="font-bold text-5xl ygoBold">{data.data[number].name}</p>
                    <div className="text-xl flex items-center gap-2 mt-2">
                        {tag(data.data[number].frameType, palette[0])}
                        {tag(data.data[number].type, palette[1])}
                    </div>

                    <div className="text-xl flex items-center gap-2 mt-2">
                        {tag(data.data[number].race, palette[3])}
                        {tag(data.data[number].attribute, palette[4])}
                    </div>

                    <div className="text-xl mt-2">
                        {
                            data.data[number].level ?
                                level(data.data[number].level)
                                :
                                ''
                        }
                    </div>
                    <div className="font-bold text-3xl mt-2">
                        {atkNdef(data.data[number].atk, data.data[number].def)}
                    </div>

                    <p
                        className="w-[90%] text-wrap leading-relaxed ygoItalic text-2xl"
                    >{data.data[number].desc}</p>

                </div>
            </div>
        </>
    )
}

export default Detailedinfo;