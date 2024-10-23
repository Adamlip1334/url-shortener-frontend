'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl })
      })

      if (!response.ok) throw new Error('Failed to shorten URL')

      const data = await response.json() as { shortUrl: string }
      setShortUrl(data.shortUrl)
      toast.success('URL shortened successfully!')
    } catch (error) {
      toast.error('Error shortening URL')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-dark-card shadow-lg transition-colors duration-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-dark-text">URL Shortener</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Enter a long URL to get a shortened version</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-input dark:text-dark-text dark:border-gray-600"
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-dark-button dark:hover:bg-dark-button-hover transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </Button>
        </form>
        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-dark-input rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-dark-text">Shortened URL:</h3>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all dark:text-blue-400"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </CardContent>
      <ToastContainer position="bottom-right" theme="colored" />
    </Card>
  )
}
