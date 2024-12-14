import { useEffect, useRef } from 'react'

export default function GitHubCommitChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        // Sample data - replace with actual GitHub API data in a real application
        const commitData = Array.from({ length: 52 }, () => 
          Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
        )

        const cellSize = 14
        const cellGap = 2
        const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']

        commitData.forEach((week, x) => {
          week.forEach((day, y) => {
            ctx.fillStyle = colors[day]
            ctx.fillRect(
              x * (cellSize + cellGap),
              y * (cellSize + cellGap),
              cellSize,
              cellSize
            )
          })
        })
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      width={52 * 16} 
      height={7 * 16} 
      className="w-full h-auto bg-gray-900 rounded-lg"
    />
  )
}
