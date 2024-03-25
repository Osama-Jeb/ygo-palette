import ygoBack from "../assets/ygoBack.jpg";
import { textColor } from "../helpfulfunction";
import { useContext } from "react";
import { allInfo } from "../App";

const Hero = (props) => {
    const myInfo = useContext(allInfo);
    const data = myInfo.data;
    const number = myInfo.number;
    const palette = myInfo.palette;
    return (
        <>
            <div
                style={{
                    backgroundColor: palette[1],
                }}
                className={`min-h-[100vh] p-5 flex items-center justify-around gap-3 w-[100%] ${palette[1] ? textColor(palette[1]) : ''}`}>
                <div>

                    <span className="font-bold text-6xl ygoBold"> {data.data[number].name}</span>
                    <p className="text-2xl">This website generates random Color Palette <br /> base on this Card</p>
                </div>
                <div>
                    <div className="flip-container">
                        <div className="flipper">
                            <div className="front">
                                <img width={325} className="object-cover hover:shadow-lg" src={data.data[number].card_images[0].image_url} alt="" />
                            </div>
                            <div className="back">
                                <img width={325} className="object-cover hover:shadow-lg" src={ygoBack} alt="" />
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;