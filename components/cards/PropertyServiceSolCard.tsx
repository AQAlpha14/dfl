import Image from "../Image";
import Typography from "../Typography";

export interface PropertyServiceSolItem {
  icons: string;
  cardTitle: string;
  cardDescription: string;
}

interface PropertyServiceSolCardProps {
  type: PropertyServiceSolItem;
}

const PropertyServiceSolCard = ({ type }: PropertyServiceSolCardProps) => {
  return (
    <div className="rounded-2xl overflow-hidden group bg-white transition hover:shadow-lg">
      <div className="p-6 flex flex-col justify-end">
        <div className="flex items-center gap-4 mb-2">
          <Image src={type.icons} alt={type.cardTitle} width={60} height={60} />
          <Typography as="h3" size="md" weight="bold">
            {type.cardTitle}
          </Typography>
        </div>
        <Typography as="p" size="sm" className="my-3 line-clamp-2">
          {type.cardDescription}
        </Typography>
      </div>
    </div>
  );
};

export default PropertyServiceSolCard;
