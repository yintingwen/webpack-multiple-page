import app from "../config/app.js"
import { mergeArray } from "./common.js"

export function normalizeApp (app) {
  const appClone = app
  const { template, scripts, links, modules } = app
  appClone.template = template
  appClone.scripts = mergeArray(scripts, modules)
  appClone.links = mergeArray(links, modules)
  return appClone
}
