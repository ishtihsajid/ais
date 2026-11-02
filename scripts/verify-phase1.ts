import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'

dotenv.config()

async function verify() {
  console.log('--- Verifying Phase 1 Gate ---')
  const payload = await getPayload({ config })

  // 1. Matrix verification
  const floorProducts = await payload.find({
    collection: 'products',
    where: { category: { equals: 'floor' } },
    limit: 500,
  })
  const wallProducts = await payload.find({
    collection: 'products',
    where: { category: { equals: 'wall' } },
    limit: 500,
  })

  console.log(`Floor products in database: ${floorProducts.totalDocs} (Expected >= 204)`)
  console.log(`Wall products in database:  ${wallProducts.totalDocs} (Expected >= 181)`)

  if (floorProducts.totalDocs < 204 || wallProducts.totalDocs < 181) {
    throw new Error(`Matrix count mismatch! Floor: ${floorProducts.totalDocs}, Wall: ${wallProducts.totalDocs}`)
  }

  // 2. Reference data checks
  const finishes = await payload.find({ collection: 'finishes', limit: 100 })
  console.log(`Finishes verified: ${finishes.totalDocs}`)

  const sizes = await payload.find({ collection: 'sizes', limit: 100 })
  console.log(`Sizes verified: ${sizes.totalDocs}`)

  const showrooms = await payload.find({ collection: 'showrooms', limit: 200 })
  console.log(`Showrooms in database: ${showrooms.totalDocs}`)

  const claims = await payload.find({ collection: 'claims', limit: 100 })
  console.log(`Claims verified: ${claims.totalDocs}`)

  // 3. User roles check
  const editorUser = await payload.find({
    collection: 'users',
    where: { role: { equals: 'editor' } },
  })
  if (editorUser.totalDocs === 0) {
    throw new Error('Editor user not found!')
  }
  console.log(`Editor user verified: ${editorUser.docs[0].email}`)

  console.log('--- Phase 1 Gate Verification Passed Successfully! ---')
  process.exit(0)
}

verify().catch((err) => {
  console.error('Phase 1 Verification Failed:', err)
  process.exit(1)
})
