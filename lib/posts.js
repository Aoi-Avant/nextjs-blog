import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // ファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // ファイル名から.mdを削除
    const id = fileName.replace(/\.md$/, '')

    // ファイルを文字列として取得する
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // gray-matter で metadata をパースする
    const matterResult = matter(fileContents)

    // データの結合
    return {
      id,
      ...matterResult.data,
    }
  })

  // 日付順で並べ替え
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // ファイル名を返す
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // metadataのパース
  const matterResult = matter(fileContents)

  // markdownの内容をHTMLに変換する
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // データの結合
  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
