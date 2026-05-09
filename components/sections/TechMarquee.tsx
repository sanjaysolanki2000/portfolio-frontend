import { Badge } from "@/components/ui/Badge";
import { techStack } from "@/lib/data";

export function TechMarquee() {
  const items = [...techStack, ...techStack];
  return (
    <section className="overflow-hidden py-16">
      <div className="tech-marquee flex w-max gap-4">
        {items.map((item, index) => (
          <Badge key={`${item}-${index}`} className="px-5 py-2 text-sm">
            {item}
          </Badge>
        ))}
      </div>
    </section>
  );
}
