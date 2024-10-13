import React, { useState, useEffect } from 'react';
import { Pickaxe, Zap, Users, DollarSign, Gift } from 'lucide-react';

import Taptap from "./img/foxyfire.png";

const FoxyKombat = () => {
  const MAX_LEVEL = 10;
  const MAX_BOOST_COST = 100000000;

  const [coinCount, setCoinCount] = useState(() => {
    const savedCoinCount = localStorage.getItem('coinCount');
    return savedCoinCount ? parseInt(savedCoinCount, 10) : 0;
  });
  const [earnPerTap, setEarnPerTap] = useState(() => {
    const savedEarnPerTap = localStorage.getItem('earnPerTap');
    return savedEarnPerTap ? parseInt(savedEarnPerTap, 10) : 12;
  });
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem('level');
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });
  const [boostCost, setBoostCost] = useState(100);
  const [isZoomed, setIsZoomed] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    if (level < MAX_LEVEL) {
      setBoostCost( boostCost * 2 * level);
    } else {
      setBoostCost(MAX_BOOST_COST);
    }
  }, [level]);

  useEffect(() => {
    localStorage.setItem('coinCount', coinCount.toString());
    localStorage.setItem('earnPerTap', earnPerTap.toString());
    localStorage.setItem('level', level.toString());
  }, [coinCount, earnPerTap, level]);

  const handleFoxClick = (event) => {
    setCoinCount(prevCount => prevCount + earnPerTap);
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

  const handleBoost = () => {
    if (coinCount >= boostCost && level < MAX_LEVEL) {
      setCoinCount(prevCount => prevCount - boostCost);
      setLevel(prevLevel => prevLevel + 1);
      setEarnPerTap(prevEarn => prevEarn * 2);
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-orange-900 min-h-screen text-white font-sans">
      <div className="max-w-sm mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="rounded-full p-2">
            {/* <img src={Echonevimg} alt="econev" className="w-10 h-10" /> */}
          </div>
          <h1 className="text-2xl text-center font-bold">Foxy Kombat</h1>
          <div className="rounded-full p-2">
            {/* <img src="/placeholder.svg?height=40&width=40" alt="Binance" className="w-10 h-10" /> */}
          </div>
        </header>

        <div className="flex justify-between mb-6">
          <div className="bg-gray-800 rounded-lg p-2 flex-1 mr-2">
            <p className="text-orange-500">Earn per tap</p>
            <p className="text-xl">${earnPerTap}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-2 flex-1 mx-2">
            <p className="text-blue-500">Coins to level up</p>
            <p className="text-xl">{boostCost.toLocaleString()}</p>
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
              style={{width: `${(level / MAX_LEVEL) * 100}%`}}
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
            <span className="text-lg">{boostCost.toLocaleString()} / {boostCost.toLocaleString()}</span>
          </div>
          <button 
            className={`bg-orange-500 text-white px-4 py-2 rounded-full ${coinCount < boostCost || level === MAX_LEVEL ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleBoost}
            disabled={coinCount < boostCost || level === MAX_LEVEL}
          >
            Boost
          </button>
        </div>

        <nav className="flex justify-between bg-gray-800 rounded-full p-2">
          <button className="p-2">
                      <Zap size={24} />
          </button>
          <button className="p-2">
                      {/* <img src="/placeholder.svg?height=24&width=24" alt="Mine" className="w-6 h-6" /> */}
                      <Pickaxe size={24} />
          </button>
          <button className="p-2">
            <Users size={24} />
          </button>
          <button className="p-2">
            <DollarSign size={24} />
          </button>
          <button className="p-2">
            <Gift size={24} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default FoxyKombat;