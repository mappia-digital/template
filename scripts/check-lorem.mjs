#!/usr/bin/env node
/**
 * check-lorem.mjs — bloqueia merge se houver "Lorem Ipsum" no conteúdo.
 * Roda no CI antes do build. Exit code 1 = falha.
 */

import { readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative, extname } from "node:path"

const SCAN_DIRS = ["app", "src", "client-data.ts"]
const EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".mdx", ".md"]
const FORBIDDEN = [
  /lorem\s+ipsum/i,
  /dolor\s+sit\s+amet/i,
  /\bTODO:?\s*preencher\b/i,
  /\bplaceholder\s*texto\b/i,
]

const ROOT = process.cwd()

/** @returns {string[]} */
function walk(dir) {
  const full = join(ROOT, dir)
  let stat
  try {
    stat = statSync(full)
  } catch {
    return []
  }

  if (stat.isFile()) return [full]

  const out = []
  for (const entry of readdirSync(full)) {
    if (entry === "node_modules" || entry === ".next" || entry === "out") continue
    const path = join(full, entry)
    const s = statSync(path)
    if (s.isDirectory()) {
      out.push(...walk(relative(ROOT, path)))
    } else if (EXTENSIONS.includes(extname(path))) {
      out.push(path)
    }
  }
  return out
}

const files = SCAN_DIRS.flatMap(walk)
const offenders = []

for (const file of files) {
  const content = readFileSync(file, "utf8")
  for (const pattern of FORBIDDEN) {
    if (pattern.test(content)) {
      offenders.push({ file: relative(ROOT, file), pattern: pattern.source })
    }
  }
}

if (offenders.length > 0) {
  console.error("\n❌ Conteúdo placeholder detectado — substitua antes do deploy:\n")
  for (const o of offenders) {
    console.error(`  • ${o.file} → padrão "${o.pattern}"`)
  }
  console.error("")
  process.exit(1)
}

console.log("✅ Nenhum conteúdo placeholder encontrado.")
