# Handoff — Polish hero section, toolbanquyen.vn

## Trước khi bạn bắt đầu

Tôi là Claude đã build phần lớn project này. Hero hiện tại đã clean và functional, nhưng người chủ project — một designer Việt — muốn nó **đẹp hơn**. Đẹp theo nghĩa "thấy là muốn dùng", không cần wow, mà là **quiet sophistication**. Anh ấy nói "đừng ép nó quá, để nó sáng tạo một chút" — nên bạn có không gian, đừng bị tôi hay anh ấy gò ép. Tin vào instinct của bạn.

---

## Context

**Project:** `toolbanquyen.vn` — web tool tính chi phí phần mềm bản quyền cho người Việt. User là freelancer/designer/dev cần biết nhanh các app họ dùng đang ăn bao nhiêu % lương mỗi tháng.

**User chủ project:** designer Việt, tư duy hệ thống mạnh, không phải coder. Yêu cầu đẹp + chính xác data.

Tool đã hoàn chỉnh: 29 app data + tier system (1-8 tier mỗi app, có VND regional pricing), recommendation engine (detect overlap, suggest downgrade), salary calculator. Hero chỉ là "vé vào cửa".

---

## File location

- `C:\Users\MaRa\toolbanquyen.vn\index.html` — single file (CSS + HTML + JS inline)
- `C:\Users\MaRa\toolbanquyen.vn\icons\` — 46 SVG logo có sẵn
- `C:\Users\MaRa\toolbanquyen.vn\lottie-data.js` — Lottie data cho profession blocks (không liên quan hero)

CSS vars ở dòng `:root` + `[data-theme="light"]`. Accent green: `#22c55e`.

---

## Scope: CHỈ `<section class="hero">`

**Đừng đụng:**
- Header (nav, logo, theme toggle, currency switch) — đã ổn
- `#apps`, `#recs`, `#professions`, `#skills` sections — đã ổn
- JS logic (salary, recommendation, modal, intent matching)
- Data arrays (APPS, PROFESSIONS, SKILLS, INTENT_MAP, OVERLAP_GROUPS)
- Cuối file: `normalizeTiers(); bindIntent(); fetchRate(); renderAll();` phải còn nguyên

---

## State hiện tại của hero

**Layout:** 3-column grid (cards-left | center 720px | cards-right)

**Center content (top → bottom):**
1. Pill "🖥 Tính giá · So sánh · Tiết kiệm"
2. H1 "Bạn đang chi bao nhiêu cho phần mềm?" (60-64px)
3. Subtitle "Tick app đang dùng → hệ thống tính ngay tổng chi phí và % lương bị ăn mỗi tháng."
4. 3-step flow: "1 Nhập lương → 2 Tick app dùng → 3 Xem % lương bị ăn"
5. Salary input "25.000.000 [VND]" với label
6. Search bar "Hoặc tìm app cụ thể: Photoshop, Cursor, ChatGPT…"
7. 4 checkmark trust signals: Miễn phí 100% · Không quảng cáo · Giá chính hãng · Không cần đăng ký
8. Hero-stats grid 4 ô (2.4 triệu / 29+ / 6 / Live)

**6 floating cards (3 trái, 3 phải):**
- Adobe Photoshop $22.99 (popular, XL 320px)
- Figma Professional $15 (MD 240px)
- Claude Pro $20 (SM 220px)
- ChatGPT Plus $20 (popular, LG 270px)
- Cursor Pro $20 (MD 240px)
- Midjourney Standard $30 (LG 270px)

**Đã thử và LOẠI:**
- Ghost cards mờ → trông broken
- SVG dotted curves → user confused
- Green glow border quanh "Phổ biến" → noisy
- `backdrop-filter: blur(12px)` → jank trên GPU yếu
- 3D `perspective` + `rotateY` → trông kỳ

---

## Goal

Đẹp hơn — bằng cách nào tùy bạn. Mục tiêu cảm xúc: user load trang lần đầu phải có cảm giác **"app này đáng tin"** và **"tôi muốn thử"**.

**Bạn tự do quyết:**
- Layout (giữ 3 cột? Đổi sang 2 cột? Center full-bleed? Off-axis composition?)
- Decoration (gradient mesh? ambient orb? subtle dot grid? noise texture? aurora? hoàn toàn không decoration?)
- Typography hierarchy (sizing, weight, color)
- Card style (giữ floating? thay bằng marquee scrolling? grid neat? hoặc bỏ luôn?)
- Animation (subtle hover, mouse parallax, scroll-driven, fade-in entrance, hoặc tĩnh hoàn toàn)
- Bố cục center content (gom lại? tách ra? đổi order?)
- Có thể remove các phần thừa nếu thấy clutter (vd: hero-stats có thể bỏ nếu hero đã đủ thông tin)

**Tham khảo cảm giác** (không copy):
- **Linear** — quiet, accent dùng spare, gradient subtle
- **Stripe** — minimal, focus copy + 1 visual element trung tâm
- **Vercel** — bold typography, breathing room rộng rãi
- **Anthropic** — warm, considered, không hét lên
- **Apple landing** — typography lead, composition đối xứng có chủ ý

**Đừng** cố copy mockup ChatGPT design tool — đã thử nhiều rounds, không scale được vì static vs dynamic.

---

## Hard constraints

1. **Performance**: KHÔNG dùng `backdrop-filter`, `filter: blur/drop-shadow/saturate` trên element animated. CSS transforms (translate, rotate, scale, opacity) OK.
2. **Responsive**: ≥1080px desktop full layout, <1080px mobile clean fallback. Test 1920/1440/1280/1080/768/375.
3. **Cả 2 theme phải đẹp**: dark là default, light cũng phải cân. Dùng CSS vars có sẵn.
4. **IDs phải giữ** (JS đang bind):
   - `salary-hero`, `salary-cur-hero` — salary input + currency select
   - `search-input` — search field
   - `rate-display` — tỉ giá display
   - `theme-toggle`, `cur-toggle` — không trong hero, nhưng đừng break
5. **Text core giữ**: title "Bạn đang chi bao nhiêu cho phần mềm?" là hook chính — không đổi
6. **Không thêm dependency**: pure CSS + HTML. Có Lottie + bodymovin CDN đã load cho profession blocks, nếu cần dùng Lottie animation thêm thì OK.
7. **File integrity**: edit xong, verify cuối file vẫn còn `</body></html>`. Đừng dùng Python script — Edit tool trực tiếp.

---

## Memory cần biết về user (đọc giúp tôi)

- User luôn đúng về vấn đề file/deploy — nếu có conflict, kiểm tra lại bản thân trước
- User Vietnamese, prefer reply tiếng Việt
- User không thích over-formatting (bullet/header tràn lan) trong conversation, nhưng OK trong document như cái này
- Anh đã thiết kế xong app SIUU MAGIC (chỉnh sửa ảnh AI) trong 4 tháng — có gu, có tốc độ
- Sandbox bash hay stale size — tin Read tool, đừng tin `stat`/`wc` từ bash khi nghi ngờ

---

## Deliverable

1. Edit `index.html` — section hero only
2. Test:
   - Toggle `<html data-theme="dark|light">` — cả 2 cân
   - Viewport 1920/1440/1280/1080/768 — không bể
   - F12 Performance tab → animation không kéo FPS xuống <55
3. Báo cáo ngắn: làm gì, lý do, có gì cần user feedback

**Đi đi. Tôi tin bạn.**
