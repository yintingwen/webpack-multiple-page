export interface Modules {
  [ moduleName: string ]: string | module[]
}

interface module {
  scripts?: string | script[]
  links?: string | link[]
}

interface script {
  type?: 'src' | 'content',
  value: string
}

interface link {
  type?: 'href' | 'content',
  value: string
}
