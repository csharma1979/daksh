import "./TextImage.css";
import Image from "next/image";

const TextImage = ({ data }: { data: any }) => {
  const isImageLeft = data.layout === "image-left";

  return (
    <section className="text-image-section">
      <div className={`container ti-grid ${isImageLeft ? '' : 'reverse'}`}>
        <div className="ti-image">
          {data.image && (
            <div className="image-wrapper">
              <Image 
                src={data.image} 
                alt={data.title || "Daksh Interiors"} 
                width={800} 
                height={600} 
                style={{ objectFit: 'cover' }}
                className="rounded-custom"
              />
            </div>
          )}
        </div>
        <div className="ti-text">
          {data.title && <h2>{data.title}</h2>}
          <div 
            className="ti-content" 
            dangerouslySetInnerHTML={{ __html: data.content || "" }} 
          />
        </div>
      </div>

    </section>
  );
};

export default TextImage;
