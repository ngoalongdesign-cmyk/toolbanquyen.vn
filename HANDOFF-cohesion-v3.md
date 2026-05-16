# Handoff v3 — Polish UX cohesion + bỏ redundancy

## Trước khi bạn bắt đầu

Tôi là Claude đã build và iterate project này nhiều rounds. Phiên bản hero hiện tại (bento + receipt aesthetic) của bạn trước đây đã được user accept và ship-ready — **đừng đụng vào**. Bây giờ vấn đề ở **các section dưới hero**: thừa redundant patterns, visual lệch tông, multiple entry points làm cùng 1 việc.

User là designer Việt, tư duy hệ thống mạnh. Anh ấy đã review và đồng ý với 5 issue dưới đây. Bạn fix chúng theo cách bạn thấy tốt nhất.

---

## Context (current state)

**File:** `C:\Users\MaRa\toolbanquyen.vn\index.html` — single file (CSS + HTML + JS inline)

**Hero hiện tại** (bento receipt — đừng đụng):
- 3-cell bento: Title/CTA trái + Live price table phải-trên + Logo grid 12 app phải-dưới
- Salary input + "Tính ngay →" trong cell title
- Live price table pull từ APPS data, dùng priceVND khi có
- Logo grid 12 app, click → openModal đúng app

**Tool đã làm xong** (functional):
- 29 app trong APPS array, mỗi app có N tiers (1-8 gói)
- Recommendation engine: detect overlap apps + suggest downgrade + salary % warning
- Salary calculator: 5 warning levels (0% / <5% / 5-10% / 10-20% / >20%)
- Modal app với horizontal scroll N tiers
- Cart sticky bar với "Xem kết quả tính ↓" scroll to #recs

---

## 5 issue user đồng ý cần fix

### 1. ⚠️ BỎ `intent textarea` thừa
**File location:** trong `<section class="sec" id="skills">`, là `<div class="intent-box">...</div>` chứa textarea "Mô tả nhu cầu bằng lời tự do — AI gợi ý tool phù hợp"

**Lý do:** Trùng năng với hero logo grid + chips skills. User mới có 3 entry points làm cùng 1 việc "tôi cần app gì" — confused.

**Action:** Xoá toàn bộ `.intent-box` HTML. Cũng xoá:
- `INTENT_MAP` array (lớn, ~45 entries)
- Functions: `matchIntent()`, `renderIntentPreview()`, `bindIntent()`
- Call `bindIntent()` ở INIT block
- Call `renderIntentPreview()` trong `renderAll()`
- CSS `.intent-*` rules

### 2. ⚠️ GỘP `skill chips` vào `professions`
**Current:** 8 skill chips (Thiết kế đồ họa, Edit video, Lập trình, ...) + 6 profession cards (UI/UX Designer, Developer, Content Creator, ...) — overlap logic. Cả 2 đều "preset stack apps".

**Action:** Bỏ section skills chips. Giữ section professions với 6 cards Lottie. Profession đã đủ rộng — bao trùm skill chips.

**Cụ thể:**
- Xoá HTML `.chips-grid` + section heading "Gợi ý theo kỹ năng"
- Xoá `SKILLS` array
- Xoá functions: `renderChips()` + handler
- Xoá CSS `.chip*`, `.chips-grid`

**Giữ:** `S.selectedSkills = []` trong state nếu có code khác reference.

### 3. ⚠️ 1 SALARY INPUT DUY NHẤT
**Current:** 2 salary inputs:
- Hero: `#salary-hero` + `#salary-cur-hero` + "Tính ngay" button
- Skills section: `#salary-input` + `#salary-cur` + result display `#salary-result`

Cả 2 sync ngầm qua JS, nhưng visually duplicate.

**Action:** Bỏ phần INPUT của skills section. Chỉ giữ phần **result display** (`#salary-result` div). Khi user vào page → typed salary ở hero → scroll xuống thấy result computed.

**Cụ thể:**
- Xoá `<div class="salary-form">` chứa input + select trong skills section
- Giữ `<div id="salary-result"></div>` để hiển thị kết quả
- Update `renderSalary()` function: đọc salary từ `#salary-hero` thay vì `#salary-input`
- Update event listeners: input change ở `#salary-hero` → call `renderSalary()`
- Section heading update: thay "Bỏ bao nhiêu % lương cho công cụ?" → có thể giữ heading nhưng bỏ "Nhập lương" description (vì không còn input ở đây)

**Lưu ý quan trọng:** Các function khác như `cartTotal()`, `getRecommendations()`, `renderCartBar()` đang đọc salary từ `#salary-input`. Bạn refactor:
- Tạo helper `getSalary()` returns `{value, currency}` từ `#salary-hero`
- Mọi nơi đọc salary đều gọi `getSalary()`

### 4. ✨ Visual cohesion: app grid section giống bento
**Current:** App grid section (`#apps`) dùng card style cũ — borders, padding khác bento. Lệch tông.

**Action:** Tinh chỉnh app card style để gần bento hơn:
- Border-radius card: 20px (match bento cell)
- Padding rộng hơn: 24px instead of current
- Subtle shadow giống bento cell
- Hover state: nhẹ scale + border accent — giống logo-cell hover

Đừng đổi structure card, chỉ visual tokens (radius, padding, shadow, hover).

### 5. ✨ Profession Lottie → cân nhắc thay
**Current:** 6 profession cards có Lottie animation (4-5 sec loop) — đẹp nhưng performance heavy (210KB lottie-data.js) + lệch tông với bento.

**Option A (recommend):** Thay Lottie bằng SVG icon static + subtle hover animation. Match bento aesthetic.

**Option B:** Giữ Lottie nhưng cleanup — chỉ play on hover (IntersectionObserver pause when off-screen), reduce visual noise.

**Bạn pick option nào tùy. Document tại sao chọn.**

---

## Hard constraints

1. **KHÔNG đụng hero bento** — đã ship-ready
2. **KHÔNG đổi APPS data, PROFESSIONS data, recommendation engine logic**
3. **KHÔNG đổi modal logic, cart logic**
4. **Giữ IDs JS bind:** `salary-hero`, `salary-cur-hero`, `search-input`, `rate-display`, `salary-result`, `cart-bar`, `cart-count-badge`, `cart-price-total`, `cart-pct-badge`, `btn-cart-clear`, `btn-cart-detail`, `cur-toggle`, `theme-toggle`
5. **Performance**: không thêm filter blur/drop-shadow trên animated elements
6. **Cả 2 theme phải đẹp** (dark + light)
7. **Responsive**: ≥1080 desktop, <1080 mobile fallback
8. **File integrity**: cuối file phải còn `normalizeTiers(); bindIntent(); fetchRate(); renderAll(); </script></body></html>` — Note: nếu bạn xoá `bindIntent()` thì cũng xoá ở INIT line. Cuối file vẫn phải có `</script></body></html>`

---

## Don't touch

- `<section class="hero">` (bento — đã ship)
- `<section class="sec" id="apps">` body — chỉ tinh chỉnh card visual tokens (Issue 4)
- `<section class="sec" id="recs">` — recommendation panel, hoàn chỉnh
- Modal `#modal-overlay` và logic
- `#cart-bar` HTML và JS
- Header
- Footer

---

## Inspiration / direction

- **Linear pricing page** — clean, focused, 1 entry point
- **Stripe Atlas dashboard** — consistent radius/padding xuyên page
- **Vercel hobby page** — minimal patterns, không sướng trang
- **Apple Mac landing** — 1 design language, không lúc bento, lúc cards, lúc Lottie

Goal: user scroll từ trên xuống dưới phải có cảm giác **1 sản phẩm liền mạch**, không phải 3 sản phẩm dán lại.

---

## Memory về user

- Designer Việt, tư duy hệ thống mạnh, không phải coder
- Luôn đúng về file/deploy — conflict thì kiểm tra bản thân trước
- Không thích over-format chat
- Đã review nhiều iteration, kiên nhẫn nhưng yêu cầu accuracy + visual quality
- Đang ở session dài, mong polish chứ không cần thêm feature mới

---

## Deliverable

1. Edit `index.html` apply 5 issues trên
2. Test:
   - Salary nhập ở hero → result hiện đúng ở section dưới
   - Profession cards click → add apps vào cart (giữ logic cũ)
   - Cart "Xem kết quả tính ↓" scroll xuống recs (đã fix)
   - Dark + light theme cả 2 cân
   - Responsive 1920/1280/1080/768
   - Console không có lỗi `Cannot read properties of null` (vì bỏ inputs cũ)
3. Verify file integrity
4. Báo cáo ngắn: làm gì, lý do, cần feedback gì

**Bỏ bớt thôi. Less is more. Tin instinct của bạn.**
