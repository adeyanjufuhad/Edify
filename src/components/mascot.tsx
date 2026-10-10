import Image from "next/image";
import edi from "@/assets/edi.png";
import { Sparkle, Star } from "@/components/doodles";

// "Edi", Edify's owl mascot. Decorative unless given a title. `cheer` adds celebration stars.
type Pose = "wave" | "read" | "cheer" | "think";

export default function Mascot({ pose = "wave", className, title }: { pose?: Pose; className?: string; title?: string }) {
  return (
    <span className={`mascot mascot-${pose} ${className ?? ""}`} aria-hidden={title ? undefined : true}>
      <Image src={edi} alt={title ?? ""} sizes="(max-width: 600px) 160px, 240px" />
      {pose === "cheer" && <><Star className="mascot-star one" /><Sparkle className="mascot-star two" /><Star className="mascot-star three" color="#669bbc" /></>}
    </span>
  );
}
