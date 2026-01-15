import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const travelsDirectory = path.join(process.cwd(), 'content/travels');

export interface TravelMetadata {
  title: string;
  location: string;
  coord: [number, number, number];
  date: string;
  year: string;
  days: number;
  cost: number;
  image: string;
  transport: 'plane' | 'train' | 'car';
  description?: string;
  tags?: string[];
}

export interface Travel {
  slug: string;
  metadata: TravelMetadata;
  content: string;
}

export function getAllTravels(): Travel[] {
  if (!fs.existsSync(travelsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(travelsDirectory);
  return filenames.map((filename) => {
    const filePath = path.join(travelsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug: filename.replace(/\.mdx?$/, ''),
      metadata: data as TravelMetadata,
      content,
    };
  });
}

export function getTravelBySlug(slug: string): Travel | null {
  try {
    const filePath = path.join(travelsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      metadata: data as TravelMetadata,
      content,
    };
  } catch (error) {
    return null;
  }
}
