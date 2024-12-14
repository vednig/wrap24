import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Database, SquareStackIcon as StackIcon, TreesIcon as ChristmasTree } from 'lucide-react'

interface AccountConnectionProps {
  onAccountsConnected: (accounts: string[]) => void
}

const accounts = [
  { name: 'GitHub', icon: Github },
  { name: 'Database', icon: Database },
  { name: 'Stack Overflow', icon: StackIcon }
]

export default function AccountConnection({ onAccountsConnected }: AccountConnectionProps) {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

  const toggleAccount = (accountName: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountName) 
        ? prev.filter(name => name !== accountName)
        : [...prev, accountName]
    )
  }

  const handleSubmit = () => {
    onAccountsConnected(selectedAccounts)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full flex flex-col justify-center items-center p-8 bg-gradient-to-br from-red-600 to-green-600"
    >
      <ChristmasTree className="w-24 h-24 mb-4 text-green-300" />
      <h1 className="text-4xl font-bold mb-8">Unwrap Your Dev Year!</h1>
      <p className="text-xl mb-8">Select the accounts you want to include in your Dev Wrapped</p>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {accounts.map(account => (
          <motion.button
            key={account.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-lg flex flex-col items-center justify-center ${
              selectedAccounts.includes(account.name) ? 'bg-green-500' : 'bg-red-700'
            }`}
            onClick={() => toggleAccount(account.name)}
          >
            <account.icon size={32} className="mb-2" />
            <span>{account.name}</span>
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-red-600 px-8 py-3 rounded-full text-xl font-semibold"
        onClick={handleSubmit}
      >
        Generate My Dev Wrapped
      </motion.button>
    </motion.div>
  )
}
