import * as anchor from '@coral-xyz/anchor'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import stepIdl from '../util/idl/step.json'

async function createStake(
  connection: anchor.web3.Connection,
  publicKey: PublicKey,
  sendTransaction: any,
  wallet: any,
  tokenAmount: String
) {
  const idl = JSON.parse(JSON.stringify(stepIdl))

  const provider = new anchor.AnchorProvider(connection, wallet, {})
  anchor.setProvider(provider)
  const programId = new anchor.web3.PublicKey(
    'Stk5NCWomVN3itaFjLu382u9ibb5jMSHEsh6CuhaGjB'
  )
  const program = new anchor.Program(idl, programId, provider)

  const STEP_MINT = new PublicKey('StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT')
  const XSTEP_MINT = new PublicKey(
    'xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G'
  )

  const stepAddress = await getAssociatedTokenAddress(
    STEP_MINT,
    publicKey,
    true,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  )

  const xstepAddress = await getAssociatedTokenAddress(
    XSTEP_MINT,
    publicKey,
    true,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  )

  const [vaultPubkey, vaultBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [STEP_MINT.toBuffer()],
    program.programId
  )

  const amount = parseFloat(tokenAmount.toString())
  const anchorTokenAmount = new anchor.BN(amount * 10 ** 9)

  const stakeProcess = await program.methods

    .stake(vaultBump, new anchor.BN(anchorTokenAmount))
    .accounts({
      tokenMint: STEP_MINT,
      xTokenMint: XSTEP_MINT,
      tokenFrom: stepAddress,
      tokenFromAuthority: publicKey,
      tokenVault: vaultPubkey,
      xTokenTo: xstepAddress,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction()
  const transaction = new Transaction()
  transaction.add(stakeProcess)

  const {
    context: { slot: minContextSlot },
    value: { blockhash, lastValidBlockHeight },
  } = await connection.getLatestBlockhashAndContext()

  const signature = await sendTransaction(transaction, connection, {
    minContextSlot,
  })

  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature,
  })
}

export default function StakeToken({ tokenAmount }: { tokenAmount: String }) {
  const { connected, publicKey, sendTransaction, wallet } = useWallet()
  const { connection } = useConnection()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalText, setModalText] = useState('')

  const closeModal = () => {
    setIsModalOpen(false)
    setModalText('')
  }

  useEffect(() => {
    if (connected && publicKey && sendTransaction) {
      setModalText('Sending transaction...')
      setIsModalOpen(true)

      createStake(connection, publicKey, sendTransaction, wallet, tokenAmount)
        .then(() => {
          setModalText('Transaction confirmed!')
          setTimeout(() => closeModal(), 3000)
        })
        .catch((error) => {
          setModalText(`Error: ${error.message}`)
          setTimeout(() => closeModal(), 3000)
        })
    }
  }, [connected, connection, publicKey, sendTransaction, tokenAmount, wallet])

  if (!connected) {
    return null
  } else {
    return (
      <>
        {isModalOpen && (
          <div>
            <p>{modalText}</p>
          </div>
        )}
      </>
    )
  }
}