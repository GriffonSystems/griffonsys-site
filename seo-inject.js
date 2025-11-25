/**
 * SEO Injection Script for Griffon Systems
 * ----------------------------------------
 * This script automatically injects:
 *   • SEO <Helmet> tags
 *   • SEO static HTML blocks
 * Into all matching React pages inside /src/pages
 *
 * Run: node seo-inject.js
 */

import fs from 'fs'
import path from 'path'

// -----------------------
// 1. SEO BLOCKS MAPPING
// -----------------------
const SEO_BLOCKS = {
  "Home.jsx": `
    <section className="max-w-4xl mx-auto px-4 py-6">
      <h1>Chicago Security Cameras & Access Control Installation</h1>
      <p>Griffon Systems provides enterprise video surveillance, access control, wireless backhaul, intercom, and cloud-managed security systems across Chicago and Northern Illinois.</p>
      <p>We integrate Avigilon, Verkada, Openpath (Alta), Siklu, and UniFi to deliver complete, turn-key security deployments.</p>
    </section>
  `,
  "Solutions.jsx": `
    <section className="max-w-4xl mx-auto px-4 py-6">
      <h1>Security Solutions for Illinois Businesses</h1>
      <p>Griffon Systems delivers enterprise surveillance, access control, wireless networks, and intercom deployments across Illinois.</p>
      <p>We integrate Avigilon, Verkada, and Openpath (Alta) systems for AI analytics, LPR, cloud management, and secure door access.</p>
    </section>
  `,
  "Industries.jsx": `
    <section className="max-w-4xl mx-auto px-4 py-6">
      <h1>Security Solutions for Illinois Industries</h1>
      <p>We support manufacturing, schools, municipalities, healthcare, and retail with integrated camera, access control, and wireless systems.</p>
    </section>
  `,

  // Add more page mappings here...
}

// -----------------------
// 2. HELMET TAGS TEMPLATE
// -----------------------
const HELMET_TEMPLATE = (title, description) => `
  <Helmet>
    <title>${title}</title>
    <meta name="description" content="${description}" />
  </Helmet>
`

// -----------------------
// 3. Process Pages Folder
// -----------------------
const pagesDir = path.join(process.cwd(), 'src', 'pages')

fs.readdirSync(pagesDir).forEach(file => {
  if (!SEO_BLOCKS[file]) return // skip if no SEO block

  const filePath = path.join(pagesDir, file)
  let content = fs.readFileSync(filePath, 'utf-8')

  // Avoid double-inserting
  if (content.includes('<!-- SEO BLOCK INSERTED -->')) {
    console.log(`Skipping (already injected): ${file}`)
    return
  }

  // 3A. Add Helmet import if missing
  if (!content.includes("react-helmet")) {
    content = content.replace("from 'react'", "from 'react'\nimport { Helmet } from 'react-helmet'")
  }

  // 3B. Insert Helmet block after opening component
  content = content.replace(
    /return\s*\(\s*</,
    `return (
      <>
      ${HELMET_TEMPLATE(`Griffon Systems | ${file.replace('.jsx', '')}`, "Illinois security systems")}
      <!-- SEO BLOCK INSERTED -->
      <main>
        ${SEO_BLOCKS[file]}
      </main>
      `
  )

  fs.writeFileSync(filePath, content)
  console.log(`Injected SEO block → ${file}`)
})

console.log("\n🎉 SEO injection complete! Commit and push your changes.\n")
