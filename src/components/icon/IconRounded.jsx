import Img from "@/components/Image";
import { forwardRef } from "react";

const IconRounded = ({ href }, ref) => {
  return (
    <a
      href={href}
      ref={ref}
      className="relative flex w-11 items-center justify-center rounded-full bg-yellow-300 p-2 shadow-md"
    >
      <Img svg={"example"} width={25} height={25} />
    </a>
  );
};

export default forwardRef(IconRounded);
