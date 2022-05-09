import Link from "next/link";
import IconRounded from "./icon/IconRounded";

export default function Router({ href, svg }) {
  return (
    <Link href={href} passHref>
      <IconRounded svg={svg} />
    </Link>
  );
}
