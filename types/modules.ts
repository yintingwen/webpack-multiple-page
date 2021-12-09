export interface Modules {
  [ moduleName: string ]: string | module[]
}

interface module {
  scripts?: string | script[]
  links?: string | link[]
}

interface script {
  type?: 'file' | 'content',
  value: string
}

interface link {
  type?: 'file' | 'content',
  value: string
}

