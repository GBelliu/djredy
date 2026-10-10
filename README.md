# DJ Redy — Site oficial

React 19 · Vite · GSAP (ScrollTrigger) · Framer Motion · Lenis · Canvas/WebGL

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (dist/)
npm run images   # regenera AVIF/WebP em public/img a partir de ../ARTISTA
```

- Conteúdo (textos, álbuns, agenda, merch, contatos): `src/data/content.js`
- Efeitos pesados (fumaça WebGL, PixelCard, parallax de mouse, grão animado) são
  desligados automaticamente em aparelhos fracos, com economia de dados ou `prefers-reduced-motion`.
- A transição de fumaça é procedural (shader); pode ser trocada por um MP4 em `src/components/SmokeTransition.jsx`.
