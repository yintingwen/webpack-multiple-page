export interface Modules {
  [ moduleName: string ]: string | Module | ModuleContent[]
}

interface Module {
  scripts?: string | ModuleContent[]
  links?: string | ModuleContent[]
}

interface ModuleContent {
  isLink: Boolean,
  type?: 'file' | 'content',
  value: string
}
