-- Supabase 数据库表配置
-- 在 Supabase 的 SQL Editor 中运行此脚本来创建留言板表

-- 创建留言板表
CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 添加索引以提高查询性能
CREATE INDEX idx_guestbook_created_at ON guestbook(created_at DESC);

-- 启用行级安全策略 (RLS)
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取留言
CREATE POLICY "Allow public read access" ON guestbook
  FOR SELECT
  TO public
  USING (true);

-- 允许所有人插入留言
CREATE POLICY "Allow public insert access" ON guestbook
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 可选：添加表注释
COMMENT ON TABLE guestbook IS '留言板表，存储用户留言信息';
COMMENT ON COLUMN guestbook.id IS '留言的唯一标识符';
COMMENT ON COLUMN guestbook.name IS '留言者昵称';
COMMENT ON COLUMN guestbook.message IS '留言内容';
COMMENT ON COLUMN guestbook.created_at IS '留言创建时间';
