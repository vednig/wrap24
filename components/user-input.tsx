import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, SquareStackIcon as StackIcon, TreesIcon as ChristmasTree } from 'lucide-react'

interface UserInputProps {
  onSubmit: (githubUrl: string, stackOverflowUrl: string) => void
}

export default function UserInput({ onSubmit }: UserInputProps) {
  const [githubUrl, setGithubUrl] = useState('')
  const [stackOverflowUrl, setStackOverflowUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidUrl(githubUrl) ) {
      setError('Please enter valid GitHub and Stack Overflow profile URLs.')
      return
    }
    onSubmit(githubUrl, stackOverflowUrl)
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full flex flex-col justify-center items-center p-8  bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))]  "
    >
      <ChristmasTree className="w-24 h-24 mb-4 text-green-300" />
      <h1 className="text-4xl font-bold mb-8 text-white">Unwrap Your Dev Year!</h1>
      {error && (
        <div className="w-full max-w-md bg-red-600 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="github" className="block text-white mb-2">GitHub Profile URL</label>
          <input
            id="github"
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full p-2 rounded text-black"
            placeholder="https://github.com/yourusername"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stackoverflow" className="block text-white mb-2">Stack Overflow Profile URL (Optional)</label>
          <input
            id="stackoverflow"
            type="url"
            value={stackOverflowUrl}
            onChange={(e) => setStackOverflowUrl(e.target.value)}
            className="w-full p-2 rounded text-black"
            placeholder="https://stackoverflow.com/users/youruserid/username"
            
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-indigo-900 text-red-600 px-8 py-3 rounded-lg text-xl font-semibold"
          type="submit"
        ><span className='bg-gradient-to-r from-green-200 to-blue-500  bg-clip-text text-transparent'>
          Generate DevWrapped '24</span>
        </motion.button>
      </form>
    </motion.div>
  )
}
