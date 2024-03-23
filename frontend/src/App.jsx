
import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios';
import ColorThief from "colorthief";
import jsonData from "../../backend/cardinfo.php.json"

import Loading from './components/Loading';
import Listitem from './components/Listitem';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Detailedinfo from './components/Detailedinfo';

import { toHex } from './helpfulfunction';
import Relatedcards from './components/Relatedcards';


function App() {
  const data = jsonData;
  const [number, setNumber] = useState(2562);

  const [loading, setLoading] = useState(false);
  const loadPage = useRef();

  const [imageSrc, setImageSrc] = useState('');
  const [palette, setPalette] = useState([]);

  const [similarCards, setSimilarCards] = useState([]);
  const findSimilar = (name) => {
    name = name.split(" ").pop().toLowerCase();
    const filteredObjects = data.data.filter(obj => obj.name.toLowerCase().includes(name));
    const first9Items = filteredObjects.slice(0, 9);

    setSimilarCards(first9Items);
  }


  const fetchImage = () => {
    setLoading(true);

    const newNum = Math.round(Math.random() * 10000);
    setNumber(newNum);
  };


  const searchCard = (name) => {
    name = name.toLowerCase();

    const foundIndex = data.data.findIndex(obj => obj.name.toLowerCase().includes(name));
    if (foundIndex !== -1) {
      setNumber(foundIndex)
    }

  }


  useEffect(() => {
    axios.get(`https://ygo-palette-bv3z.vercel.app/${number}`, { responseType: 'blob' })
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
            findSimilar(data.data[number].name)
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
  }, [number]);


  return (
    <>
      <div>
        <div className='flex'>

          {
            loading && <div ref={loadPage} className='bg-black opacity-50 w-[100vw] h-[100vh] z-30 fixed top-0 right-0 flex items-center justify-center'>
              <Loading />
            </div>
          }

          <Sidebar searchCard={searchCard} palette={palette} data={data} number={number} imageSrc={imageSrc} fetchImage={fetchImage} />

          <main className="w-[75vw] flex items-center justify-center flex-col border-4 border-black">

            {/* Hero Section with the image of the card spinning */}
            <Hero palette={palette} data={data} number={number} />


            {/* Palette Items Listed */}
            <div className='min-h-[75vh] p-14 grid grid-cols-3 gap-3'>
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


            <Relatedcards findSimilar={findSimilar} searchCard={searchCard} similarCards={similarCards} palette={palette} data={data} number={number} />
          </main>
        </div>
      </div>

    </>
  )
}

export default App