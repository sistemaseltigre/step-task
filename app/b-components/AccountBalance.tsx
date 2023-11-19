import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import Image from 'next/image'

async function getStepAccount(publicKey: PublicKey, connection: any) {
  const STEP_MINT = new PublicKey('StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT')
  const XSTEP_MINT = new PublicKey(
    'xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G'
  )

  const getStepAccount = async () => {
    if (!publicKey) return null

    const stepAddress = await getAssociatedTokenAddress(
      STEP_MINT,
      publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )

    const StepBalance = await connection.getTokenAccountBalance(stepAddress)

    return {
      address: stepAddress,
      mint: STEP_MINT,
      balance: StepBalance.value.uiAmount,
    }
  }

  const getXstepAccount = async () => {
    if (!publicKey) return null

    const xstepAddress = await getAssociatedTokenAddress(
      XSTEP_MINT,
      publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )

    const xStepBalance = await connection.getTokenAccountBalance(xstepAddress)

    return {
      address: xstepAddress,
      mint: XSTEP_MINT,
      balance: xStepBalance.value.uiAmount,
    }
  }

  const stepAccount = await getStepAccount()
  const xstepAccount = await getXstepAccount()

  return { stepAccount, xstepAccount }
}

export default function AccountBalance() {
  const { connected, publicKey } = useWallet()
  const { connection } = useConnection()

  const [accounts, setAccounts] = useState<
    | {
        stepAccount: {
          address: PublicKey
          mint: PublicKey
          balance: number | null
        } | null
        xstepAccount: {
          address: PublicKey
          mint: PublicKey
          balance: number | null
        } | null
      }
    | undefined
  >()

  useEffect(() => {
    if (connected && publicKey) {
      getStepAccount(publicKey, connection).then(setAccounts)
    }
  }, [connected, connection, publicKey])

  if (!connected) {
    return null
  }

  return (
    <div className="flex">
      <div className="flex items-center rounded p-2">
        <Image src="/logo-step.png" width={25} height={25} alt={''} />

        <p className="ml-2 font-bold text-white">
          {accounts?.stepAccount?.balance?.toFixed(2) ?? 'Loading...'}
        </p>
      </div>

      <div className="flex items-center rounded p-2 ml-4">
        <Image src="/logo-xstep.svg" width={25} height={25} alt={''} />

        <p className="ml-2 font-bold text-white">
          {accounts?.xstepAccount?.balance?.toFixed(2) ?? 'Loading...'}
        </p>
      </div>
    </div>
  )
}