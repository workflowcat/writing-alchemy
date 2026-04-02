// ═══════════════════════════════════════════════════
// АЛХІМІЯ ПИСЬМА — main.js
// Pretext-powered text layout + cursor displacement
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
  const dropCapSize = 120
  const dropCapPadding = 16
  const textFont = '17px "Cormorant Garamond", Georgia, serif'
  const lineHeight = 26

  drawIlluminatedLetter(ctx, 'А', 0, 0, dropCapSize)

  const text = 'Письмо — найдавніша алхімія людства. Справжні алхіміки були передусім письменниками: їхні лабораторні зошити, закодовані формули, точні описи процесів — це і була справжня магія. Не перетворення свинцю на золото, а перетворення хаотичного досвіду на систематичне знання. Сьогодні ми робимо те саме — пишемо промпти і називаємо це «інженерією», складаємо фреймворки і називаємо це «навичками», документуємо процеси і називаємо це «best practices». Але по суті, ми робимо те, що робили монахи у скрипторіях та алхіміки у лабораторіях: шукаємо правильну комбінацію слів, яка змінить реальність.'

  try {
    const prepared = prepareWithSegments(text, textFont)
    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = 4

    ctx.fillStyle = '#2c1810'
    ctx.font = textFont
    ctx.textBaseline = 'top'

    while (y < H - lineHeight) {
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
    ctx.fillStyle = '#2c1810'
    ctx.font = textFont
    ctx.textBaseline = 'top'
    ctx.fillText('Письмо — найдавніша алхімія людства.', dropCapSize + dropCapPadding, 4)
    ctx.fillText('Справжні алхіміки були передусім', dropCapSize + dropCapPadding, 30)
    ctx.fillText('письменниками.', dropCapSize + dropCapPadding, 56)
  }
}

function drawIlluminatedLetter(ctx, letter, x, y, size) {
  const cx = x + size / 2
  const cy = y + size / 2
  const r = size / 2 - 4

  const grad = ctx.createRadialGradient(cx - 10, cy - 10, 0, cx, cy, r)
  grad.addColorStop(0, '#d4af37')
  grad.addColorStop(0.6, '#c4a265')
  grad.addColorStop(1, '#a08040')

  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = grad
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, cy, r - 6, 0, Math.PI * 2)
  ctx.strokeStyle = '#8b2500'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx, cy, r - 10, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(139, 37, 0, 0.3)'
  ctx.lineWidth = 1
  ctx.stroke()

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    const dx = cx + Math.cos(angle) * (r - 3)
    const dy = cy + Math.sin(angle) * (r - 3)
    ctx.beginPath()
    ctx.arc(dx, dy, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = '#8b2500'
    ctx.fill()
  }

  ctx.strokeStyle = '#2d4a2d'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(x + size - 8, y + 20)
  ctx.quadraticCurveTo(x + size + 10, y - 5, x + size + 5, y + 35)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + 20, y + size - 8)
  ctx.quadraticCurveTo(x - 5, y + size + 10, x + 35, y + size + 5)
  ctx.stroke()

  ctx.fillStyle = '#2c1810'
  ctx.font = `bold ${size * 0.55}px "UnifrakturCook", cursive`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(letter, cx, cy + 2)
  ctx.textAlign = 'start'
}

// ═══════════════════════════════════════════════════
// Interactive displacement canvas
// Text shifts when cursor moves nearby, like wet ink
// ═══════════════════════════════════════════════════

function initDisplacementCanvas() {
  const canvas = document.getElementById('displacement-canvas')
  if (!canvas) return

  const dpr = window.devicePixelRatio || 1
  const width = Math.min(680, window.innerWidth - 80)
  const height = 340

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const textFont = '16px "Cormorant Garamond", Georgia, serif'
  const lineHeight = 24
  const text = 'Хто знає правильні слова — той трансформує реальність. Від шумерських жерців до сучасних промпт-інженерів, від монастирських скрипторіїв до IDE, від алхімічних лабораторій до мовних моделей — письмо залишається найпотужнішою технологією людства. Не тому, що слова магічні, а тому, що необхідність їх підбирати змушує нас думати ясно. Кожна епоха створює свої ритуали письма, свої касти посвячених, свої формули влади. Клинопис, каліграфія, друк, код, промпти — форма змінюється, але суть залишається: хто контролює символи, той контролює реальність. Філософський камінь виявився не субстанцією, а процесом — процесом точного формулювання того, чого ти хочеш.'

  let prepared = null
  try {
    prepared = prepareWithSegments(text, textFont)
  } catch (e) {
    return
  }

  // Store line data for displacement
  let lines = []
  function computeLines() {
    lines = []
    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = 12
    while (y < height - lineHeight) {
      const line = layoutNextLine(prepared, cursor, width - 40)
      if (line === null) break
      lines.push({
        text: line.text,
        baseX: 20,
        baseY: y,
        currentX: 20,
        currentY: y,
        targetX: 20,
        targetY: y
      })
      cursor = line.end
      y += lineHeight
    }
  }
  computeLines()

  let mouseX = -1000
  let mouseY = -1000
  const RADIUS = 90
  const STRENGTH = 18
  const RETURN_SPEED = 0.04 // slow drift back

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  })

  canvas.addEventListener('mouseleave', () => {
    mouseX = -1000
    mouseY = -1000
  })

  function render() {
    ctx.clearRect(0, 0, width, height)

    // Parchment tint
    ctx.fillStyle = 'rgba(232, 213, 163, 0.15)'
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#2c1810'
    ctx.font = textFont
    ctx.textBaseline = 'top'

    for (const line of lines) {
      // Calculate displacement from cursor
      const dy = line.baseY - mouseY
      const dx = line.baseX + 100 - mouseX // approximate line center
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < RADIUS && mouseX > 0) {
        const force = (1 - dist / RADIUS) * STRENGTH
        const angle = Math.atan2(dy, dx)
        line.targetX = line.baseX + Math.cos(angle) * force
        line.targetY = line.baseY + Math.sin(angle) * force
      } else {
        // Slow drift back to base position
        line.targetX = line.baseX
        line.targetY = line.baseY
      }

      // Ease toward target (slow return)
      line.currentX += (line.targetX - line.currentX) * (mouseX > 0 ? 0.15 : RETURN_SPEED)
      line.currentY += (line.targetY - line.currentY) * (mouseX > 0 ? 0.15 : RETURN_SPEED)

      // Slight opacity variation based on displacement
      const displacement = Math.sqrt(
        Math.pow(line.currentX - line.baseX, 2) +
        Math.pow(line.currentY - line.baseY, 2)
      )
      const alpha = Math.max(0.3, 1 - displacement / 30)
      ctx.fillStyle = `rgba(44, 24, 16, ${alpha})`

      ctx.fillText(line.text, line.currentX, line.currentY)
    }

    requestAnimationFrame(render)
  }

  render()
}

// --- Subtle parallax on dividers ---
function initParallax() {
  const dividers = document.querySelectorAll('.divider-svg')
  let ticking = false

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
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
  initDisplacementCanvas()
  initParallax()

  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      initHeroCanvas()
      initDisplacementCanvas()
    }, 200)
  })
})
