'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'

export default function ModalConnectWallet() {
  const { connected } = useWallet()

  if (connected) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded p-6 flex flex-col items-center">
        <Image
          src="/step-disconnected-logo.svg"
          width={64}
          height={64}
          alt="Disconnected"
          className="mb-4"
        />

        <h2 className="text-center text-lg mb-4 text-white">
          Connect your wallet to continue
        </h2>

        <WalletMultiButton />
      </div>
    </div>
  )
}
