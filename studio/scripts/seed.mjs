// Copies the 6 listings that are on the current website into Sanity, including videos and photos.
// Usage:  SANITY_TOKEN=your_editor_token npm run seed
import {createClient} from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_TOKEN
if (!projectId || !token) {
  console.error('Set SANITY_STUDIO_PROJECT_ID (in .env or the shell) and SANITY_TOKEN (an Editor token).')
  process.exit(1)
}
const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})
const MEDIA = path.resolve('../site/media')

const up = async (type, file) => {
  const a = await client.assets.upload(type, fs.createReadStream(path.join(MEDIA, file)), {filename: file})
  return {_type: type, asset: {_type: 'reference', _ref: a._id}}
}
const photos = async (files) => Promise.all(files.map(async (f) => ({...(await up('image', f)), _key: f})))
const eg = 'Igwuruta, Port Harcourt, Rivers State'

const items = [
  {title: 'Newly Built 4 Bedroom Duplex', status: 'sale', badge: 'For sale', location: 'Cocaine Estate Extension B, Okporo, Port Harcourt', price: '₦220m', priceNote: 'asking price', features: ['Spacious rooms', 'Study room', 'Family lounge', 'One plot of land', 'Title: Deed'], duration: '1:01', video: 'tour-1.mp4', poster: 'tour-1.jpg'},
  {title: 'Exquisite 6 Bedroom Duplex', status: 'sale', badge: 'Distress sale', hot: true, location: 'Off Sars Road, Port Harcourt', price: '₦100m', priceNote: 'negotiable', features: ['Ensuite rooms', 'Gated, serene estate', '1.5 plots'], duration: '1:14', video: 'tour-2.mp4', poster: 'tour-2.jpg'},
  {title: 'Brand New 4 Bedroom Duplex + Service Quarters', status: 'sale', badge: 'Price reduced', location: 'Off Circular Road, Alcon, Woji, Port Harcourt', price: '₦480m', oldPrice: '₦500m', features: ['Service quarters', 'Secure neighbourhood', '2 plots', 'Deed of Conveyance'], duration: '1:23', video: 'tour-3.mp4', poster: 'tour-3.jpg'},
  {title: '4 Bedroom Duplex with Gatehouse', status: 'sale', badge: 'Investor deal', location: 'Sars Road, Port Harcourt', price: '₦200m', features: ['Tarred road', 'Federal light', 'Close to major road', '300 sqm', 'Deed of Conveyance'], duration: '1:36', video: 'tour-4.mp4', poster: 'tour-4.jpg'},
  {title: '21-Room Property, Igwuruta', status: 'other', badge: 'New listing', location: eg, features: ['21 rooms', 'Interlocked compound', 'Balconies', 'Tiled finish'], photos: ['photo-1.jpg', 'photo-2.jpg']},
  {title: '4 Bedroom Bungalow, Igwuruta', status: 'other', badge: 'New listing', location: eg, features: ['4 bedrooms', 'Bungalow'], note: 'Photo shown is an artist’s impression.', duration: '0:12', video: 'tour-5.mp4', poster: 'tour-5.jpg', photos: ['photo-3.jpg']},
]

for (const [n, it] of items.entries()) {
  const doc = {_id: `property-${n + 1}`, _type: 'property', order: n + 1, published: true, hot: false, ...it}
  if (it.video) doc.video = await up('file', it.video)
  if (it.poster) doc.poster = await up('image', it.poster)
  if (it.photos) doc.photos = await photos(it.photos)
  await client.createOrReplace(doc)
  console.log('✓', it.title)
}
console.log('Done. Open the Studio to see your listings.')
