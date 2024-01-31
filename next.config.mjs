/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        myMemmoryApiKey:'709e39e0c2cbc03f6481',
        detectLanguageApi:'d173ccc66f39de5579241e5259fa453f',
        metaApi:'e1eceb57bfaa432eb3f01aae23e0852a'
    },
    async rewrites() {
        return [
          {
            source: '/api/getLanguages',
            destination: 'https://global.metadapi.com/lang/v1/languages',
          },
        ];
      },
};

export default nextConfig;
