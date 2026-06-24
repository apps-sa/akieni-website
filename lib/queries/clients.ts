import { isSanityConfigured, sanityClient, urlFor } from "../sanity";

export type ClientCard = {
  name: string;
  logoUrl: string | null;
  website: string | null;
};

export async function getAllClients(): Promise<ClientCard[]> {
  if (!isSanityConfigured) return [];
  const raw = await sanityClient.fetch<
    Array<{ name: string; logo: unknown | null; website: string | null }>
  >(
    `*[_type == "client"] | order(order asc) { name, logo, website }`
  );
  return raw.map((c) => ({
    name: c.name,
    logoUrl: c.logo ? urlFor(c.logo).height(80).url() : null,
    website: c.website ?? null,
  }));
}
