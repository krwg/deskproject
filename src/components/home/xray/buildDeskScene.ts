import {
  BoxGeometry,
  CylinderGeometry,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  SphereGeometry,
  Vector3,
  type Object3D,
} from 'three'

const DEFAULT_LINE = 0xe8e8e4

const DESK = {
  w: 1.2,
  d: 0.5,
  h: 0.75,
  topT: 0.03,
  sideT: 0.022,
  backT: 0.018,
} as const

const BACK_Z = -(DESK.d / 2)
const STAND_BASE_Z = BACK_Z + 0.055
const BAR_W = 0.37
const BAR_H = 0.07
const BAR_D = 0.07
const BAR_Z = STAND_BASE_Z + 0.075
const BAR_FRONT_Z = BAR_Z + BAR_D / 2
const PERIPH_GAP = 0.04

function wire(
  geometry: BoxGeometry | CylinderGeometry | SphereGeometry,
  material: LineBasicMaterial,
  threshold = 28,
) {
  return new LineSegments(new EdgesGeometry(geometry, threshold), material)
}

function boxWire(
  w: number,
  h: number,
  d: number,
  material: LineBasicMaterial,
  x = 0,
  y = 0,
  z = 0,
) {
  const mesh = wire(new BoxGeometry(w, h, d), material)
  mesh.position.set(x, y, z)
  return mesh
}

function beamBetween(
  a: Vector3,
  b: Vector3,
  thick: number,
  material: LineBasicMaterial,
) {
  const dir = new Vector3().subVectors(b, a)
  const len = dir.length()
  const mid = new Vector3().addVectors(a, b).multiplyScalar(0.5)
  const mesh = boxWire(len, thick, thick, material)
  mesh.position.copy(mid)
  mesh.quaternion.setFromUnitVectors(new Vector3(1, 0, 0), dir.clone().normalize())
  return mesh
}

function addDesk(root: Group, mat: LineBasicMaterial, soft: LineBasicMaterial) {
  const { w, d, h, topT, sideT, backT } = DESK
  const topY = h - topT / 2
  const sideH = h - topT
  const sideY = sideH / 2
  const inset = sideT / 2

  root.add(boxWire(w, topT, d, mat, 0, topY, 0))
  root.add(boxWire(sideT, sideH, d - 0.02, mat, -(w / 2 - inset), sideY, 0))
  root.add(boxWire(sideT, sideH, d - 0.02, mat, w / 2 - inset, sideY, 0))

  const backH = 0.22
  root.add(
    boxWire(
      w - sideT * 2,
      backH,
      backT,
      soft,
      0,
      h - topT - backH / 2 - 0.04,
      -(d / 2 - backT / 2),
    ),
  )
}

function addPedestal(root: Group, mat: LineBasicMaterial, soft: LineBasicMaterial) {
  const cabW = 0.38
  const cabD = DESK.d - 0.02
  const cabH = DESK.h - DESK.topT - 0.01
  const x = DESK.w / 2 - cabW / 2 - DESK.sideT
  const y = cabH / 2

  root.add(boxWire(cabW, cabH, cabD, mat, x, y, 0))

  const drawerH = cabH / 3 - 0.012
  for (let i = 0; i < 3; i++) {
    const dy = cabH - 0.02 - drawerH / 2 - i * (drawerH + 0.012)
    root.add(boxWire(cabW - 0.03, drawerH, cabD - 0.02, soft, x, dy, 0.004))
    root.add(boxWire(0.1, 0.012, 0.012, soft, x, dy, cabD / 2 - 0.01))
  }
}

function addFanDisc(
  parent: Group,
  material: LineBasicMaterial,
  radius: number,
  x: number,
  y: number,
  z: number,
  axis: 'x' | 'y' | 'z',
) {
  const fan = wire(new CylinderGeometry(radius, radius, 0.008, 14), material)
  if (axis === 'x') fan.rotation.z = Math.PI / 2
  if (axis === 'z') fan.rotation.x = Math.PI / 2
  fan.position.set(x, y, z)
  parent.add(fan)
}

function addPcCase(root: Group, mat: LineBasicMaterial, soft: LineBasicMaterial) {
  const w = 0.2
  const d = 0.29
  const h = 0.38
  const x = DESK.w / 2 - w / 2 - 0.02
  const z = -(DESK.d / 2 - d / 2 - 0.01)
  const y = DESK.h + h / 2

  const caseG = new Group()
  caseG.name = 'pc-case'
  caseG.position.set(x, y, z)

  caseG.add(boxWire(w, h, d, mat))
  caseG.add(boxWire(0.008, h - 0.05, d - 0.04, soft, -w / 2 + 0.01, 0, 0))

  const psuD = d / 3
  const psuH = h * 0.32
  const psuY = -h / 2 + psuH / 2 + 0.01
  const psuTop = psuY + psuH / 2
  caseG.add(boxWire(w - 0.02, psuH, psuD, mat, 0, psuY, -d / 2 + psuD / 2))

  const rearSize = w - 0.02
  const rearY = h / 2 - rearSize / 2 - 0.018
  const rearZ = -d / 2 + 0.01
  caseG.add(boxWire(rearSize, rearSize, 0.012, mat, 0, rearY, rearZ))
  addFanDisc(caseG, soft, rearSize * 0.42, 0, rearY, rearZ + 0.006, 'z')

  const coolW = w - 0.012
  const coolD = d * 0.95
  const coolT = 0.014
  const coolZ = -d / 2 + coolD / 2
  const bayD = coolD / 2 - 0.003
  const bayZ1 = coolZ - coolD / 4
  const bayZ2 = coolZ + coolD / 4
  const discR = Math.min(coolW, bayD) * 0.42

  const topY = h / 2 - coolT / 2 - 0.003
  caseG.add(boxWire(coolW, coolT, bayD, soft, 0, topY, bayZ1))
  caseG.add(boxWire(coolW, coolT, bayD, soft, 0, topY, bayZ2))
  addFanDisc(caseG, soft, discR, 0, topY, bayZ1, 'y')
  addFanDisc(caseG, soft, discR, 0, topY, bayZ2, 'y')

  const botY = psuTop + coolT / 2 + 0.002
  caseG.add(boxWire(coolW, coolT, bayD, soft, 0, botY, bayZ1))
  caseG.add(boxWire(coolW, coolT, bayD, soft, 0, botY, bayZ2))
  addFanDisc(caseG, soft, discR, 0, botY, bayZ1, 'y')
  addFanDisc(caseG, soft, discR, 0, botY, bayZ2, 'y')

  root.add(caseG)
}

function addMonitorStack(
  root: Group,
  mat: LineBasicMaterial,
  soft: LineBasicMaterial,
) {
  const group = new Group()
  group.name = 'monitor-stack'
  group.position.set(0, DESK.h, 0)

  group.add(boxWire(0.12, 0.025, 0.1, mat, 0, 0.012, STAND_BASE_Z))

  const stemH = 0.34
  const stem = wire(new CylinderGeometry(0.014, 0.016, stemH, 10), soft)
  stem.position.set(0, stemH / 2 + 0.02, STAND_BASE_Z)
  group.add(stem)

  group.add(boxWire(BAR_W, BAR_H, BAR_D, mat, 0, BAR_H / 2, BAR_Z))
  addFanDisc(group, soft, 0.018, -0.13, BAR_H + 0.002, BAR_Z, 'y')
  addFanDisc(group, soft, 0.018, 0.13, BAR_H + 0.002, BAR_Z, 'y')

  const monGap = 0.05
  const monW = 0.55
  const monH = 0.33
  const monT = 0.012
  const monY = BAR_H + monGap + monH / 2
  const monZ = BAR_Z - 0.01
  group.add(boxWire(monW, monH, monT, mat, 0, monY, monZ))
  group.add(
    boxWire(
      monW - 0.024,
      monH - 0.024,
      0.002,
      soft,
      0,
      monY,
      monZ + monT / 2 + 0.001,
    ),
  )

  const vesaZ = (STAND_BASE_Z + monZ) / 2
  group.add(
    boxWire(
      0.05,
      0.04,
      Math.abs(monZ - STAND_BASE_Z) + 0.02,
      soft,
      0,
      monY - 0.04,
      vesaZ,
    ),
  )
  group.add(
    boxWire(0.08, 0.08, 0.02, soft, 0, monY - 0.04, monZ - monT / 2 - 0.01),
  )
  group.add(
    boxWire(0.32, 0.012, 0.028, soft, 0, monY + monH / 2 + 0.008, monZ + 0.01),
  )

  root.add(group)
}

function addPeripherals(
  root: Group,
  mat: LineBasicMaterial,
  soft: LineBasicMaterial,
) {
  const y = DESK.h
  const kbW = 0.44
  const kbD = 0.15
  const kbH = 0.025
  const kbBack = BAR_FRONT_Z + PERIPH_GAP
  const kbZ = kbBack + kbD / 2

  const mw = 0.08 * 0.82
  const mh = 0.04 * 0.82
  const md = 0.11 * 0.82
  const mouseZ = kbZ + 0.01

  const matBack = kbBack - 0.02
  const matFront = Math.max(kbZ + kbD / 2, mouseZ + md / 2) + 0.02
  const matD = matFront - matBack
  const matZ = (matBack + matFront) / 2
  root.add(boxWire(0.78, 0.004, matD, soft, 0, y + 0.002, matZ))

  root.add(boxWire(kbW, kbH, kbD, mat, 0, y + kbH / 2 + 0.004, kbZ))
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 10; c++) {
      root.add(
        boxWire(
          0.032,
          0.008,
          0.032,
          soft,
          -0.18 + c * 0.04,
          y + kbH + 0.006,
          kbZ - 0.045 + r * 0.04,
        ),
      )
    }
  }

  root.add(boxWire(mw, mh, md, mat, 0.26, y + mh / 2 + 0.004, mouseZ))
}

function addMicArm(root: Group, mat: LineBasicMaterial, soft: LineBasicMaterial) {
  const arm = new Group()
  arm.name = 'mic-arm'
  arm.position.set(-(DESK.w / 2), DESK.h, 0)

  arm.add(boxWire(0.055, 0.035, 0.07, mat, 0.02, 0.02, 0))
  arm.add(boxWire(0.045, 0.055, 0.055, soft, -0.02, -0.015, 0))
  arm.add(boxWire(0.05, 0.012, 0.05, soft, 0, -0.045, 0))

  const p0 = new Vector3(0.02, 0.04, 0)
  const p1 = new Vector3(0.06, 0.28, 0.02)
  const p2 = new Vector3(0.28, 0.42, 0.1)
  const p3 = new Vector3(0.42, 0.22, 0.18)

  arm.add(beamBetween(p0, p1, 0.016, mat))
  const j1 = wire(new SphereGeometry(0.018, 8, 8), soft)
  j1.position.copy(p1)
  arm.add(j1)

  arm.add(beamBetween(p1, p2, 0.016, mat))
  const j2 = wire(new SphereGeometry(0.02, 8, 8), soft)
  j2.position.copy(p2)
  arm.add(j2)

  arm.add(beamBetween(p2, p3, 0.014, mat))
  const tip = wire(new SphereGeometry(0.014, 8, 8), soft)
  tip.position.copy(p3)
  arm.add(tip)

  const mic = new Group()
  mic.position.copy(p3)
  mic.rotation.set(0.15, 0.55, 1.05)
  mic.add(boxWire(0.055, 0.14, 0.055, mat, 0, 0.02, 0))
  mic.add(boxWire(0.048, 0.04, 0.048, soft, 0, 0.1, 0))
  mic.add(boxWire(0.01, 0.09, 0.01, soft, -0.038, 0.02, 0))
  mic.add(boxWire(0.01, 0.09, 0.01, soft, 0.038, 0.02, 0))
  mic.add(boxWire(0.086, 0.012, 0.012, soft, 0, -0.03, 0))
  mic.add(boxWire(0.022, 0.022, 0.035, soft, 0, -0.048, 0))
  arm.add(mic)

  root.add(arm)
}

function addChair(root: Group, mat: LineBasicMaterial, soft: LineBasicMaterial) {
  const chair = new Group()
  chair.name = 'chair'
  chair.position.set(0, 0, DESK.d / 2 + 0.42)
  chair.rotation.y = Math.PI

  chair.add(boxWire(0.46, 0.06, 0.46, mat, 0, 0.46, 0))
  chair.add(boxWire(0.46, 0.52, 0.06, mat, 0, 0.78, -0.2))
  chair.add(boxWire(0.36, 0.12, 0.04, soft, 0, 0.62, -0.18))
  chair.add(boxWire(0.06, 0.04, 0.28, soft, -0.26, 0.62, 0.02))
  chair.add(boxWire(0.06, 0.04, 0.28, soft, 0.26, 0.62, 0.02))
  chair.add(boxWire(0.04, 0.18, 0.04, soft, -0.26, 0.52, 0.05))
  chair.add(boxWire(0.04, 0.18, 0.04, soft, 0.26, 0.52, 0.05))

  const pillar = wire(new CylinderGeometry(0.035, 0.045, 0.4, 8), soft)
  pillar.position.set(0, 0.24, 0)
  chair.add(pillar)

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2
    const leg = boxWire(0.38, 0.025, 0.04, soft)
    leg.position.set(Math.cos(angle) * 0.16, 0.05, Math.sin(angle) * 0.16)
    leg.rotation.y = -angle
    chair.add(leg)
    const wheel = wire(new SphereGeometry(0.04, 8, 8), soft)
    wheel.position.set(Math.cos(angle) * 0.34, 0.04, Math.sin(angle) * 0.34)
    chair.add(wheel)
  }

  root.add(chair)
}

export function buildDeskScene(lineColor: number = DEFAULT_LINE) {
  const root = new Group()
  root.name = 'desk-xray'

  const mat = new LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.92,
  })
  const soft = new LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.55,
  })

  addDesk(root, mat, soft)
  addPedestal(root, mat, soft)
  addPcCase(root, mat, soft)
  addMonitorStack(root, mat, soft)
  addPeripherals(root, mat, soft)
  addMicArm(root, mat, soft)
  addChair(root, mat, soft)

  const hit = new Mesh(new BoxGeometry(2.2, 1.5, 2.0))
  hit.visible = false
  hit.name = 'bounds'
  hit.position.set(0, 0.7, 0.15)
  root.add(hit)

  root.traverse((obj: Object3D) => {
    obj.frustumCulled = false
  })

  return { root, materials: [mat, soft] }
}
