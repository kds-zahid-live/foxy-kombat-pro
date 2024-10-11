"use client"

import React, { useState, useEffect } from 'react';
// import Image from 'next/image'
import { DollarSign } from 'lucide-react';
import FoxKombat from "./img/fox.webp";

export default function FoxCounter() {
  const [count, setCount] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [dollars, setDollars] = useState([])

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setCount(prevCount => prevCount + 1)
    setIsZoomed(true)
    createDollarEffect(x, y)
    setTimeout(() => setIsZoomed(false), 150)
  }

  const createDollarEffect = (x, y) => {
    const newDollar = {
      id: Date.now(),
      x,
      y,
    }
    setDollars(prevDollars => [...prevDollars, newDollar])
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDollars(prevDollars => prevDollars.slice(1))
    }, 500)

    return () => clearTimeout(timer)
  }, [dollars])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      <h1 className="text-4xl font-bold mb-4"></h1>
      <div className="text-6xl font-bold text-yellow-400 mb-8" aria-live="polite">$
        {count.toLocaleString()}
      </div>
      <div className="relative">
        <div 
          className={`relative w-64 h-64 rounded-full bg-orange-600 overflow-hidden cursor-pointer transition-transform duration-150 ${isZoomed ? 'scale-110' : 'scale-100'}`}
          onClick={handleClick}
        >
          {/* <Image
            src="https://images.unsplash.com/photo-1500479694472-551d1fb6258d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm94fGVufDB8fDB8fHww"
            alt="Cute Fox"
            width={256}
            height={256}
            className="object-cover w-full h-full"
          /> */}
          <img 
            src={FoxKombat}
            alt="Cute Fox"
            width={256}
            height={256}
            className="object-cover w-full h-full"
          />
        </div>
        {dollars.map((dollar) => (
          <DollarSign
            key={dollar.id}
            className="absolute text-green-400 animate-float"
            style={{
              left: `${dollar.x}px`,
              top: `${dollar.y}px`,
              animation: `float 0.5s ease-out, fade-out 0.5s ease-out`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-4 text-lg"></p>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        @keyframes fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-float {
          animation: float 0.5s ease-out, fade-out 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}