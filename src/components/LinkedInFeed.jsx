import React from 'react'

function toEmbedSrc(url) {
  // Supports /feed/update/urn:li:activity:ID and /posts/...-activityID...
  try {
    const u = new URL(url)
    const path = u.pathname
    const m1 = path.match(/activity:(\d+)/)
    if (m1) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${m1[1]}`
    // Fallback: try to find a long digit ID in the URL (common in post slugs)
    const m2 = url.match(/(\d{10,})/)
    if (m2) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${m2[1]}`
  } catch {}
  return null
}

export default function LinkedInFeed({ src = '/social/linkedin.json', limit = 6 }) {
  const [posts, setPosts] = React.useState([])
  React.useEffect(() => {
    fetch(src, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => setPosts((data.posts || []).slice(0, limit)))
      .catch(() => setPosts([]))
  }, [src, limit])

  if (!posts.length) return null

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((p, i) => {
        const embed = toEmbedSrc(p)
        if (!embed) return null
        return (
          <div key={i} className="rounded-xl overflow-hidden border">
            <div className="relative w-full" style={{paddingTop:'140%'}}>
              <iframe
                loading="lazy"
                src={embed}
                title={`LinkedIn post ${i+1}`}
                className="absolute inset-0 w-full h-full"
                allow="encrypted-media; clipboard-write"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
