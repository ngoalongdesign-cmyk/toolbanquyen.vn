# Handoff — Session tiếp theo toolbanquyen.vn

## Context

Project gần hoàn thiện. Hero bento + Receipt aesthetic shipped. App grid + Recommendation engine + Salary calc đã work. User reviewed, đã ship-quality 90%, còn 3 issue cụ thể cần fix + 1 feature addition.

**File:** `C:\Users\MaRa\toolbanquyen.vn\index.html` (single file, ~2287 dòng)

**Memory file đã có:** `spaces/.../memory/project_toolbanquyen.md` — đọc trước để hiểu architecture/decisions đã rồi.

---

## 3 việc phải làm + 1 polish quan trọng

### 1. 🐛 BUG: "Xem kết quả tính ↓" không scroll, vẫn mở modal app

**Vị trí:** Cart sticky bar bottom, nút `#btn-cart-detail`

**Mong muốn:** Click → smooth scroll xuống section `#recs` (đề xuất tối ưu + salary breakdown). KHÔNG mở modal.

**Fix:** Trong JS, tìm `document.getElementById('btn-cart-detail').addEventListener` — hiện đang `openModal(S.cart[0])` hoặc tương đương. Sửa thành:

```js
document.getElementById('btn-cart-detail').addEventListener('click',function(){
  if(S.cart.length===0) return;
  var target = document.getElementById('recs') || document.getElementById('professions');
  if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
});
```

**Note:** Tôi đã fix điều này trong session trước nhưng Claude designer apply lại file mới có vẻ regression. Lần này fix permanently.

### 2. 🎨 Profession icons — fix icon đầu (UI/UX Designer) bị lỗi

**Context:** Section "Bộ tool theo nghề" có 6 profession cards với SVG icons. Icon đầu (UI/UX Designer) đang hiển thị lỗi (broken/wrong shape). 5 icon còn lại OK.

**Decision đã chốt:** **Giữ SVG static** (không quay lại Lottie). Lý do:
- Lottie nặng (210KB JSON + bodymovin CDN)
- Lottie loop là noise, không hợp bento receipt aesthetic
- SVG line stroke currentColor match aesthetic LIVE pulse, arrows trong table

**Fix:** Trong APPS array (hoặc PROFESSIONS array), tìm entry `uxdesigner` (hoặc `id:'uxdesigner'`). Có field `svg:` chứa inline SVG. Sửa SVG đó.

**Gợi ý icon UI/UX Designer:** một frame có cursor + grid, hoặc Figma-like layered shapes. SVG line stroke currentColor, viewBox 24x24, stroke-width 1.8-2. Style đồng nhất với 5 icon kia:
- Developer: code brackets `< >`
- Content Creator: video clapperboard 🎬
- Marketer/SEO: chart bar 📊
- Freelance Designer: pencil ✏️
- Founder/Team Lead: rocket 🚀
- UI/UX Designer: **CẦN FIX** — gợi ý: artboard với pointer hoặc browser window

Tham khảo style: heroicons / lucide / phosphor — line icons.

### 3. ➕ Thêm apps cho ngành "Kiến trúc" + "Quay dựng phim" + audit ngành khác

**3a. Apps Kiến trúc (architecture):**

Apps cần thêm vào APPS array:
- **AutoCAD** ($170/month, ~4.4M VND) — Autodesk CAD industry standard. `logo:'icons/...'` — cần thêm file SVG vào folder icons/ hoặc dùng simpleicons CDN.
- **Revit** ($235/month, ~6.1M VND) — Autodesk BIM
- **SketchUp** (Pro $29/mo, Studio $63/mo) — phổ biến nhất ở VN
- **Rhinoceros / Rhino** ($995 one-time → fake $30/mo tương đương) — 3D modeling
- **Lumion** ($1,749 one-time → $50/mo tương đương) — render
- **Twinmotion** ($499/year, ~$42/mo) — real-time render
- **Enscape** ($599/year, ~$50/mo) — render plugin

Category mới hoặc gộp vào `Design`? Đề xuất tạo category `Architecture` riêng (icon: building 🏛️).

**3b. Apps Quay dựng phim (filmmaking, hiện đang gộp `Video`):**

Đã có: CapCut, Premiere Pro, Descript, Runway, DaVinci. Thêm:
- **Avid Media Composer** ($24.99/mo) — Hollywood standard, nhiều show TVE-Net dùng
- **Final Cut Pro** ($299 one-time → fake $25/mo tương đương, Mac only)
- **Frame.io** (Free / $15-25/user) — video review collab, dùng nhiều ở agency
- **Red Giant Complete** ($799/year, ~$67/mo) — VFX plugin set
- **Cinema 4D** ($799/year, ~$67/mo) — motion graphics (cross video + 3D)
- **After Effects** — actually đã có trong Adobe CC, nhưng có thể tách standalone nếu muốn (Single App tier Adobe CC = $22.99 cho 1 app)

**3c. Audit ngành khác còn thiếu:**

Ngoài Design / AI / Dev / Productivity / Marketing / Video hiện tại, đề xuất bổ sung:

- **🎵 Music/Audio production** (mới hoàn toàn):
  - Logic Pro ($199 one-time → ~$17/mo)
  - Ableton Live Standard ($449 → ~$37/mo)
  - FL Studio Producer ($199 → ~$17/mo)
  - Pro Tools Standard ($31.99/mo)
  - Splice ($9.99/mo)

- **📸 Photography** (có thể merge Design):
  - Capture One Pro ($24/mo)
  - Affinity Photo ($69.99 one-time → ~$6/mo)

- **🎮 3D / Game dev** (mới hoàn toàn):
  - Blender (Free) — phổ biến VN
  - Unreal Engine (Free, royalty)
  - Unity Pro ($170/mo)
  - Maya ($235/mo)
  - ZBrush ($39.95/mo)
  - Houdini Indie ($22/mo)

- **🎓 Education / Learning** (optional):
  - Udemy Business
  - LinkedIn Learning
  - Coursera Plus

Decision tùy bạn — không cần thêm tất cả. Đề xuất chiến lược: thêm Architecture (8 app) + 3D/Game (5 app) + Music (3 app) = 16 app mới → tổng 45 app. Đủ scope cho creator Việt.

**Format APPS entry mới:**
```js
{id:'autocad',name:'AutoCAD',cat:'Architecture',color:'#FF0000',initials:'AC',popular:false,
 url:'https://www.autodesk.com/products/autocad/overview',
 desc:'CAD industry standard — vẽ kỹ thuật 2D/3D, BIM cho kiến trúc sư.',
 tiers:[
   {id:'monthly',label:'Monthly',price:235,features:[...]},
   {id:'annual',label:'Annual',price:170,popular:true,features:[...]},
   {id:'student',label:'Student',price:0,note:'Yêu cầu xác minh sinh viên',features:[...]}
 ]}
```

Cần thêm SVG logo files vào `icons/` folder (download từ brand site hoặc dùng simpleicons.org CDN backup).

### 4. ✨ Polish: App grid hiển thị "ít hàng + Xem thêm"

**Vấn đề hiện tại:** 29 app hiển thị hết → grid dài, scroll nhiều. Sau khi thêm 16 app → 45 app sẽ quá dài.

**Mong muốn:** Mặc định hiện 9-12 app (2-3 hàng × 4 cột desktop, hoặc 3-4 hàng × 3 cột). Có nút **"Xem thêm N app"** ở dưới grid → click thì expand show hết.

**Implementation:**
- Default `S.showAll = false`
- Trong `renderApps()`: filter ra list, nếu `!S.showAll && list.length > 12` thì slice(0, 12). Hiện nút "Xem thêm" dưới grid.
- Click nút → `S.showAll = true` → renderAll() → show hết
- Toggle "Thu gọn ← thu lại 12 app" nếu đang expand

**UX detail:**
- Mặc định 12 app: sort popular trước, rồi tới các app khác (priority order)
- Khi user filter category (vd Design), reset `showAll = false`, show 12 app trong category đó (nếu có nhiều hơn)
- Khi search keyword: show all results (ignore showAll), không truncate

---

## Hard constraints

1. KHÔNG đụng hero bento section
2. KHÔNG đụng modal app logic (tier selection, cart add)
3. Giữ tất cả IDs JS bind hiện tại
4. Performance: KHÔNG dùng `backdrop-filter`, `filter: blur/drop-shadow` trên animated elements
5. Responsive: ≥1080 desktop, <1080 mobile fallback
6. Cả 2 theme cân bằng (dark + light)
7. File integrity: cuối file phải còn `normalizeTiers(); fetchRate(); renderAll(); </script></body></html>`
8. KHÔNG thêm CDN dependency mới (trừ khi cần icon library cho new apps — discuss với user trước)

---

## Don't touch

- `<section class="hero">` bento
- Modal `#modal-overlay` HTML + buildModal/openModal JS
- `#cart-bar` HTML + cart bar JS
- `#recs` section structure (salary card + rec-panel) — chỉ thêm logic, không refactor
- Header (logo, nav, theme toggle, currency segs)
- Footer

---

## Memory về user

- Designer Việt, tư duy hệ thống mạnh, không phải coder
- LUÔN ĐÚNG về vấn đề file/deploy — conflict thì kiểm tra bản thân trước
- Đã thiết kế app SIUU MAGIC (4 tháng) — có gu, có tốc độ
- Không thích over-format chat — phản hồi prose, không bullet tràn lan
- Đã ship nhiều rounds, kiên nhẫn nhưng yêu cầu accuracy + visual quality
- Đang ở giai đoạn cuối polish, cần dứt điểm

---

## Deliverable

1. Fix bug 1 (scroll)
2. Fix bug 2 (icon UI/UX Designer + ensure 5 icon kia OK)
3. Add apps mới (architecture + filmmaking + ngành khác nếu user duyệt scope)
4. Apps grid pagination với "Xem thêm" button
5. Test:
   - Click "Xem kết quả tính ↓" → smooth scroll xuống recs
   - 6 profession icons hiển thị đúng
   - Category tabs vẫn work với apps mới
   - "Xem thêm" expand/collapse
   - Search ignore pagination
   - Cả 2 theme + responsive
6. Báo cáo: làm gì, lý do, cần feedback gì

**Quan trọng:** Hỏi user trước khi commit scope thêm apps. Issue 3 có thể chia làm 2 phase:
- Phase 1: Architecture + Filmmaking (15 app) — đã yêu cầu rõ
- Phase 2: 3D/Game + Music + Photography + Education (15+ app) — optional, đợi user quyết
