import { textColor } from "../helpfulfunction";


const Relatedcards = (props) => {

    return (
        <>
            <div
                style={{ backgroundColor: props.palette[1] }}
                className="w-[100%]"
            >
                <p className={`mt-8 ml-8 font-bold text-4xl ygoBold ${props.palette[1] ? textColor(props.palette[1]) : ''}`}>
                    Similar Cards
                </p>
                <div

                    className={`min-h-[75vh] p-14 grid grid-cols-3 gap-3`}>
                    {
                        props.similarCards.map(element =>
                            <>
                                <img
                                    onClick={() => {
                                        props.searchCard(element.name);
                                        props.findSimilar(element.name)
                                    }}
                                    loading="lazy"
                                    className="hover:cursor-pointer"
                                    src={element.card_images[0].image_url} width={275} alt="" />
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Relatedcards;