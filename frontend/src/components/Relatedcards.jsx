import { useContext } from "react";
import { textColor } from "../helpfulfunction";
import { allInfo } from "../App";


const Relatedcards = (props) => {

    const myInfo = useContext(allInfo);
    const palette = myInfo.palette;

    return (
        <>
            <div
                style={{ backgroundColor: palette[1] }}
                className="w-[100%]"
            >
                <p className={`mt-8 ml-8 font-bold text-4xl ygoBold ${palette[1] ? textColor(palette[1]) : ''}`}>
                    Similar Cards
                </p>
                <div
                    className={`min-h-[75vh] p-14 grid grid-cols-2 sm:grid-cols-3 gap-3`}>
                    {
                        myInfo.similarCards.map((card, index) =>
                            <>
                                <img
                                    onClick={() => {
                                        myInfo.searchCard(card.name);
                                        myInfo.findSimilar(card.name)
                                    }}
                                    loading="lazy"
                                    className={`hover:cursor-pointer ${index == 8 ? 'hidden sm:flex' : ''}`}
                                    src={card.card_images[0].image_url} width={275} alt="" />
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Relatedcards;