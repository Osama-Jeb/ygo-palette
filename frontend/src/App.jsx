
import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios';
import ColorThief from "colorthief";
import jsonData from "../../backend/cardinfo.php.json"

import ygoBack from "./assets/ygoBack.jpg";
import star from "./assets/star.png";

function App() {
  const data = jsonData;
  const [number, setNumber] = useState(2562);

  const [loading, setLoading] = useState(false);
  const loadPage = useRef();

  const [imageSrc, setImageSrc] = useState('');
  const [palette, setPalette] = useState([]);


  const [initialLoad, setInitialLoad] = useState(true);

  const fetchImage = () => {
    setLoading(true);

    const newNum = Math.round(Math.random() * 10000);
    setNumber(newNum);
  };

  // useEffect to trigger API call when 'number' changes
  useEffect(() => {
    axios.get(`http://localhost:3001/${number}`, { responseType: 'blob' })
      .then(response => {
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);

        const file = response.data;
        const fr = new FileReader();
        fr.readAsDataURL(file);

        fr.onload = () => {
          const img = new Image();
          img.src = fr.result;
          img.onload = () => {
            const colorThief = new ColorThief();
            const colorPalette = colorThief.getPalette(img, 9, 10);

            const newPalette = colorPalette.map((color) => {
              const hex = `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`;
              return hex;
            });

            setPalette(newPalette);
          };
        };
      })
      .catch(error => {
        console.error("Error occurred while fetching image:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [number]); // Run this effect whenever 'number' changes


  const toHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }

    return hex;
  };

  const ListItem = (props) => {
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

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  }
  const textColor = (background) => {
    const { r, g, b } = hexToRgb(background);

    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? 'text-black ' : 'text-white'
  }



  const phrase = (data) => {
    const frameType = data.data[number].frameType;

    return frameType === 'Spell'
      ? 'Activated a SPELL'
      : frameType === 'trap'
        ? 'Activated a TRAP'
        : 'Summoned the MONSTER';
  };

  const level = (level) => {
    let myLevels = [];
    for (let index = 0; index < level; index++) {
      myLevels.push(<img key={index} width={25} src={star} />)
    }
    return <div className="flex items-center gap-1">Level: {level} {myLevels}</div>
  }

  const tag = (tag, color) => {
    if (tag) {
      return <p style={{ backgroundColor: color }}
        className={`px-2 py-1 rounded w-fit ${color ? textColor(color) : ''}`}
      >{tag.toUpperCase()}</p>
    }
  }

  const atkNdef = (attack, defense) => {
    if (attack || defense) {
      return <p>
        {attack} ATK / {defense} DEF
      </p>
    }
  }

  return (
    <>
      <div>
        <div className='flex'>

          {
            loading && <div ref={loadPage} className='bg-black opacity-50 w-[100vw] h-[100vh] z-30 fixed top-0 right-0 flex items-center justify-center'>
              <div role="status">
                <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }

          <aside
            style={{ backgroundColor: palette[0] }}
            className={`w-[25vw] flex flex-col items-center h-[100vh] sticky top-0 left-0
              ${palette[0] ? textColor(palette[0]) : ''}
              `}>

            <div className='flex flex-col items-center justify-between pt-4'>
              <p className='font-bold text-3xl text-center h-[70px] ygoBold'>{data.data[number].name}</p>
              <img className='h-[350px] w-[250px] rounded-xl object-cover mt-3' src={imageSrc} alt="Image Doesnt Exist :(" />
              <button
                style={{ backgroundColor: palette[1] }}
                className={`px-3 py-2 mt-3 rounded-xl font-bold flex items-center gap-2 text-2xl pixel
                ${palette[1] ? textColor(palette[1]) : ''}
                `}
                onClick={fetchImage} >
                Random Card</button>
            </div>
          </aside>
          <main className="w-[75vw] flex items-center justify-center flex-col border-4 border-black">


            <div
              style={{
                backgroundColor: palette[1],
              }}
              className={`h-[100vh] p-5 flex items-center justify-around w-[100%] ${palette[1] ? textColor(palette[1]) : ''}`}>
              <div>

                <p> You {phrase(data)} <br />
                  <span className="font-bold text-4xl ygoBold"> {data.data[number].name}</span>
                </p>
                <p>This website generates random Color Palette <br /> base on this Card</p>
              </div>
              <div>
                <div className="flip-container">
                  <div className="flipper">
                    <div className="front">
                      <img width={325} className="object-cover hover:shadow-lg" src={imageSrc} alt="" />
                    </div>
                    <div className="back">
                      <img width={325} className="object-cover hover:shadow-lg" src={ygoBack} alt="" />
                    </div>
                    <div className="clear"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className='min-h-[75vh] p-14  grid grid-cols-3 gap-3'>
              {
                palette && palette.map((color, index) =>
                  <>
                    <ListItem key={index} color={color} />
                  </>
                )
              }
            </div>

            <div
              style={{ backgroundColor: palette[2] }}
              className={`h-[75vh] flex items-center justify-around p-12 w-[100%] ${palette[2] ? textColor(palette[2]) : ''}`}>
              <div className="flex flex-col w-[100%] items-start">
                <p className="font-bold text-4xl">{data.data[number].name}</p>
                <div className="flex items-center gap-2 mt-2">
                  {tag(data.data[number].frameType, palette[0])}
                  {tag(data.data[number].type, palette[1])}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {tag(data.data[number].race, palette[3])}
                  {tag(data.data[number].attribute, palette[4])}
                </div>

                <div className="mt-2">
                  {
                    data.data[number].level ?
                      level(data.data[number].level)
                      :
                      ''
                  }
                </div>
                <div className="font-bold text-xl mt-2">
                  {atkNdef(data.data[number].atk, data.data[number].def)}
                </div>

                <p
                  className="w-[70%] text-wrap ygoItalic"
                >{data.data[number].desc}</p>

              </div>
            </div>
          </main>
        </div>
      </div>

    </>
  )
}

export default App
