'use client'
import React, { useState } from 'react'
import SwapForm from './Swap'
import Stake from './Stake'
import Image from 'next/image'
import Unstake from './Unstake'

const Navigation: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)

  return (
    <>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setSelectedMenu('swap')}
          className="text-white px-4 py-2 rounded"
        >
          Swap
        </button>
        <button
          onClick={() => setSelectedMenu('stake')}
          className="text-white px-4 py-2 rounded"
        >
          Stake
        </button>
        <button
          onClick={() => setSelectedMenu('unstake')}
          className="text-white px-4 py-2 rounded"
        >
          Unstake
        </button>
      </div>
      {selectedMenu === 'swap' && <SwapForm />}
      {selectedMenu === 'stake' && <Stake />}
      {selectedMenu === 'unstake' && <Unstake />}
      {selectedMenu === null && (
        <>
          <div className="max-w-lg mx-auto">
            <div className="bg-gray-800 p-8 rounded-md mt-8 flex items-center">
              <div className="rounded-full overflow-hidden w-20 h-20 mr-2">
                <Image src="/step-guy.jpg" width={100} height={100} alt={''} />
              </div>
              <div className="text-center">
                <p className="mb-4">
                  You can swap or stake your STEP tokens here.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navigation