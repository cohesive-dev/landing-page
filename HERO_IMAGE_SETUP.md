# Hero Image Instructions

## Adding the City Illustration

To add the provided city illustration as the hero background:

1. Save the attached city illustration image as `hero-city-illustration.png` in the `/public` directory
2. Replace the placeholder background in the hero section

## Code Update

Replace the placeholder background div in `src/app/page.tsx` with:

```jsx
<div
  className='absolute inset-0 opacity-40'
  style={{
    backgroundImage: `url('/hero-city-illustration.png')`,
    backgroundSize: 'contain',
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat'
  }}
/>
```

## Alternative: Using Next.js Image Component

For better performance, you can also use the Next.js Image component:

```jsx
import Image from 'next/image'

// In the hero section background div:
;<Image
  src='/hero-city-illustration.png'
  alt='City illustration representing trade services'
  fill
  className='object-contain object-bottom opacity-40'
  priority
/>
```

This will provide:

- Optimized loading
- Better performance
- Responsive images
- SEO benefits
