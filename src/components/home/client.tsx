"use client";
import { Button } from "@/components/ui/button";

export default function ClientButton() {
  return (
    <Button
      className="text-blac"
      onClick={() => console.log("clicked")}
      variant="outline"
    >
      Click me
    </Button>
  );
}
