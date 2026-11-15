import { SITE } from "@/config/site";

const LocationMap = ({ className = "" }: { className?: string }) => (
  <div className={`h-64 w-full overflow-hidden rounded-lg shadow-lg ${className}`}>
    <iframe
      title={`Carte : ${SITE.name}, ${SITE.addressShort}`}
      src={SITE.mapEmbedUrl}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
);

export default LocationMap;
