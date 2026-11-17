import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  // Anciennes pages « Qui sommes-nous » supprimées lors de la refonte : on redirige pour ne pas casser les liens existants
  async redirects() {
    return [
      { source: "/qui-sommes-nous/partenaires-et-soutiens", destination: "/ressources#blog-recompenses", permanent: true },
      { source: "/qui-sommes-nous/notre-histoire", destination: "/", permanent: true },
      { source: "/qui-sommes-nous/nous-rejoindre", destination: "/", permanent: true },
      { source: "/qui-sommes-nous", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
