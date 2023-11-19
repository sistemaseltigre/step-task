'use client'
import Image from 'next/image'
import Link from 'next/link'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import AccountBalance from '../b-components/AccountBalance'

export default function Header() {
  return (
    <header className="bg-black text-white flex items-center px-8 py-4">
      <Link href="/">
        <Image src="/steplogo.svg" width={100} height={100} alt="Logo" />
      </Link>

      <div className="flex-1"></div>
      <AccountBalance />
      <WalletMultiButton />
    </header>
  )
}