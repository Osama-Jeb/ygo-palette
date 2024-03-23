import { useState } from "react";
import { textColor } from "../helpfulfunction";
import { FaSearch, FaDice } from "react-icons/fa";

const Sidebar = (props) => {
    const data = props.data

    const [zoom, setZoom] = useState(false);

    const [name, setName] = useState('');

    return (
        <>
            {
                zoom && <>
                    <div
                        onClick={() => setZoom(false)}
                        style={{ backgroundColor: props.palette[1] }}
                        className="fixed z-20 w-[99.5vw] h-[100vh] flex items-center justify-center">
                        <img
                            onClick={() => setZoom(false)}
                            className='w-[49vw] rounded-2xl object-cover mt-3 hover:cursor-zoom-out' src={data.data[props.number].card_images[0].image_url_cropped} alt="Image Doesnt Exist :(" />
                    </div>
                </>
            }
            <aside
                style={{ backgroundColor: props.palette[0] }}
                className={`w-[25vw] flex flex-col items-center h-[100vh] sticky top-0 left-0
              ${props.palette[0] ? textColor(props.palette[0]) : ''}
              `}>

                <div className='flex flex-col items-center justify-between pt-4'>
                    <p className='font-bold text-3xl text-center min-h-[70px] ygoBold'>{data.data[props.number].name}</p>

                    <img
                        onClick={() => setZoom(true)}
                        className='h-[350px] w-[250px] rounded-xl object-cover mt-3 hover:cursor-zoom-in' src={data.data[props.number].card_images[0].image_url_cropped} alt="Image Doesnt Exist :(" />

                    <div className="flex items-center gap-3 mt-3">
                        <button
                            style={{ backgroundColor: props.palette[2] }}
                            className={`btn
                            ${props.palette[1] ? textColor(props.palette[2]) : ''}
                            `}
                            onClick={props.fetchImage} >
                            <FaDice />
                        </button>

                        <input type="text" className="input" placeholder="Search For Card"
                            onClick={(e) => { e.target.value = '' }}
                            onChange={(e) => { setName(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // Call your function here
                                    props.searchCard(e.target.value);
                                }
                            }}
                        />


                        <button
                            style={{ backgroundColor: props.palette[2] }}
                            className={`btn
                            ${props.palette[1] ? textColor(props.palette[2]) : ''}
                            `} onClick={() => { props.searchCard(name) }}>
                            <FaSearch />
                        </button>

                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;
