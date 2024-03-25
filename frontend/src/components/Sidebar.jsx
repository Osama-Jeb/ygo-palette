import { useContext, useState } from "react";
import { textColor } from "../helpfulfunction";
import { FaSearch, FaDice } from "react-icons/fa";
import { allInfo } from "../App";

const Sidebar = (props) => {
    const myInfo = useContext(allInfo);
    const data = myInfo.data;
    const number = myInfo.number;
    const palette = myInfo.palette;

    const [zoom, setZoom] = useState(false);
    const [name, setName] = useState('');

    return (
        <>
            {
                zoom && <>
                    <div
                        onClick={() => setZoom(false)}
                        style={{ backgroundColor: palette[1] }}
                        className="fixed z-20 w-[99.5vw] h-[100vh] flex items-center justify-center">
                        <img
                            onClick={() => setZoom(false)}
                            className='w-[90vw] sm:w-[49vw] rounded-2xl object-cover mt-3 hover:cursor-zoom-out' src={data.data[number].card_images[0].image_url_cropped} alt="Image Doesnt Exist :(" />
                    </div>
                </>
            }
            <aside
                style={{ backgroundColor: palette[0] }}
                className={`sm:w-[25vw] flex flex-col items-center h-[100vh] sm:sticky top-0 left-0
              ${palette[0] ? textColor(palette[0]) : ''}
              `}>

                <div className='flex flex-col h-[80%] items-center justify-around pt-4'>
                    <p className='font-bold text-3xl text-center min-h-[70px] ygoBold'>{data.data[number].name}</p>
                    <img
                        onClick={() => setZoom(true)}
                        className='w-[80%] mb-3 object-contain mt-3 hover:cursor-zoom-in' src={data.data[number].card_images[0].image_url_cropped} alt="Image Doesnt Exist :(" />

                    <div className="flex items-center gap-3 mt-3">
                        <button
                            style={{ backgroundColor: palette[2] }}
                            className={`btn
                            ${palette[1] ? textColor(palette[2]) : ''}
                            `}
                            onClick={myInfo.fetchImage} >
                            <FaDice />
                        </button>

                        <input type="text" className="input text-black" placeholder="Search For Card"
                            onClick={(e) => { e.target.value = '' }}
                            onChange={(e) => { setName(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    myInfo.searchCard(e.target.value);
                                }
                            }}
                        />


                        <button
                            style={{ backgroundColor: palette[2] }}
                            className={`btn
                            ${palette[1] ? textColor(palette[2]) : ''}
                            `} onClick={() => { searchCard(name) }}>
                            <FaSearch />
                        </button>

                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;
