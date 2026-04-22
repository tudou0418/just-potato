import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// 新增：阅读时间计算函数
function calculateReadTime(content: string) {
  const wordsPerMinute = 300; // 假设每分钟阅读300字
  const cleanContent = content.replace(/[#*`\n\t]/g, ''); // 过滤掉Markdown符号
  const wordCount = cleanContent.length; // 对于中英文混合，直接用长度比较准确
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  category: string;
  readTime: string;
  tags: string[];
  [key: string]: unknown;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      metadata: {
        ...data,
        title: data.title || '',
        description: data.description || '',
        category: data.category || '未分类',
        readTime: data.readTime || calculateReadTime(content),
        tags: data.tags || [],
      } as PostMetadata,
      content,
    };
  });
}