# Handoff cho session tiếp theo — toolbanquyen.vn

> Session 2026-05-22 đã kết thúc. Tool ở **v4.2 production-ready**, deployed live `toolbanquyen.vn`.
> Paste prompt bên dưới vào session Claude Cowork mới để pick up context.

---

## 🚀 PROMPT KHỞI ĐẦU SESSION MỚI

```
Đọc file C:\Users\MaRa\toolbanquyen.vn\HANDOFF-next-session.md
Và đọc memory project_toolbanquyen.md trước.

Sau đó hỏi mình: "Bạn deploy bản session trước rồi đúng không? 
Tiếp tục verify 6 app priority còn lại (MS365, Affinity, Perplexity, DaVinci, 
Discord, Sketch), hay focus FB marketing trước?"
— đợi mình trả lời, đừng tự refactor.
```

---

## Tóm tắt session 2026-05-22 đã làm gì

1. ✅ **Đã verify SCREENSHOT 19 apps** từ trang chính thức (cover 85% user cart)
   - **Round 1 (12):** Adobe CC, ChatGPT, Claude, Figma, Notion, Cursor, Spotify, Netflix, YouTube Premium, Google Workspace, Webflow, Linear
   - **Round 2 (7):** Canva, Midjourney, GitHub Copilot, CapCut, Apple One, iCloud+, JetBrains
2. ✅ **Tách 6 Adobe individual apps** (Photoshop, Illustrator, InDesign, AE, Lightroom, Acrobat Pro)
3. ✅ **Cabinet Grotesk wordmark** + drop .vn TLD
4. ✅ **Footer + verified badge polish** — concise + "Đã cập nhật"
5. ✅ **Cowork Scheduled Task active** — weekly audit T2 7am
6. ✅ **VN regional pricing** đã apply cho Apple ecosystem + Canva + CapCut

## Lessons quan trọng từ verify session

- **Claude AI error rate ~33-71%** trên pricing complex (Adobe + ChatGPT)
- Adobe CC Pro PERSONAL = **$33.99** (NOT $69.99 Business)
- ChatGPT Pro = single $109 (NOT split $100/$200)
- Apple One VN = **239k/279k đ** (RẺ 45% vs US $19.95)
- iCloud+ VN có riêng (50GB chỉ 19k/mo vs US $0.99)
- Canva VN: Pro 150k (vs US $15), Teams per user (NOT package 5)
- Promo "60% off năm đầu" = marketing → tool dùng RACK RATE

---

## 📋 Pending tasks priority order

### P1 — High value (next session bắt đầu)

1. **MS365** — web bị lỗi tuần trước, retry verify
2. **Affinity** — code claim FREE V3 sau Canva acquire Oct 2025, **cần verify ngay**
3. **Perplexity Pro** — AI search hot VN
4. **DaVinci Resolve Studio** ($295 one-time)
5. **Discord Nitro** ($9.99 / $2.99 Basic)
6. **Sketch** Mac designer

### P2 — Medium

LinkedIn Premium, Loom, ClickUp, Zoom, Vercel, Raycast Pro, Duolingo, Procreate, Final Cut Pro

### P3 — Skip / Free / Stable

Architecture (AutoCAD/Revit/SketchUp/Rhino/Lumion/Twinmotion/Enscape/Cinema 4D/Blender), Marketing (Buffer/Ahrefs/Semrush), Free tools (Krita/Photopea/GIMP/Inkscape/Obsidian/Logseq/Audacity/OBS/Telegram/InShot), VN streaming (VieON/FPT Play/Galaxy Play — đã có VN priceVND)

---

## 🚀 Marketing roadmap (P4 — chưa start)

### FB content posts angles (3-5 post series):
- "Lương 15-25tr designer — app ăn bao nhiêu % thu nhập?" (data-driven)
- "Mình bỏ Adobe sang Affinity tiết kiệm 5tr/năm — đáng không?" (personal narrative)
- "5 free alternative pro tool ít người biết tới" (utility)
- "Lương dưới 15tr nên dùng app gì để vẫn pro?" (audience-specific)

Mỗi post end với: "Mình build tool nhỏ giúp tính nhanh: toolbanquyen.vn — share link"

**Mục tiêu tuần 1-2:** 200-500 unique visitors → baseline analytics.

---

## ⚙️ Tool architecture state

- **78 apps** tổng, 9 category (đã thêm "Cá nhân")
- **6 Adobe individual cards** + Adobe CC parent trimmed 6 tiers
- **ANNUAL_DISCOUNTS map** centralized — 30+ tier pairs
- **OVERLAP_GROUPS** — 16 groups (gồm music/vn-streaming/cloud-storage/adobe-individuals/photo-edit/vector-design)
- **Methodology modal** — 6 sections (gồm Promo policy mới)
- **Cloudflare Web Analytics** — auto-inject active
- **Scheduled task** weekly audit active
- Pricing data model: tier.price (USD monthly rack), tier.priceVND (override khi VN regional), tier.annualSave (% off khi annual)

---

## ⚠️ CRITICAL warnings (đừng làm)

1. **KHÔNG tự confident pricing** từ training memory — verify screenshot user là ground truth
2. **VN regional ≠ US regional** — luôn check tab Personal VN không phải US/Business
3. **Promo prices = marketing** — tool dùng rack rate
4. **KHÔNG dùng Python/bash modify file** — gây truncate. Luôn Edit tool.
5. **Bash mount stale size** — tin Read tool
6. **Git push từ PowerShell** — bash không có quyền `.git/index.lock`
7. **KHÔNG thêm CDN dependency mới** — discuss user trước

---

## 🚀 Deploy

```powershell
cd C:\Users\MaRa\toolbanquyen.vn
Remove-Item .git\index.lock -Force -ErrorAction SilentlyContinue
git add -A
git commit -m "message"
git push
```

---

## 📂 File structure

```
C:\Users\MaRa\toolbanquyen.vn\
├── index.html               ~4900 lines, single-file app
├── logo.svg, logo-full.svg, logo-full-inverse.svg
├── icons/                   80+ app logos (gồm 6 Adobe individuals mới)
├── images/                  calculator illustration PNG (dark + light theme)
├── HANDOFF-next-session.md  ← THIS FILE
├── pricing-audit-YYYY-MM-DD.md  ← weekly auto-generated
└── .git/
```

---

## 🧠 Memory files (đọc trước)

- `project_toolbanquyen.md` — full state, architecture, decisions
- `user_profile.md` — MARA profile
- `feedback_app_positioning.md` — Midjourney=art, Canva=amateur, Adobe=pro

---

## 👤 User profile reminder

- **MARA**, designer Việt tự học AI, tư duy hệ thống mạnh, không phải coder
- LUÔN ĐÚNG về file/deploy — conflict → check bản thân trước, không hỏi lại user
- Đã ship SIUU MAGIC (image AI tool, 4 tháng) — có gu, có tốc độ
- Không thích over-format chat — prose, không bullet tràn lan
- Trả lời thẳng, không vòng vo. Honest về limitations và data quality.
