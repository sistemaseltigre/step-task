import { FaTwitter, FaDiscord } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-transparent fixed bottom-0 left-0 right-0 text-center p-4">
      <div className="container mx-auto">
        <div className="flex justify-center mb-4">
          <a
            href="https://twitter.com/StepFinance_"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter className="text-2xl mx-4" />
          </a>
          <a
            href="https://discord.gg/Pab8wcH5Yt"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord className="text-2xl mx-4" />
          </a>
        </div>
        <p>&copy; STEP Finance 2023</p>
      </div>
    </footer>
  )
}
