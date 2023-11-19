'use client'
import { useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import Image from 'next/image'

export default function SwapForm() {
  const [currency1, setCurrency1] = useState('BTC')
  const [currency2, setCurrency2] = useState('ETH')
  const [amount1, setAmount1] = useState(0)
  const [amount2, setAmount2] = useState(0)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // submit form logic
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <form
        className="bg-gray-900 max-w-lg w-full p-4 rounded"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center">
          <input
            className="bg-gray-700 text-white rounded p-2 flex-1 mr-2"
            type="number"
            value={amount1}
            onChange={(e) => setAmount1(Number(e.target.value))}
          />
          <select
            className="bg-gray-700 text-white rounded p-2"
            value={currency1}
            onChange={(e) => setCurrency1(e.target.value)}
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        <div className="flex justify-center my-4 text-3xl">
          <FaExchangeAlt />
        </div>

        <div className="flex items-center">
          <input
            className="bg-gray-700 text-white rounded p-2 flex-1 mr-2"
            type="number"
            value={amount2}
            onChange={(e) => setAmount2(Number(e.target.value))}
          />
          <select
            className="bg-gray-700 text-white rounded p-2"
            value={currency2}
            onChange={(e) => setCurrency2(e.target.value)}
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 w-full hover:bg-blue-600">
          Swap
        </button>

        <div className="text-center text-gray-400 text-xs mt-2">
          Swaps powered by{' '}
          <Image
            src="/jupiter.svg"
            width={25}
            height={25}
            alt={''}
            className="h-5 inline ml-1"
          />
        </div>
      </form>
    </div>
  )
}