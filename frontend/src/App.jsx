
import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios';
import ColorThief from "colorthief";


import Loading from './components/Loading';
import Listitem from './components/Listitem';

import {toHex } from './helpfulfunction';

import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Detailedinfo from './components/Detailedinfo';

function App() {
  const [number, setNumber] = useState(2562);

  const [loading, setLoading] = useState(false);
  const loadPage = useRef();

  const [palette, setPalette] = useState([]);

  const [data, setData] = useState('');


  const fetchImage = () => {
    setLoading(true);

    const newNum = Math.round(Math.random() * 10000);
    setNumber(newNum);
  };

  useEffect(() => {
    axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', { responseType: 'json' })
      .then(res => {
        setData(res.data);
      })
  }, [])


  useEffect(() => {
    axios.get(`http://localhost:3001/${number}`, { responseType: 'blob' })
      .then(response => {

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
  }, [data, number]);

  


  
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
        {
          data && <>
            <div className='flex'>

              {
                loading && <div ref={loadPage} className='bg-black opacity-50 w-[100vw] h-[100vh] z-30 fixed top-0 right-0 flex items-center justify-center'>
                  <Loading />
                </div>
              }

              <Sidebar palette={palette} data={data} number={number} fetchImage={fetchImage} />

              <main className="w-[75vw] flex items-center justify-center flex-col border-4 border-black">
                {/* Hero Section with the image of the card spinning */}
                <Hero palette={palette} data={data} number={number} />


                {/* Palette Items Listed */}
                <div className='min-h-[75vh] p-14  grid grid-cols-3 gap-3'>
                  {
                    palette && palette.map((color, index) =>
                      <>
                        <Listitem key={index} color={color} />
                      </>
                    )
                  }
                </div>


                {/* Detailed Card Info such as levels and description etc */}
                <Detailedinfo palette={palette} data={data} number={number} />

              </main>
            </div>
          </>
        }
      </div>

    </>
  )
}

export default App
