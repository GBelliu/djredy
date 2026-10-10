import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useExperience } from '../hooks/experience'
import './SmokeTransition.css'

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

// Fumaça procedural (fbm + domain warping). A frente de "dissolução" sobe com o scroll,
// levando do preto (seção anterior) ao papel claro (seção seguinte).
const FRAGMENT = `
precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uProgress;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = uv * vec2(uResolution.x / uResolution.y, 1.0);
  float t = uTime * 0.07;

  vec2 warp = vec2(fbm(p * 1.4 + vec2(t, -t)), fbm(p * 1.4 + vec2(5.2 - t, 1.3 + t)));
  float smoke = fbm(p * 2.2 + warp * 2.4 + vec2(0.0, -t * 2.5));

  float front = uProgress * 1.7 - 0.35;
  float edge = front - uv.y + (smoke - 0.5) * 0.75;
  float reveal = smoothstep(-0.08, 0.22, edge);
  float band = exp(-pow(edge * 4.0, 2.0));

  vec3 dark = vec3(0.039);
  vec3 light = vec3(0.914);
  vec3 color = mix(dark, light, reveal);

  float wisps = smoothstep(0.45, 0.95, smoke);
  color += vec3(wisps * 0.85) * band * (1.0 - reveal);
  color += vec3(smoke * 0.07) * (1.0 - reveal);
  color -= vec3((smoke - 0.5) * 0.08) * reveal;

  gl_FragColor = vec4(color, 1.0);
}
`

function createProgram(gl) {
  const compile = (type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
  }
  const vertex = compile(gl.VERTEX_SHADER, VERTEX)
  const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT)
  if (!vertex || !fragment) return null

  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null
}

/**
 * Transição cinematográfica de fumaça entre uma seção escura e uma clara.
 * Em aparelhos fracos (ou sem WebGL) cai para um degradê em CSS.
 */
export default function SmokeTransition({ lines }) {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { lowEnd } = useExperience()

  useGSAP(
    () => {
      const section = sectionRef.current
      const words = section.querySelectorAll('.smoke__word')

      gsap.fromTo(
        words,
        { yPercent: 40, opacity: 0, letterSpacing: '0.4em' },
        {
          yPercent: -40,
          opacity: 1,
          letterSpacing: '0em',
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 60%', end: 'center center', scrub: true },
        },
      )

      const animateFallback = (target) =>
        gsap.fromTo(
          target,
          { '--reveal': '0%' },
          {
            '--reveal': '100%',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
          },
        )

      if (lowEnd) {
        animateFallback(section.querySelector('.smoke__fallback'))
        return
      }

      const canvas = canvasRef.current
      const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
      const program = gl && createProgram(gl)
      if (!program) {
        section.classList.add('is-fallback')
        animateFallback(section.querySelector('.smoke__sticky'))
        return
      }

      gl.useProgram(program)
      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

      const uResolution = gl.getUniformLocation(program, 'uResolution')
      const uTime = gl.getUniformLocation(program, 'uTime')
      const uProgress = gl.getUniformLocation(program, 'uProgress')
      const state = { progress: 0 }

      // A fumaça é suave: renderiza em meia resolução para economizar GPU.
      const resize = () => {
        const scale = 0.5
        canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale))
        canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale))
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform2f(uResolution, canvas.width, canvas.height)
      }
      const render = (time) => {
        gl.uniform1f(uTime, time)
        gl.uniform1f(uProgress, state.progress)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }

      resize()
      render(0)
      const observer = new ResizeObserver(resize)
      observer.observe(canvas)

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => (isActive ? gsap.ticker.add(render) : gsap.ticker.remove(render)),
      })
      gsap.to(state, {
        progress: 1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
      })

      return () => {
        gsap.ticker.remove(render)
        observer.disconnect()
        gl.deleteBuffer(buffer)
        gl.deleteProgram(program)
      }
    },
    { scope: sectionRef, dependencies: [lowEnd] },
  )

  return (
    <section ref={sectionRef} className="smoke" aria-label={lines.join(' ')}>
      <div className="smoke__sticky">
        {lowEnd ? <div className="smoke__fallback" /> : <canvas ref={canvasRef} className="smoke__canvas" />}
        <p className="smoke__text t-display" aria-hidden="true">
          {lines.map((line) => (
            <span key={line} className="smoke__word">
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
