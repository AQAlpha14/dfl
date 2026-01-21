import { default as NextImage, ImageProps as NextImageProps } from "next/image";
interface ImageProps extends Omit<NextImageProps, "alt"> {
  alt?: string;
}
const Image = ({ src, alt = "", ...props }: ImageProps) => {
  if (!src) return null;
  return (
    <NextImage
      {...props}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};

export default Image;
