// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactCompiler: true,

//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**.fbcdn.net",
//       },
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true, // اقفلي السطر ده مؤقتاً بعلامتين //
  reactStrictMode: false, // ضيفي السطر ده عشان يمنع رندر الكود مرتين ويحافظ على الـ State

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;