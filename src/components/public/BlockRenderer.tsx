import Hero from "./Hero";
import SliderHero from "./SliderHero";
import TextImage from "./TextImage";
import CustomerReviews from "../CustomerReviews";
import ClientsSection from "./ClientsSection";
import { getTestimonials } from "@/lib/actions/testimonials";

const BlockRenderer = async ({ blocks }: { blocks: any[] }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  // We fetch testimonials once if needed
  const hasTestimonials = blocks.some(b => b.type === "testimonials");
  const testimonials = hasTestimonials ? await getTestimonials() : [];
  const publishedTestimonials = testimonials.filter((t: any) => t.isPublished).slice(0, 10);

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "hero":
            return <Hero key={block.id || index} data={block.data} />;
          case "slider-hero":
            return <SliderHero key={block.id || index} />;
          case "text-image":
            return <TextImage key={block.id || index} data={block.data} />;
          case "testimonials":
            // @ts-ignore - Props type mismatch after refactor
            return <CustomerReviews key={block.id || index} data={block.data as any} externalTestimonials={publishedTestimonials as any} />;
          // case 'clients': is now manually placed at the bottom of page.tsx
          default:
            return (
              <section key={block.id || index} className="unknown-block">
                <div className="container">
                  <p>Unknown block type: {block.type}</p>
                </div>
              </section>
            );
        }
      })}
    </>
  );
};

export default BlockRenderer;
