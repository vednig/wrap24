import { motion } from 'framer-motion'
import { TreesIcon as ChristmasTree, Gift, Coffee, GitCommit, GitPullRequest, HelpCircle } from 'lucide-react'

interface StatProps {
  title: string
  value: string
  description: string
  color: string
}

export default function StatSlide({ stat }: { stat: StatProps }) {
  const getIcon = (title: string) => {
    switch (title) {
      case "Lines of Code":
        return <ChristmasTree className="w-16 h-16 mb-4" />
      case "Bugs Squashed":
        return <Gift className="w-16 h-16 mb-4" />
      case "Total Commits":
        return <GitCommit className="w-16 h-16 mb-4" />
      case "GitHub Contributions":
        return <GitPullRequest className="w-16 h-16 mb-4" />
      case "Stack Overflow Contributions":
        return <HelpCircle className="w-16 h-16 mb-4" />
      default:
        return <Coffee className="w-16 h-16 mb-4" />
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full h-full flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br ${stat.color}`}
    >
      {getIcon(stat.title)}
      <h2 className="text-2xl mb-4">{stat.title}</h2>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-6xl font-bold mb-4"
      >
        {stat.value}
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl"
      >
        {stat.description}
      </motion.p>
    </motion.div>
  )
}
