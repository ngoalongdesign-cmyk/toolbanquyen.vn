# Header & Text Layout Redesign Brief — toolbanquyen.vn

## Mục tiêu
Redesign phần header (navigation bar) và cụm text trong các section để trông clean, premium, tách biệt khỏi reference site 9Router. Giữ nguyên chức năng — chỉ thay đổi visual layout và typography hierarchy.

---

## Stack hiện tại
- Pure HTML/CSS/JS, không framework
- Dark mode mặc định, có light toggle
- Accent color: `#22c55e` (green)
- Font: Inter (Google Fonts), đang dùng weight 400–800
- Header height: 58px, sticky, backdrop blur

---

## 1. Header — Vấn đề hiện tại

```
[💎 Tính giá Tool BQ]    [Tất cả app] [Gợi ý tool] [Combo Stack]    [1 USD ≈ 25,450đ] [USD|VND] [☀️]
```

**Vấn đề:**
- Logo text ("Tính giá Tool BQ") đang dùng plain text + emoji, chưa có file ảnh
- Nav links thiếu visual weight, chìm trong header
- Tỉ giá badge chiếm chỗ không cần thiết trên mobile
- Header trông generic, chưa có identity riêng

**Yêu cầu redesign:**
- Thay emoji 💎 bằng `<img src="logo-dark.svg">` với height 32px — file SVG đã có sẵn
- Logo text bỏ đi (đã có trong SVG), chỉ dùng SVG
- Nav links: thêm subtle hover underline hoặc dot indicator thay vì background fill
- Rate badge: gộp vào phần right hoặc thu nhỏ lại
- Header right: sắp xếp gọn hơn — [rate] [USD|VND] [theme toggle]

**Gợi ý layout mới:**
```
[logo-dark.svg 32px]         [Tất cả app · Gợi ý · Combo]         [USD|VND] [☀️]
```
Rate badge có thể bỏ khỏi header, đặt vào một chip nhỏ gần search bar thay thế.

---

## 2. Section Headers — Vấn đề hiện tại

Tất cả 4 section đang dùng cùng 1 pattern:
```
[BADGE TEXT]          ← uppercase pill/chip
Section Title
Span màu xanh
Description text nhỏ
```

**Vấn đề:**
- Đồng nhất quá — 4 section trông giống hệt nhau, không có visual rhythm
- Badge pill trông generic
- Typography hierarchy chưa rõ: title và span màu xanh cùng size

**Yêu cầu:**
- Mỗi section cần 1 visual differentiator nhỏ (không cần đổi layout hoàn toàn)
- Title size: section đầu (hero app) to nhất → section sau nhỏ dần nhẹ
- Xem xét dùng left-aligned header thay center-aligned cho 1-2 section
- Badge có thể bỏ hoàn toàn cho section không quan trọng, hoặc đổi thành đường kẻ trái (left border accent)

**Ví dụ thay thế badge:**
```css
/* Thay pill badge bằng left border accent */
.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.section-label::before {
  content: '';
  width: 20px;
  height: 2px;
  background: var(--accent);
}
```

---

## 3. Filter Tabs (App Section) — Vấn đề hiện tại

```
[Tất cả] [Design] [AI] [Productivity] [Development] [Marketing] [Video]    [Cá nhân | Team | Doanh nghiệp]
```

**Vấn đề:**
- 7 filter tabs + 3 plan tabs cùng 1 row → chật và khó đọc trên tablet
- Active state tab dùng full green background → quá nặng

**Yêu cầu:**
- Cân nhắc tách filter tabs và plan tabs thành 2 row riêng
- Active tab: chỉ dùng underline hoặc text color change thay vì full fill
- Hoặc giữ nguyên layout nhưng giảm size font tabs xuống 11px

---

## 4. Skill Chips — Vấn đề hiện tại

```
[Thiết kế đồ họa] [Edit video] [Lập trình / Code] [Marketing & SEO] [Viết content] [Quản lý team]
[AI & Automation] [Web / No-code]
```

**Yêu cầu:**
- Layout hiện tại: flex-wrap centered → cân nhắc left-aligned hoặc grid 4 columns
- Active state: border xanh + bg xanh nhạt đang ổn, giữ nguyên
- Chip size: padding 8px 16px, border-radius 8px — ổn rồi

---

## File references

| File | Mô tả |
|------|-------|
| `index.html` | HTML structure |
| `css/style.css` | Toàn bộ CSS |
| `js/app.js` | Logic render |
| `logo-dark.svg` | Logo cho dark mode (650×220 viewBox) |
| `logo-light.svg` | Logo cho light mode |

## Colors (CSS variables)
```css
--accent: #22c55e
--bg: #080f0a (dark) / #f0faf2 (light)
--card: #0f1a12 (dark)
--border: #1c2e1f (dark)
--text: #e8f5ea (dark) / #0d1a10 (light)
--text-2: #6b9e70
--header-bg: rgba(8,15,10,0.88) với backdrop-filter blur
```

---

*Brief by: toolbanquyen.vn — tháng 5/2026*
