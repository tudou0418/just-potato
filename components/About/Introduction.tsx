import { Github, Twitter, Mail, MapPin, Link as LinkIcon } from 'lucide-react'

const Introduction = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-black text-ui-text tracking-tight mb-6">
                关于 <span className="text-brand">我</span>
              </h1>
              <p className="text-xl text-ui-text-muted leading-relaxed font-medium">
                一个热爱折腾前端技术的数字游民，专注于构建极简且高效的 Web 应用，
                探索代码中的设计美学。
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-ui-text flex items-center gap-2">
                <span className="w-1 h-6 bg-brand rounded-full"></span>
                技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Rust', 'Supabase'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-ui-border/30 text-ui-text-muted rounded-lg text-sm font-bold border border-ui-border hover:border-brand/40 hover:text-brand transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-ui-text flex items-center gap-2">
                <span className="w-1 h-6 bg-brand rounded-full"></span>
                联系方式
              </h3>
              <div className="flex items-center gap-4">
                <a href="#" className="p-3 rounded-xl bg-ui-border/20 text-ui-text-muted hover:text-brand hover:bg-brand/5 transition-all border border-ui-border">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3 rounded-xl bg-ui-border/20 text-ui-text-muted hover:text-brand hover:bg-brand/5 transition-all border border-ui-border">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-3 rounded-xl bg-ui-border/20 text-ui-text-muted hover:text-brand hover:bg-brand/5 transition-all border border-ui-border">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-ui-surface border border-ui-border rounded-smooth p-8 shadow-brand">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand to-brand-dark rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maple"
                  alt="Avatar"
                  className="relative w-32 h-32 rounded-full border-4 border-ui-surface bg-ui-surface object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-ui-text tracking-tight">土豆酱</h2>
                <p className="text-ui-text-muted text-sm mt-2">全栈开发者 / 技术博主</p>
              </div>

              <div className="w-full space-y-3 pt-4 border-t border-ui-border">
                <div className="flex items-center gap-3 text-ui-text-muted">
                  <MapPin size={16} className="text-brand" />
                  <span className="text-sm">重庆, 中国</span>
                </div>
                <div className="flex items-center gap-3 text-ui-text-muted">
                  <LinkIcon size={16} className="text-brand" />
                  <a href="https://just-potato.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand transition-colors">
                    just-potato.netlify.app
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export { Introduction }
