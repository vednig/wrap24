'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StatSlide from './stat-slide'
import ProgressBar from './progress-bar'
import FinalSlide from './final-slide'
import UserInput from './user-input'
import Snowfall from './snowfall'

interface DevStats {
  project_categories: {
    big: number;
    medium: number;
    small: number;
  };
  total_commits: number;
  total_commits_with_bug: number;
  total_contributions: number;
  total_lines_of_code_read: number;
  total_linesize_of_code: number;
  total_stackoverflow_contributions: number;
}

export default function DevWrapped() {
  const [currentSlide, setCurrentSlide] = useState(-1)
  const [isFinished, setIsFinished] = useState(false)
  const [devStats, setDevStats] = useState<DevStats | null>(null)
  const [error, setError] = useState<{ message: string; dismiss: () => void } | null>(null)
  const [githubUsername, setGithubUsername] = useState<string>('')

  useEffect(() => {
    // Check for URL parameters on mount
    const urlParams = new URLSearchParams(window.location.search)
    const urlGithubUsername = urlParams.get('github')
    const urlContributions = urlParams.get('contributions')
    const urlLines = urlParams.get('lines')
    const urlBugs = urlParams.get('bugs')

    // If we have URL parameters, create mock data from them
    if (urlGithubUsername && urlContributions && urlLines && urlBugs) {
      setGithubUsername(urlGithubUsername)
      setDevStats({
        project_categories: {
          big: Math.floor(Number(urlContributions) * 0.1),
          medium: Math.floor(Number(urlContributions) * 0.3),
          small: Math.floor(Number(urlContributions) * 0.6)
        },
        total_commits: Math.floor(Number(urlContributions) * 1.5),
        total_commits_with_bug: Number(urlBugs),
        total_contributions: Number(urlContributions),
        total_lines_of_code_read: Number(urlLines) * 10,
        total_linesize_of_code: Number(urlLines),
        total_stackoverflow_contributions: Math.floor(Number(urlContributions) * 0.1)
      })
      setCurrentSlide(0)
    }
  }, [])

  useEffect(() => {
    if (currentSlide >= 0 && currentSlide < stats.length) {
      const timer = setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
      }, 5000)
      return () => clearTimeout(timer)
    } else if (currentSlide === stats.length) {
      setIsFinished(true)
    }
  }, [currentSlide])

  const extractProfileInfo = (githubUrl: string, stackOverflowUrl: string) => {
    const githubUsername = githubUrl.split('/').pop() || ''
    const stackOverflowId = stackOverflowUrl.split('/')[4] || ''
    setGithubUsername(githubUsername)
    return { githubUsername, stackOverflowId }
  }

  const fetchDevStats = async (githubUrl: string, stackOverflowUrl: string) => {
    try {
      const { githubUsername, stackOverflowId } = extractProfileInfo(githubUrl, stackOverflowUrl)
      const response = await fetch(`https://devwrap.betaco.tech/developer-stats?github_username=${githubUsername}&stackid=${stackOverflowId}`, {
        mode: 'cors', // Explicitly set CORS mode
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: DevStats = await response.json()
      setDevStats(data)
      setCurrentSlide(0)
    } catch (err) {
      console.error('Error fetching developer stats:', err)
      setError({
        message: 'Failed to fetch developer stats. Using mock data for demonstration.',
        dismiss: () => setError(null)
      })
      // Use mock data as fallback
      setDevStats(getMockDevStats())
      setCurrentSlide(0)
    }
  }

  const getMockDevStats = (): DevStats => ({
    project_categories: {
      big: 3,
      medium: 7,
      small: 15
    },
    total_commits: 250,
    total_commits_with_bug: 10,
    total_contributions: 75,
    total_lines_of_code_read: 300000,
    total_linesize_of_code: 20000,
    total_stackoverflow_contributions: 5
  })

  const stats = devStats
    ? [
        {
          title: "Lines of Code",
          value: devStats.total_linesize_of_code.toLocaleString(),
          description: "That's enough to wrap around the North Pole!",
          color: "from-red-500 to-green-500"
        },
        {
          title: "Bugs Squashed",
          value: devStats.total_commits_with_bug.toLocaleString(),
          description: "Santa's elves couldn't have done better!",
          color: "from-green-400 to-red-500"
        },
        {
          title: "Total Commits",
          value: devStats.total_commits.toLocaleString(),
          description: "Each commit, a gift to your projects!",
          color: "from-yellow-400 to-red-500"
        },
        {
          title: "GitHub Contributions",
          value: devStats.total_contributions.toLocaleString(),
          description: "Your code tree is taller than a Christmas tree!",
          color: "from-green-500 to-red-400"
        },
        {
          title: "Stack Overflow Contributions",
          value: devStats.total_stackoverflow_contributions.toLocaleString(),
          description: "You've helped spread more cheer than Santa!",
          color: "from-red-400 to-green-500"
        }
      ]
    : []

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-red-900 to-green-900 text-white overflow-hidden relative">
      <Snowfall />
      <AnimatePresence mode="wait">
        {currentSlide === -1 && (
          <UserInput onSubmit={fetchDevStats} />
        )}
        {currentSlide >= 0 && !isFinished && stats[currentSlide] && (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full flex flex-col justify-center items-center"
          >
            <StatSlide stat={stats[currentSlide]} />
          </motion.div>
        )}
        {isFinished && devStats && (
          <FinalSlide 
            stats={stats} 
            devStats={devStats} 
            githubUsername={githubUsername}
          />
        )}
      </AnimatePresence>
      {currentSlide >= 0 && !isFinished && (
        <ProgressBar current={currentSlide} total={stats.length} />
      )}
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-4 text-center">
          {error.message}
          <button 
            onClick={error.dismiss} 
            className="ml-4 bg-white text-red-600 px-2 py-1 rounded"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  )
}
