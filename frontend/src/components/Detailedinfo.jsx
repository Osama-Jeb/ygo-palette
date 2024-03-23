import { textColor } from "../helpfulfunction";
import { tag, level, atkNdef } from "./tagsNphrases";

const Detailedinfo = (props) => {

    const data = props.data;
    return (
        <>
            <div
                style={{ backgroundColor: props.palette[2] }}
                className={`h-[75vh] flex items-center justify-around p-12 w-[100%] ${props.palette[2] ? textColor(props.palette[2]) : ''}`}>
                <div className="flex flex-col w-[100%] items-start">
                    <p className="font-bold text-4xl ygoBold">{data.data[props.number].name}</p>
                    <div className="flex items-center gap-2 mt-2">
                        {tag(data.data[props.number].frameType, props.palette[0])}
                        {tag(data.data[props.number].type, props.palette[1])}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        {tag(data.data[props.number].race, props.palette[3])}
                        {tag(data.data[props.number].attribute, props.palette[4])}
                    </div>

                    <div className="mt-2">
                        {
                            data.data[props.number].level ?
                                level(data.data[props.number].level)
                                :
                                ''
                        }
                    </div>
                    <div className="font-bold text-xl mt-2">
                        {atkNdef(data.data[props.number].atk, data.data[props.number].def)}
                    </div>

                    <p
                        className="w-[70%] text-wrap ygoItalic"
                    >{data.data[props.number].desc}</p>

                </div>
            </div>
        </>
    )
}

export default Detailedinfo;