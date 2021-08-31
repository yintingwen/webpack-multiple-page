export interface Pages {
  [pageName: string]: string | Page[]
}

interface Page {
  entry: string
  output: string
  html?: string
  scripts?: string[]
  links: string[]
  modules: string[]
}