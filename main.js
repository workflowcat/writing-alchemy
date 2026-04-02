// ═══════════════════════════════════════════════════
// АЛХІМІЯ ПИСЬМА — main.js
// Pretext-powered text layout + scroll interactions
// ═══════════════════════════════════════════════════

import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext'

// --- Scroll-based section reveal ---
function initScrollReveal() {
  const sections = document.querySelectorAll('.section')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )
  sections.forEach(s => observer.observe(s))
}

// --- Hero Canvas: Illuminated drop cap with pretext ---
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas')
  if (!canvas) return

  const dpr = window.devicePixelRatio || 1
  const width = Math.min(680, window.innerWidth - 80)
  const height = 260

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  drawHeroIllumination(ctx, width, height)
}

function drawHeroIllumination(ctx, W, H) {
  // Illuminated capital "А" with surrounding text
  const dropCapSize = 120
  const dropCapPadding = 16
  const textFont = '17px "Cormorant Garamond", Georgia, serif'
  const lineHeight = 26

  // Draw the illuminated "А"
  drawIlluminatedLetter(ctx, 'А', 0, 0, dropCapSize)

  // Flow text around the drop cap using pretext
  const text = 'Письмо — це найдавніша алхімія людства. Не в метафоричному сенсі: справжні алхіміки були передусім письменниками. Їхні лабораторні зошити, закодовані формули, точні описи процесів — це і була справжня магія. Не перетворення свинцю на золото, а перетворення хаотичного досвіду на систематичне знання. Сьогодні ми робимо те саме. Ми пишемо промпти — і називаємо це «інженерією». Ми складаємо фреймворки — і називаємо це «навичками». Ми документуємо процеси — і називаємо це «best practices». Але по суті, ми робимо те, що робили монахи у скрипторіях та алхіміки у лабораторіях: шукаємо правильну комбінацію слів, яка змінить реальність.'

  try {
    const prepared = prepareWithSegments(text, textFont)

    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = 4

    ctx.fillStyle = '#2c1810'
    ctx.font = textFont
    ctx.textBaseline = 'top'

    while (y < H - lineHeight) {
      // Variable width: narrow when beside the drop cap, full width after
      const maxWidth = y < dropCapSize
        ? W - dropCapSize - dropCapPadding
        : W

      const xOffset = y < dropCapSize
        ? dropCapSize + dropCapPadding
        : 0

      const line = layoutNextLine(prepared, cursor, maxWidth)
      if (line === null) break

      ctx.fillText(line.text, xOffset, y)
      cursor = line.end
      y += lineHeight
    }
  } catch (e) {
    // Fallback: simple wrapped text if pretext fails
    ctx.fillStyle = '#2c1810'
    ctx.font = textFont
    ctx.textBaseline = 'top'
    ctx.fillText('Письмо — це найдавніша алхімія людства.', dropCapSize + dropCapPadding, 4)
    ctx.fillText('Не в метафоричному сенсі: справжні алхіміки', dropCapSize + dropCapPadding, 30)
    ctx.fillText('були передусім письменниками.', dropCapSize + dropCapPadding, 56)
  }
}

function drawIlluminatedLetter(ctx, letter, x, y, size) {
  const cx = x + size / 2
  const cy = y + size / 2
  const r = size / 2 - 4

  // Gold background circle
  const grad = ctx.createRadialGradient(cx - 10, cy - 10, 0, cx, cy, r)
  grad.addColorStop(0, '#d4af37')
  grad.addColorStop(0.6, '#c4a265')
  grad.addColorStop(1, '#a08040')

  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = grad
  ctx.fill()

  // Inner border
  ctx.beginPath()
  ctx.arc(cx, cy, r - 6, 0, Math.PI * 2)
  ctx.strokeStyle = '#8b2500'
  ctx.lineWidth = 2
  ctx.stroke()

  // Decorative inner circle
  ctx.beginPath()
  ctx.arc(cx, cy, r - 10, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(139, 37, 0, 0.3)'
  ctx.lineWidth = 1
  ctx.stroke()

  // Small decorative dots around the border
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    const dx = cx + Math.cos(angle) * (r - 3)
    const dy = cy + Math.sin(angle) * (r - 3)
    ctx.beginPath()
    ctx.arc(dx, dy, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = '#8b2500'
    ctx.fill()
  }

  // Vine flourishes (simplified)
  ctx.strokeStyle = '#2d4a2d'
  ctx.lineWidth = 1.5

  // Top-right vine
  ctx.beginPath()
  ctx.moveTo(x + size - 8, y + 20)
  ctx.quadraticCurveTo(x + size + 10, y - 5, x + size + 5, y + 35)
  ctx.stroke()

  // Bottom-left vine
  ctx.beginPath()
  ctx.moveTo(x + 20, y + size - 8)
  ctx.quadraticCurveTo(x - 5, y + size + 10, x + 35, y + size + 5)
  ctx.stroke()

  // The letter itself
  ctx.fillStyle = '#2c1810'
  ctx.font = `bold ${size * 0.55}px "UnifrakturCook", cursive`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(letter, cx, cy + 2)

  // Reset alignment
  ctx.textAlign = 'start'
}

// --- Subtle parallax on dividers ---
function initParallax() {
  const dividers = document.querySelectorAll('.divider-svg')
  let ticking = false

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        dividers.forEach(svg => {
          const rect = svg.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (rect.top / window.innerHeight - 0.5) * 8
            svg.style.transform = `translateY(${offset}px)`
          }
        })
        ticking = false
      })
      ticking = true
    }
  }, { passive: true })
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal()
  initHeroCanvas()
  initParallax()

  // Redraw hero on resize
  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(initHeroCanvas, 200)
  })
})
