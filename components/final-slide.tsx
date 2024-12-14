import { motion } from 'framer-motion'
import { TreesIcon as ChristmasTree, Gift, Snowflake, Share2 } from 'lucide-react'
import ProfileCard, { getProfileCardType } from './profile-card'
import { Button } from '@/components/ui/button'

interface StatProps {
  title: string
  value: string
  description: string
  color: string
}

interface DevStats {
  project_categories: {
    big: number
    medium: number
    small: number
  }
  total_commits: number
  total_commits_with_bug: number
  total_contributions: number
  total_lines_of_code_read: number
  total_linesize_of_code: number
  total_stackoverflow_contributions: number
}

interface FinalSlideProps {
  stats: StatProps[]
  devStats: DevStats
  githubUsername: string
}

export default function FinalSlide({ stats, devStats, githubUsername }: FinalSlideProps) {
  const profileCardType = getProfileCardType(devStats.total_contributions)

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?github=${githubUsername}&contributions=${devStats.total_contributions}&lines=${devStats.total_linesize_of_code}&bugs=${devStats.total_commits_with_bug}`
    const shareText = `Check out my developer stats for 2024! I wrote ${devStats.total_linesize_of_code.toLocaleString()} lines of code and made ${devStats.total_contributions} contributions!`
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My 2024 Dev Wrapped',
          text: shareText,
          url: shareUrl
        })
      } else {
        throw new Error('Web Share API not supported')
      }
    } catch (error) {
      console.error('Sharing failed:', error)
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
      alert('Share link copied to clipboard!')
    }
  }

  return (
    <div className="fixed inset-0 w-full overflow-y-auto bg-gradient-to-br from-red-600 to-green-600">
      <div className="container mx-auto px-4 py-8 min-h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center relative min-h-full"
        >
          <Snowflake className="absolute top-4 left-4 w-8 h-8 text-white opacity-50" />
          <Snowflake className="absolute top-4 right-4 w-8 h-8 text-white opacity-50" />
          <ChristmasTree className="w-24 h-24 mb-4 text-green-300" />
          <h1 className="text-4xl font-bold mb-8 text-white text-center">Your 2024 Dev Wrapped</h1>

          {/* Share Button */}
          <Button
            onClick={handleShare}
            className="mb-8 bg-white/20 hover:bg-white/30 text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share @{githubUsername}'s Wrapped
          </Button>

          {/* Profile Card with improved visibility */}
          <div className="w-full max-w-md mb-8 relative">
            <div className="absolute inset-0 bg-black/20 rounded-lg backdrop-blur-sm"></div>
            <ProfileCard
              type={profileCardType}
              username={githubUsername}
              contributions={devStats.total_contributions}
            />
          </div>

          {/* GitHub Contribution Graph */}
          <div className="w-full max-w-4xl mb-8 bg-black/20 p-4 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-white">Your GitHub Contributions</h2>
            <div className="overflow-x-auto">
              <iframe
                frameBorder="0"
                height="157px"
                width="690px"
                src={`https://git-graph.vercel.app/embed/${githubUsername}?showColorLegend=true&showWeekdayLabels=true&showMonthLabels=true&showTotalCount=true&blockMargin=2&blockRadius=0&blockSize=10&fontSize=14&weekStart=4&year=2024`}
                className="mx-auto"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-4xl">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-black/20 backdrop-blur-sm p-4 rounded-lg text-white"
              >
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Project Categories */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full max-w-4xl mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Project Breakdown</h2>
            <div className="flex flex-wrap justify-around gap-4">
              {Object.entries(devStats.project_categories).map(([size, count]) => (
                <div key={size} className="bg-black/20 backdrop-blur-sm p-4 rounded-lg text-white">
                  <p className="text-lg capitalize">{size} Projects</p>
                  <p className="text-3xl font-bold">{count}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-xl text-white text-center"
          >
            You've had an amazing year! May your code be merry and bright! 🎄✨
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
