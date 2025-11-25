/**
 * SEO Injection Script for Griffon Systems
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
      <p>We integrate Avigilon, Verkada, and Openpath (Alta) for AI analytics, LPR, cloud management, and secure door access.</p>
    </section>
  `,
  // Add more mappings here...
}

// -----------------------
// 2. HELMET TEMPLATE
// -----------------------
const HELMET_TEMPLATE = (title, description) => `
  <Helmet>
    <title>${title}</title>
    <meta name="description" content="${description}" />
  </Helmet>
`

// -----------------------
// 3. SCAN CORRECT DIRECTORY
// -----------------------
const pagesDir = path.join(process.cwd(), 'src') // ← FIXED HERE

fs.readdirSync(pagesDir).forEach(file => {
  if (!SEO_BLOCKS[file]) return

  const filePath = path.join(pagesDir, file)
  let content = fs.readFileSync(filePath, 'utf-8')

  if (content.includes('<!-- SEO BLOCK INSERTED -->')) {
    console.log(`Skipping (already injected): ${file}`)
    return
  }

  // Add Helmet import
  if (!content.includes("react-helmet")) {
    content = content.replace("from \"react\"", "from \"react\"\nimport { Helmet } from \"react-helmet\"")
  }

  // Insert Helmet + SEO block
  content = content.replace(
    /return\s*\(\s*</,
    `return (
      <>
      ${HELMET_TEMPLATE(`Griffon Systems | ${file.replace('.jsx','')}`, "Illinois security systems")}
      <!-- SEO BLOCK INSERTED -->
      <main>
        ${SEO_BLOCKS[file]}
      </main>
      `
  )

  fs.writeFileSync(filePath, content)
  console.log(`Injected SEO block → ${file}`)
})

console.log("\n🎉 SEO injection complete!\n")
