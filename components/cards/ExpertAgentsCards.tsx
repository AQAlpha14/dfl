"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";
import { DribbleSVG, LinkedInSVG, XSVG } from "@/public/icons/SVGIcons";

/* ============================
   TYPES
============================ */

interface ExpertAgentsCardsProps {
  imageURL: string;
  userName: string;
  role: string;
  phone?: string;
  onEmailClick?: () => void;
}

/* ============================
   COMPONENT
============================ */

const ExpertAgentsCards: React.FC<ExpertAgentsCardsProps> = ({
  imageURL,
  userName,
  role,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white">
      {/* Image */}
      <div className="aspect-616/594 overflow-hidden rounded-2xl">
        <Image
          src={imageURL}
          alt={userName}
          width={323}
          height={277}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between pt-4">
        <div>
          <Typography as="h2" size="md" weight="semibold">
            {userName}
          </Typography>
          <Typography as="h4" size="md">
            {role}
          </Typography>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="#"
            onClick={() => window.open("https://www.linkedin.com/", "_blank")}
          >
            <LinkedInSVG />
          </Link>
          <Link
            href="#"
            onClick={() => window.open("https://www.linkedin.com/", "_blank")}
          >
            <XSVG className="text-primary" />
          </Link>
          <Link
            href="#"
            onClick={() => window.open("https://www.linkedin.com/", "_blank")}
          >
            <DribbleSVG />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpertAgentsCards;
