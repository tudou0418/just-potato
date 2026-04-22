import createMDX from '@next/mdx'

const withMDX = createMDX()

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)
