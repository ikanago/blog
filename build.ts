import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked, Renderer } from "marked";

const TITLE = "ごきげんまっすぐ";
const HOSTNAME = "blog.ikanago.dev";

const POSTS_DIR = path.join(process.cwd(), "posts");
const IMAGES_DIR = path.join(process.cwd(), "images");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const DIST_DIR = path.join(process.cwd(), "dist");

type Frontmatter = {
  slug: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isPublished: boolean;
};

type Post = {
  frontmatter: Frontmatter;
  content: string;
};

// dist/ をリセット
function resetDist() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// ディレクトリを再帰的にコピー
function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// アセットをコピー
function copyAssets() {
  fs.copyFileSync(
    path.join(process.cwd(), "style.css"),
    path.join(DIST_DIR, "style.css"),
  );
  fs.copyFileSync(
    path.join(process.cwd(), "variables.css"),
    path.join(DIST_DIR, "variables.css"),
  );
  copyDir(PUBLIC_DIR, DIST_DIR);
  copyDir(IMAGES_DIR, path.join(DIST_DIR, "images"));
}

// 記事を読み込む
function loadPost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const fullPath = path.join(POSTS_DIR, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // slug は frontmatter から取得 (例: "/became-atcoder-green") 、先頭スラッシュを除去
  const rawSlug: string = data.slug ?? `/${slug}`;
  const cleanSlug = rawSlug.replace(/^\//, "");

  return {
    frontmatter: {
      slug: cleanSlug,
      title: data.title ?? slug,
      description: data.excerpt ?? null,
      createdAt: data.createdAt ?? "",
      updatedAt: data.updatedAt ?? "",
      tags: data.tags ?? [],
      isPublished: data.status === "published",
    },
    content,
  };
}

// 全記事を取得
function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map(loadPost).filter((p) => p.frontmatter.isPublished);

  posts.sort((a, b) => {
    if (a.frontmatter.updatedAt < b.frontmatter.updatedAt) return 1;
    if (a.frontmatter.updatedAt > b.frontmatter.updatedAt) return -1;
    return 0;
  });

  return posts;
}

// Markdown → HTML 変換（画像パスを /images/ に書き換え）
function renderMarkdown(content: string): string {
  const renderer = new Renderer();
  const originalImage = renderer.image.bind(renderer);
  renderer.image = ({ href, title, text }) => {
    // 相対パスの画像を /images/ に書き換え
    const newHref =
      href && !href.startsWith("http") && !href.startsWith("/")
        ? `/images/${href}`
        : href;
    return originalImage({ href: newHref, title, text });
  };

  marked.use({ renderer });
  return marked(content) as string;
}

// レイアウト共通テンプレート
function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="/variables.css">
  <link rel="stylesheet" href="/style.css">
  <link rel="icon" href="/favicon/favicon.ico">
</head>
<body>
  <header class="header">
    <div class="header_inner">
      <nav>
        <ul class="header_ul">
          <li class="header_li"><a href="/" class="header_link">Home</a></li>
          <li class="header_li"><a href="/about" class="header_link">About</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    ${body}
  </main>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// トップページ（記事一覧）
function buildIndexPage(posts: Post[]) {
  const articles = posts
    .map(
      (post) => `
    <a href="/${escapeHtml(post.frontmatter.slug)}" class="article">
      <article>
        <h3>${escapeHtml(post.frontmatter.title)}</h3>
        ${post.frontmatter.createdAt ? `<p class="article_date">${escapeHtml(post.frontmatter.createdAt)}</p>` : ""}
      </article>
    </a>`,
    )
    .join("\n");

  const body = `
  <div style="padding-top: 2rem;">
    <h1>${escapeHtml(TITLE)}</h1>
    <section class="articles_section">
      ${articles}
    </section>
  </div>`;

  fs.writeFileSync(path.join(DIST_DIR, "index.html"), layout(TITLE, body));
  console.log("Generated: dist/index.html");
}

// 記事ページ
function buildPostPage(post: Post) {
  const { frontmatter, content } = post;
  const htmlContent = renderMarkdown(content);

  const body = `
  <article class="blogPostContainer" itemscope itemtype="http://schema.org/Article">
    <h1>${escapeHtml(frontmatter.title)}</h1>
    ${frontmatter.createdAt ? `<p class="date">Created at ${escapeHtml(frontmatter.createdAt)}</p>` : ""}
    ${frontmatter.updatedAt ? `<p class="date">Updated at ${escapeHtml(frontmatter.updatedAt)}</p>` : ""}
    <div class="blogPost">
      ${htmlContent}
    </div>
  </article>`;

  const slugDir = path.join(DIST_DIR, frontmatter.slug);
  fs.mkdirSync(slugDir, { recursive: true });
  fs.writeFileSync(
    path.join(slugDir, "index.html"),
    layout(frontmatter.title, body),
  );
  console.log(`Generated: dist/${frontmatter.slug}/index.html`);
}

// About ページ
function buildAboutPage() {
  const badgeData = [
    {
      link: "https://github.com/ikanago",
      badgeLink:
        "https://img.shields.io/badge/GitHub-ikanago-brightgreen?style=flat&logo=github",
      title: "ikanago",
      alt: "Link to ikanago's GitHub.",
    },
    {
      link: "https://twitter.com/ikanag0",
      badgeLink:
        "https://img.shields.io/badge/Twitter-ikanag0-1A91DA?style=flat&logo=twitter",
      title: "ikanag0",
      alt: "Link to ikanago's Twitter.",
    },
  ];

  const badges = badgeData
    .map(
      (b) =>
        `<a href="${escapeHtml(b.link)}" class="badge" rel="noopener noreferrer" target="_blank">
          <img src="${escapeHtml(b.badgeLink)}" alt="${escapeHtml(b.alt)}" title="${escapeHtml(b.title)}">
        </a>`,
    )
    .join("\n");

  const body = `
  <div class="biography_container">
    <img alt="ikanago" src="/blog_icon.png" width="400" height="400">
    <div class="biography">
      <h1>ikanago</h1>
      <p class="biography_description">Studying computer science at a university. I love Rust 🦀.</p>
      ${badges}
    </div>
  </div>`;

  const aboutDir = path.join(DIST_DIR, "about");
  fs.mkdirSync(aboutDir, { recursive: true });
  fs.writeFileSync(
    path.join(aboutDir, "index.html"),
    layout("About - " + TITLE, body),
  );
  console.log("Generated: dist/about/index.html");
}

// 404 ページ
function build404Page() {
  const body = `
  <div style="padding-top: 2rem; text-align: center;">
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </div>`;

  fs.writeFileSync(
    path.join(DIST_DIR, "404.html"),
    layout("404: Not found", body),
  );
  console.log("Generated: dist/404.html");
}

// メイン処理
export function build() {
  console.log("Building...");

  resetDist();
  copyAssets();

  const posts = getAllPosts();
  console.log(`Found ${posts.length} published posts.`);

  buildIndexPage(posts);
  for (const post of posts) {
    buildPostPage(post);
  }
  buildAboutPage();
  build404Page();

  console.log("Done!");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build();
}
