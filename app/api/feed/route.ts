import { Feed } from 'feed';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts();
  const feed = new Feed({
    title: "ZHJ的博客",
    description: "分享Web开发经验和技术见解",
    id: "https://your-domain.com/",
    link: "https://your-domain.com/",
    language: "zh-CN",
    copyright: "All rights reserved 2024",
    updated: new Date(),
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: "https://your-domain.com/rss.xml",
      json: "https://your-domain.com/feed.json",
      atom: "https://your-domain.com/atom.xml"
    },
    author: {
      name: "ZHJ",
      email: "your-email@example.com",
      link: "https://your-domain.com/about"
    }
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.data.title,
      id: `https://your-domain.com/posts/${post.slug}`,
      link: `https://your-domain.com/posts/${post.slug}`,
      description: post.data.description,
      content: post.content,
      author: [
        {
          name: "ZHJ",
          email: "your-email@example.com",
          link: "https://your-domain.com/about"
        }
      ],
      date: new Date(post.data.date),
      image: post.data.image,
      published: new Date(post.data.date),
      copyright: "All rights reserved 2024"
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
} 