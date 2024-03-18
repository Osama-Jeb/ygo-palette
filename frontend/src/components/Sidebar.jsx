import { textColor } from "../helpfulfunction";

const Sidebar = (props) => {

    const data = props.data;

    return (
        <>
            <aside
                style={{ backgroundColor: props.palette[0] }}
                className={`w-[25vw] flex flex-col items-center h-[100vh] sticky top-0 left-0
              ${props.palette[0] ? textColor(props.palette[0]) : ''}
              `}>

                <div className='flex flex-col items-center justify-between pt-4'>
                    <p className='font-bold text-3xl text-center h-[70px] ygoBold'>{data.data[props.number].name}</p>

                    <img className='h-[350px] w-[250px] rounded-xl object-cover mt-3 ' src={props.imageSrc} alt="Image Doesnt Exist :(" />
                    <button
                        style={{ backgroundColor: props.palette[1] }}
                        className={`px-3 py-2 mt-3 rounded-xl font-bold flex items-center gap-2 text-2xl pixel
                ${props.palette[1] ? textColor(props.palette[1]) : ''}
                `}
                        onClick={props.fetchImage} >
                        Random Card</button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;
