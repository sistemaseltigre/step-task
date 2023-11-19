import React, { useState, FormEvent } from 'react'
import UnstakeResult from '../b-components/Unstake'
import Image from 'next/image'

export default function Stake() {
  const [youUnstake, setyouUnstake] = useState('')
  const [sendUnstake, setsendUnstake] = useState(false)

  const handleUnstakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setyouUnstake(parseFloat(event.target.value).toFixed(2))
  }

  const handleUnstakeSubmit = (event: FormEvent) => {
    event.preventDefault()
    setsendUnstake(true)
  }

  return (
    <>
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold text-center">Unstake xSTEP</h1>

        <p className="text-center">Unstake xSTEP to receive STEP</p>

        <div className="bg-gray-800 p-4 rounded-md mt-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">xSTEP staking APY</h3>
            <p className="text-gray-400">14.41%</p>
          </div>

          <h3 className="text-lg font-bold mt-4">
            {' '}
            &quot; Where is my staking reward? &quot;
          </h3>

          <p className="text-gray-400 mt-2">
            xSTEP is a yield bearing asset. This means it is automatically worth
            more STEP over time. You don&apos;t need to claim any rewards, or do
            anything other than hold your xSTEP to benefit from this. Later,
            when you unstake your xSTEP you will receive more STEP than you
            initially deposited.
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-md mt-4">
          <h3 className="text-lg font-bold mb-2">Stake STEP</h3>
          <form onSubmit={handleUnstakeSubmit}>
            <div className="relative">
              <p className="text-gray-400">You unstake</p>
              <p className="text-gray-400 absolute top-7 left-2">
                <Image src="/logo-xstep.svg" width={32} height={32} alt={''} />
              </p>
              <p className="text-gray-400 absolute top-0 right-0">
                {/* TODO Balance: 1000 */}
              </p>
              <input
                className="bg-gray-700 w-full px-3 py-2 text-right rounded"
                type="number"
                placeholder="0.00"
                value={youUnstake}
                onChange={handleUnstakeChange}
              />
            </div>
            <div className="text-center">
              <Image
                className="mx-auto"
                src="/arrowd.png"
                width={50}
                height={50}
                alt={''}
              />
            </div>
            <div className="relative">
              <p className="text-gray-400">You receive</p>
              <p className="text-gray-400 absolute top-6 left-1">
                <Image src="/step.png" width={40} height={40} alt={''} />
              </p>
              <p className="text-gray-400 absolute top-0 right-0">
                {/* TODO Balance: 1000 */}
              </p>
              <input
                className="bg-gray-700 w-full px-3 py-2 text-right rounded"
                type="number"
                value={parseFloat(youUnstake) * 1.24}
                disabled
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-600"
            >
              Unstake
            </button>
          </form>
        </div>

        {sendUnstake && <UnstakeResult tokenAmount={youUnstake} />}
      </div>
    </>
  )
}