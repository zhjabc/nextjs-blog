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
    // ... 其他配置
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `https://your-domain.com/posts/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 