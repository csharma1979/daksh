export const OrganizationSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Daksh Interiors",
          "url": "https://dakshinteriors.in",
          "logo": "https://dakshinteriors.in/favicon.ico",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9876543210", 
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          },
          "sameAs": [
            "https://www.instagram.com/dakshinteriors",
            "https://www.facebook.com/dakshinteriors"
          ]
        })
      }}
    />
  );
};

export const LocalBusinessSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "Daksh Interiors",
          "image": "https://dakshinteriors.in/inspiration/vastu-hero.png",
          "@id": "https://dakshinteriors.in",
          "url": "https://dakshinteriors.in",
          "telephone": "+91-9876543210",
          "priceRange": "$$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Whitefield",
            "addressLocality": "Bangalore",
            "addressRegion": "KA",
            "postalCode": "560066",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 12.9698,
            "longitude": 77.7499
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "19:00"
          }
        })
      }}
    />
  );
};

export const FAQSchema = ({ items }: { items: { question: string, answer: string }[] }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        })
      }}
    />
  );
};
