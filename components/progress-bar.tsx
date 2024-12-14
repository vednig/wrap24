import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100

  return (
    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-800">
      <motion.div
        className="h-full bg-green-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
