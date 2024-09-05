export function YouTubeUrlParse(url: string): string | null {
  // Regular expressions for different YouTube URL formats
  const regexes = [
    // Standard YouTube URL (with "?v=")
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    // Shortened YouTube URL (youtu.be)
    /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
  ]

  // Iterate through regular expressions and attempt to match
  for (const regex of regexes) {
    const match = regex.exec(url)
    if (match && match[1]) {
      return match[1] // Return the captured video ID
    }
  }

  // No match found, return null
  return null
}