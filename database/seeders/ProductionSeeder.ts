import Tag from 'App/Models/Profile/Tag'
import Badge from 'App/Models/Profile/Badge'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'

export default class extends BaseSeeder {
  public async run() {
    const badges: Partial<
      ModelAttributes<InstanceType<typeof Badge>> & {
        tags: string[]
      }
    >[] = [
      {
        icon: 'Handyman',
        title: 'Builder/Founder',
        description:
          "You like to build things from scratch. You've launched or are currently building an NFT or Web3 Project.",
        color: '#16a34a',
        tags: [
          'Launched an NFT Collection',
          'Founded a Web3 Startup',
          'Cofounded a Web3 Startup',
          'Launched a coin/token',
          'Built a strong community',
          'Spoken on Twitter Spaces',
          'Spoken at a conference',
          'Raised Seed Funding',
          'Raised Series A Funding',
          'Employed people in Web3',
          'Launched Multiple Web3 Startups',
        ],
      },
      {
        icon: 'Movie',
        title: 'Quality Content Creator',
        description:
          "You like to build things from scratch. You've launched or are currently building an NFT or Web3 Project.",
        color: '#7c3aed',
        tags: [
          'Managed a Web3 Twitter Account',
          'Wrote a Web3 Article',
          'Wrote a Web3 Book',
          'Created Youtube Videos',
          'Created Tiktok content',
          'Web3 Patron Community',
          'Created Educative Twitter Threads',
        ],
      },
      {
        icon: 'MarkunreadMailbox',
        title: 'Meme Creator & Sh*tposter',
        description: 'You make funny, original memes, while keeping the community alive and fun.',
        color: '#ef4444',
        tags: ['Created memes', 'Sh*tposted on Twitter', 'Large Twitter Audience'],
      },
      {
        icon: 'Palette',
        title: 'Artist',
        description:
          "You create 1/1, NFT Collection and fan art in Web3. You're passionate about bringing communities together with your talent.",
        color: '#9333ea',
        tags: [
          'Created NFT Collection',
          'Created 1/1 Piece',
          'Published on Magic Eden',
          'Published on Open Sea',
          'Created Fan Art',
          'Animated an NFT',
          'Upgraded a Collection',
        ],
      },
      {
        icon: 'AccountBalance',
        title: 'Web3 Investor',
        description:
          "You find and invest in the best projects. You've always in search of the next big thing, and you're here for the long term.",
        color: '#f43f5e',
        tags: [
          'Seed funded a Web3 Startup',
          'Invested in an NFT Project',
          'Invested in a Web3 Game/P2E',
          'SOL Bag holder',
          'NFT Bag Holder',
        ],
      },
      {
        icon: 'ShoppingBasket',
        title: 'Trader',
        description:
          "You flip and trade coins and NFTs for profit. You're a short and long term holder.",
        color: '#ec4899',
        tags: ['Technical Analysis', 'Traded NFTs', 'Traded 10 - 100 SOL', 'Traded 100 - 1000 SOL'],
      },
      {
        icon: 'Devices',
        title: 'Software Engineer',
        description:
          'You write the code that powers Web3. You develop frontend interfaces, smart contracts, APIs or backend systems in Web3.',
        color: '#ec4899',
        tags: [
          'Published an Open Source Package',
          'Created a DAPP',
          'Published Smart Contract to Mainnet',
          'Built NFT Staking',
          'Built NFT Marketplace',
          'Built NFT Art Upgrade',
          'Built Gamified Staking',
          'Traded NFTs',
          'Frontend Engineer',
          'Backend Engineer',
          'Fullstack Engineer',
          'Rust Developer',
          'Typescript Developer',
          'Javascript Developer',
          'Smart Contract Developer',
        ],
      },
      {
        icon: 'Brush',
        title: 'Graphic / UI Designer',
        description:
          'You create illustrations, logos, interfaces to solve problems for Web3 Projects and startups.',
        color: '#ec4899',
        tags: [
          'Created an NFT Illustration',
          'Created A Logo',
          'Designed a Website',
          'Designed a Mobile App',
          'Branding for a Web3 Project',
        ],
      },
      {
        icon: 'Groups',
        title: 'Community Manager / Builder',
        description:
          'You bring communities together with activities & games. You can come up with unique ideas to bring people together.',
        color: '#10b981',
        tags: [
          'Managed Discord Servers',
          'Marketed Discord Communities',
          'Organised Discord Raids',
          'Organised Game nights',
          'Grown communities',
          'Created NFT Community',
          'Created Web3 Community',
        ],
      },
      {
        icon: 'SupervisorAccount',
        title: 'Influencer',
        description:
          'You collaborate with NFT and Web3 Brands to give them exposure in the space. ',
        color: '#10b981',
        tags: ['Large Twitter Audience', 'Brand partnerships', 'Sold out Collections'],
      },
      {
        icon: 'Language',
        title: 'Marketer',
        description:
          'You find and implement the best marketing strategies for Web3 brands and projects.',
        color: '#10b981',
        tags: [
          'Created Web3 Marketing Strategies',
          'Grown Twitter Audiences',
          'Grown Discord Communities',
          'Sold out collections',
        ],
      },
      {
        icon: 'MilitaryTech',
        title: 'Advisor & Strategist',
        description:
          'You know the best strategies for success in Web3. You guide NFT & Web3 startups on how to best achieve success.',
        color: '#10b981',
        tags: ['Adviced NFT Projects', 'Adviced Web3 Startups', 'Seed invested in Web3 Startups'],
      },
    ]

    for (let index = 0; index < badges.length; index++) {
      const { tags = [], ...badgeContent } = badges[index]

      const badge = await Badge.firstOrCreate({ title: badgeContent.title }, { ...badgeContent })

      await Tag.fetchOrCreateMany(
        'title',
        tags.map((tag) => ({ title: tag, badgeId: badge.id }))
      )
    }
  }
}
