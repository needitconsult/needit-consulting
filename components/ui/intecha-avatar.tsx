import { cn } from "@/lib/utils";

export default function IntechaAvatar({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const dims = { sm: 32, md: 48, lg: 80 }[size];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/intecha-head.png"
      alt="Intecha"
      width={dims}
      height={dims}
      className={cn("flex-shrink-0 object-cover object-center", className)}
      style={{ borderRadius: "50%", width: dims, height: dims }}
    />
  );
}
