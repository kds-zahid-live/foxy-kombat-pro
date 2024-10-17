import React, { useState, useEffect } from 'react';
import { Zap, Users, DollarSign, Gift } from 'lucide-react';
import Taptap from "./img/foxyfire.png";

const FoxyKombat = () => {
  const MAX_LEVEL = 10;
  const BASE_LEVEL_COST = 1000;

  const [coinCount, setCoinCount] = useState(() => {
    return parseInt(localStorage.getItem('coinCount') || '0', 10);
  });
  const [earnPerTap, setEarnPerTap] = useState(() => {
    return parseInt(localStorage.getItem('earnPerTap') || '12', 10);
  });
  const [level, setLevel] = useState(() => {
    return parseInt(localStorage.getItem('level') || '1', 10);
  });
  const [coinsForCurrentLevel, setCoinsForCurrentLevel] = useState(() => {
    return parseInt(localStorage.getItem('coinsForCurrentLevel') || '0', 10);
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  const calculateLevelCost = (level) => BASE_LEVEL_COST * Math.pow(2, level - 1);

  useEffect(() => {
    localStorage.setItem('coinCount', coinCount.toString());
    localStorage.setItem('earnPerTap', earnPerTap.toString());
    localStorage.setItem('level', level.toString());
    localStorage.setItem('coinsForCurrentLevel', coinsForCurrentLevel.toString());
  }, [coinCount, earnPerTap, level, coinsForCurrentLevel]);

  useEffect(() => {
    const currentLevelCost = calculateLevelCost(level);
    if (coinsForCurrentLevel >= currentLevelCost && level < MAX_LEVEL) {
      setLevel(prevLevel => prevLevel + 1);
      setCoinsForCurrentLevel(prevCoins => prevCoins - currentLevelCost);
      setEarnPerTap(prevEarn => prevEarn * 2);
    }
  }, [coinsForCurrentLevel, level]);

  const handleFoxClick = (event) => {
    setCoinCount(prevCount => prevCount + earnPerTap);
    setCoinsForCurrentLevel(prevCoins => prevCoins + earnPerTap);
    createBubble(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setIsZoomed(true);
    setTimeout(() => setIsZoomed(false), 200);
  };

  const createBubble = (x, y) => {
    const newBubble = {
      id: Date.now(),
      x: x,
      y: y,
    };
    setBubbles(prevBubbles => [...prevBubbles, newBubble]);
    setTimeout(() => {
      setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== newBubble.id));
    }, 1000);
  };

  const progressPercentage = () => {
    const currentLevelCost = calculateLevelCost(level);
    return Math.min((coinsForCurrentLevel / currentLevelCost) * 100, 100);
  };

  return (
    <div className="bg-gradient-to-b from-black to-orange-900 min-h-screen text-white font-sans">
      <div className="max-w-sm mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className=" rounded-full p-2">
            {/* <img src="/placeholder.svg?height=40&width=40" alt="econev" className="w-10 h-10" /> */}
          </div>
          <h1 className="text-2xl font-bold">Foxy Kombat</h1>
          <div className=" rounded-full p-2">
            {/* <img src="/placeholder.svg?height=40&width=40" alt="Binance" className="w-10 h-10" /> */}
          </div>
        </header>

        <div className="flex justify-between mb-6 text-center">
          <div className="bg-gray-800 rounded-lg p-2 flex-1 mr-2">
            <p className="text-orange-500">Earn per tap</p>
            <p className="text-xl">${earnPerTap}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-2 flex-1 mx-2">
            <p className="text-blue-500">Coins to level up</p>
            <p className="text-xl">{calculateLevelCost(level).toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-2 flex-1 ml-2">
            <p className="text-green-500">Profit per hour</p>
            <p className="text-xl">$636.31K</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center">
            <div className="bg-orange-500 rounded-full p-2 mr-2">
              <DollarSign size={24} />
            </div>
            <span className="text-4xl font-bold">{coinCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Epic</span>
            <span>Level {level}/{level === MAX_LEVEL ? 'Max' : MAX_LEVEL}</span>
          </div>
          <div className="bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{width: `${progressPercentage()}%`}}
            ></div>
          </div>
        </div>

        <div 
          className={`bg-blue-600 rounded-full p-0 mb-6 cursor-pointer relative overflow-hidden transition-transform duration-200 ${isZoomed ? 'scale-105' : ''}`} 
          onClick={handleFoxClick}
        >
          <img 
            src={Taptap} 
            alt="Foxy character" 
            className="w-full"
          />
          {bubbles.map(bubble => (
            <div 
              key={bubble.id} 
              className="absolute text-yellow-400 text-2xl font-bold animate-float-dollar"
              style={{
                left: `${bubble.x}px`,
                top: `${bubble.y}px`,
                transform: `translateY(-${Math.random() * 50 + 50}px) translateX(${(Math.random() - 0.5) * 40}px)`,
                transition: 'all 1s ease-out',
                opacity: 0
              }}
            >
              +${earnPerTap}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Zap className="text-yellow-400 mr-2" />
            <span className="text-lg">{coinsForCurrentLevel.toLocaleString()} / {calculateLevelCost(level).toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FoxyKombat;