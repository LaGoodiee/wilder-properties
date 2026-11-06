import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'property',
  title: 'Property listing',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', description: 'e.g. Newly Built 4 Bedroom Duplex', validation: (r) => r.required()}),
    defineField({
      name: 'status',
      title: 'Listing type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'For sale', value: 'sale'},
          {title: 'For rent', value: 'rent'},
          {title: 'Not decided (shows under "All" only)', value: 'other'},
        ],
      },
      initialValue: 'sale',
      validation: (r) => r.required(),
    }),
    defineField({name: 'badge', title: 'Badge text', type: 'string', description: 'Small label on the photo, e.g. Distress sale, Price reduced, New listing. Leave empty for "For sale" / "For rent".'}),
    defineField({name: 'hot', title: 'Make the badge red (urgent deals)', type: 'boolean', initialValue: false}),
    defineField({name: 'location', title: 'Location', type: 'string', description: 'e.g. Off Sars Road, Port Harcourt'}),
    defineField({name: 'price', title: 'Price', type: 'string', description: 'Type it as it should appear, e.g. ₦220m or ₦1.2m / year. Leave empty for "Call for price".'}),
    defineField({name: 'oldPrice', title: 'Old price (optional)', type: 'string', description: 'Shown crossed out next to the price.'}),
    defineField({name: 'priceNote', title: 'Price note (optional)', type: 'string', description: 'e.g. negotiable, asking price'}),
    defineField({name: 'features', title: 'Features', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}, description: 'Short tags, e.g. 4 bedrooms, Study room, 2 plots, Deed of Conveyance. Press Enter after each.'}),
    defineField({name: 'video', title: 'Video', type: 'file', options: {accept: 'video/mp4,video/webm'}, description: 'MP4 works best. Shorter and compressed videos load faster for visitors.'}),
    defineField({name: 'duration', title: 'Video length', type: 'string', description: 'e.g. 1:36'}),
    defineField({name: 'poster', title: 'Video thumbnail (optional)', type: 'image', options: {hotspot: true}, description: 'If empty, the first photo is used.'}),
    defineField({name: 'photos', title: 'Photos', type: 'array', of: [{type: 'image', options: {hotspot: true}}], options: {layout: 'grid'}}),
    defineField({name: 'note', title: 'Small note (optional)', type: 'string', description: 'e.g. Photo shown is an artist’s impression.'}),
    defineField({name: 'order', title: 'Display order', type: 'number', description: 'Smaller numbers appear first. Listings with the same number show newest first.', initialValue: 100}),
    defineField({name: 'published', title: 'Show on website', type: 'boolean', description: 'Turn off to hide a listing (for example once sold) without deleting it.', initialValue: true}),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'location', poster: 'poster', photo: 'photos.0', on: 'published'},
    prepare: ({title, subtitle, poster, photo, on}) => ({title: (on === false ? '(hidden) ' : '') + title, subtitle, media: poster || photo}),
  },
})
