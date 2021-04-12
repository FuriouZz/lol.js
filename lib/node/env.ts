import { readFileSync } from 'fs';

export function readEnvFile(target = process.env['NODE_ENV'], global = true) {
  const result: Record<string, string> = {}
  let filename = `.env`
  if (target) filename += `.${target}`
  try {
    const lines = readFileSync(filename, { encoding: "utf-8" }).split(/\r?\n/)
    for (const line of lines) {
      let [key, value] = line.split(/=/)
      key = key.trim()
      value = value.trim()
      if (key[0] === "#") continue
      if (global) process.env[key] = value
      result[key] = value
    }
  } catch (e) {}
  return result
}