export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // 支持中文
    .replace(/^-|-$/g, '')
}

export function addIdsToHeadings(content: string): string {
  // 使用 MDX 兼容的方式添加 id
  return content.replace(
    /^(#{2,3})\s+(.+)$/gm,
    (match, hashes, title) => {
      const id = slugify(title)
      // 使用 markdown 原生的 id 语法
      return `${hashes} ${title} <a id="${id}"></a>`
    }
  )
} 