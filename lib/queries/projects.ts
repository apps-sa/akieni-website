import type { Locale } from "@/app/[lang]/dictionaries";
import { isSanityConfigured, sanityClient, urlFor } from "../sanity";

export async function getAllProjects(lang: Locale) {
  if (!isSanityConfigured) return [];
  try {
    const projects = await sanityClient.fetch<
      Array<{
        slug: string;
        categories: string[];
        client: string;
        title: string;
        desc: string;
        tags: string[];
        years: string;
        statusLabel: string;
        image: { asset: { _ref: string }; alt?: string } | null;
        mediaLabel: string;
      }>
    >(
      `*[_type == "project" && isPublished == true] | order(order asc) {
        "slug": slug.current,
        categories,
        client,
        "title": coalesce(title[$lang], title.en),
        "desc": coalesce(desc[$lang], desc.en),
        tags,
        years,
        "statusLabel": coalesce(statusLabel[$lang], statusLabel.en),
        image,
        "mediaLabel": coalesce(image.alt, title.en),
      }`,
      { lang }
    );

    return projects.map((p) => ({
      ...p,
      imageUrl: p.image ? urlFor(p.image).width(800).url() : null,
    }));
  } catch {
    return [];
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  try {
    const results = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "project" && isPublished == true]{ "slug": slug.current }`
    );
    return results.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string, lang: Locale) {
  if (!isSanityConfigured) return null;
  try {
    const project = await sanityClient.fetch<{
      meta: { title: string; description: string };
      hero: { title: string; lede: string; image: { asset: { _ref: string } } | null; mediaLabel: string; caption: string; backLabel: string };
      overview: Array<{ label: string; value: string; accent: boolean }>;
      challenge: { eyebrow: string; title: string; paragraphs: string[] };
      solution: { eyebrow: string; title: string; lede: string; items: string[]; gallery: Array<{ label: string; image: { asset: { _ref: string } } | null }> };
      stack: { eyebrow: string; titleLine1: string; titleLine2: string; lede: string; groups: Array<{ heading: string; items: string[] }> };
      impact: { eyebrow: string; titleLine1: string; titleLine2: string; lede: string; cells: Array<{ num: string; desc: string }> };
      nav: { allLabel: string; allTitle: string; nextLabel: string; nextSlug: string; nextTitle: string };
      cta: { title: string; primary: string };
    } | null>(
      `*[_type == "project" && slug.current == $slug][0] {
        "meta": {
          "title": coalesce(meta[$lang].title, meta.en.title),
          "description": coalesce(meta[$lang].description, meta.en.description),
        },
        "hero": {
          "title": coalesce(title[$lang], title.en),
          "lede": coalesce(heroLede[$lang], heroLede.en),
          image,
          "mediaLabel": coalesce(image.alt, title.en),
          "caption": "CASE STUDY",
          "backLabel": select($lang == "fr" => "Tous les projets", "All projects"),
        },
        "overview": overview[] {
          "label": coalesce(label[$lang], label.en),
          "value": coalesce(value[$lang], value.en),
          accent,
        },
        "challenge": {
          "eyebrow": coalesce(challenge.eyebrow[$lang], challenge.eyebrow.en),
          "title": coalesce(challenge.title[$lang], challenge.title.en),
          "paragraphs": coalesce(challenge.paragraphs[$lang], challenge.paragraphs.en),
        },
        "solution": {
          "eyebrow": coalesce(solution.eyebrow[$lang], solution.eyebrow.en),
          "title": coalesce(solution.title[$lang], solution.title.en),
          "lede": coalesce(solution.lede[$lang], solution.lede.en),
          "items": coalesce(solution.items[$lang], solution.items.en),
          "gallery": solution.gallery[] {
            "label": coalesce(label[$lang], label.en),
            image,
          },
        },
        "stack": {
          "eyebrow": coalesce(stack.eyebrow[$lang], stack.eyebrow.en),
          "titleLine1": coalesce(stack.titleLine1[$lang], stack.titleLine1.en),
          "titleLine2": coalesce(stack.titleLine2[$lang], stack.titleLine2.en),
          "lede": coalesce(stack.lede[$lang], stack.lede.en),
          "groups": stack.groups[] {
            "heading": coalesce(heading[$lang], heading.en),
            items,
          },
        },
        "impact": {
          "eyebrow": coalesce(impact.eyebrow[$lang], impact.eyebrow.en),
          "titleLine1": coalesce(impact.titleLine1[$lang], impact.titleLine1.en),
          "titleLine2": coalesce(impact.titleLine2[$lang], impact.titleLine2.en),
          "lede": coalesce(impact.lede[$lang], impact.lede.en),
          "cells": impact.cells[] {
            num,
            "desc": coalesce(desc[$lang], desc.en),
          },
        },
        "nav": {
          "allLabel": coalesce(nav.allLabel[$lang], nav.allLabel.en),
          "allTitle": coalesce(nav.allTitle[$lang], nav.allTitle.en),
          "nextLabel": coalesce(nav.nextLabel[$lang], nav.nextLabel.en),
          "nextSlug": nav.nextSlug,
          "nextTitle": coalesce(nav.nextTitle[$lang], nav.nextTitle.en),
        },
        "cta": {
          "title": coalesce(ctaTitle[$lang], ctaTitle.en),
          "primary": coalesce(ctaPrimary[$lang], ctaPrimary.en),
        },
      }`,
      { slug, lang }
    );
    return project;
  } catch {
    return null;
  }
}
