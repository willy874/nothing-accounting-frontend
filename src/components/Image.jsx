import Image from "next/image";

export default function Img({ svg, width, height }) {
  return <Image src={`/${svg}.svg`} width={width} height={height} alt="" />;
}
