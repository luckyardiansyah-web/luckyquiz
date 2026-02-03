export function decodeHTML(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return html
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
  }

  // Client-side using DOMParser
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}
