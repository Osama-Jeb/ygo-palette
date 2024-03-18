import ygoBack from "../assets/ygoBack.jpg";
import { phrase } from "./tagsNphrases";
import { textColor } from "../helpfulfunction";

const Hero = (props) => {
    const data = props.data
    return (
        <>
            <div
                style={{
                    backgroundColor: props.palette[1],
                }}
                className={`h-[100vh] p-5 flex items-center justify-around w-[100%] ${props.palette[1] ? textColor(props.palette[1]) : ''}`}>
                <div>

                    <p> You {phrase(data, props.number)} <br />
                        <span className="font-bold text-4xl ygoBold"> {data.data[props.number].name}</span>
                    </p>
                    <p>This website generates random Color Palette <br /> base on this Card</p>
                </div>
                <div>
                    <div className="flip-container">
                        <div className="flipper">
                            <div className="front">
                                <img width={325} className="object-cover hover:shadow-lg" src={data.data[props.number].card_images[0].image_url} alt="" />
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