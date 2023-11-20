/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/v1/:path*',
            destination: process.env.LOAN_API+'/v1/:path*' // Proxy to Backend,
          }
        ]
    }
}

module.exports = nextConfig
