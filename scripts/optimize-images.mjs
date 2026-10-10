import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import { join, parse, resolve } from 'node:path'

const ROOT = resolve('..')
const OUT = resolve('public/img')

const slug = (value) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const jobs = [
  { dir: join(ROOT, 'ARTISTA'), width: 1600, name: (file) => `photo-${file.match(/\((\d+)\)/)[1]}` },
  {
    dir: join(ROOT, 'ARTISTA', 'FUNDO TRANSPARENTE'),
    width: 1400,
    name: (file) => `cutout-${file.match(/\((\d+)\)/)[1]}`,
  },
  // "Redy Logo Branco com Relevo.png" -> logo-branco-com-relevo
  { dir: join(ROOT, 'LOGO'), width: 1400, trim: true, name: (file) => slug(parse(file).name.replace(/^redy /i, '')) },
  { dir: join(ROOT, 'CAPAS'), width: 640, name: (file) => `cover-${parse(file).name}` },
]

await mkdir(OUT, { recursive: true })
for (const { dir, width, trim, name } of jobs) {
  const files = (await readdir(dir)).filter((file) => /\.(jpe?g|png)$/i.test(file))
  for (const file of files) {
    let image = sharp(join(dir, file)).rotate()
    if (trim) image = image.trim()
    image = image.resize({ width, withoutEnlargement: true })
    const output = join(OUT, name(file))
    await image.clone().avif({ quality: 55 }).toFile(`${output}.avif`)
    await image.clone().webp({ quality: 80 }).toFile(`${output}.webp`)
  }
}
console.log('done')
