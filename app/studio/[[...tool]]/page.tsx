"use client";

import config from "@/sanity/sanity.config";
import { Studio } from "sanity";

export default function StudioPage() {
  return <Studio config={config} />;
}

