import { Helmet } from 'react-helmet-async'

export function Seo({
  title,
  description,
  image = '/logo.png',
  url = 'https://example.com',
}) {
  const metaTitle = title ? `${title} | HIC Career Interest` : 'HIC Career Interest'
  const metaDescription =
    description ??
    'Register your interest in the HIC Career Initiative and connect with skill development opportunities.'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: metaTitle,
    url,
    description: metaDescription,
  }

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="theme-color" content="hsl(43 78% 52%)" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
