# Handoff v2 — Hero Bento + Receipt aesthetic

## Trước khi bắt đầu

Bạn là Claude tiếp theo. Hero của tool này đã qua nhiều iteration: floating cards (failed), simplify (functional nhưng generic). Bây giờ user đã chọn hướng mới: **Bento layout + Receipt/Financial aesthetic**. Direction này khác hẳn — không floating cards, không decoration, **data CHÍNH LÀ visual**.

Bạn có không gian sáng tạo trong khuôn khổ này. Tin instinct của bạn về typography và spacing.

---

## Direction: "Receipt Bento"

Cảm giác: **Wise/Mercury** (fintech) gặp **Apple/Notion** (bento). Tool tính giá → hero phải **trông như sản phẩm tài chính đáng tin**, không phải landing SaaS thông thường.

Mặt cảm xúc: user mở trang → 3 giây hiểu ngay "à, tool này cho mình thấy giá thật, có data thật, không phải BS marketing".

---

## Layout đề xuất (desktop ≥1080)

```
┌────────────────────────────────┬─────────────────────────┐
│                                │ TOP APP · LIVE   USD ⊙VND│
│  [pill "Cập nhật 5/2026"]      │ ────────────────────────│
│                                │  Ps  Photoshop  $22.99   601.378đ  +0.2% │
│  TITLE (huge, editorial)       │  ◐  ChatGPT     $20.00   523.160đ  +0.1% │
│                                │  ◆  Figma       $15.00   392.370đ   —    │
│  Subtitle (1 dòng)             │  ▣  Cursor      $20.00   523.160đ  +0.1% │
│                                │  *  Claude      $20.00   523.160đ   —    │
│  [salary input + Tính ngay]    │  +24 app khác →                 1 USD = 26.158đ│
│                                ├─────────────────────────┤
│  trust footnote (1 dòng nhỏ)   │ TOÀN BỘ 29 APP        → │
│                                │ [logo grid 10-12 app]   │
└────────────────────────────────┴─────────────────────────┘
                  ~55%                      ~45%
```

3 bento cells: left (title + CTA), right-top (live price table), right-bottom (app logo grid).

Bạn có thể tinh chỉnh tỷ lệ, di chuyển trust signal, hoặc dùng layout 2x2 thay 1L+2R nếu thấy hợp hơn.

---

## Chi tiết từng cell

### Cell trái (title + CTA)
- Pill nhỏ trên cùng: "● Cập nhật giá tháng 5/2026" (xanh accent)
- Title: chọn 1 trong 2:
  - "Bao nhiêu là **vừa đủ**?" (minimal, philosophical, ngắn — recommended)
  - "Bạn đang chi bao nhiêu cho **phần mềm**?" (concrete, hiện tại)
- Subtitle 1 dòng: "Tick app đang dùng — hệ thống tính ngay **tổng chi phí** và **% lương** bị ăn mỗi tháng."
- Salary input + currency select + "Tính ngay →" button (giữ IDs `salary-hero`, `salary-cur-hero`)
- Trust footnote nhỏ dưới cùng: "Miễn phí · Không quảng cáo · Tỉ giá live · Không cần đăng ký"

### Cell phải-trên (live price table) — TRÁI TIM CỦA HƯỚNG NÀY

Quan trọng nhất. Đây là "sản phẩm tự demo".

- Header: "TOP APP · GIÁ LIVE" (uppercase, letter-spacing rộng) + toggle USD/VND nhỏ ở góc phải
- Hàng pulse "● LIVE" trên header để báo data fresh
- Table 5-6 hàng, mỗi hàng:
  - Icon app nhỏ (24-28px, có sẵn trong `icons/`)
  - Tên app
  - Giá USD (font tabular nums, right-aligned)
  - Giá VND quy đổi (font tabular nums, đậm hơn, right-aligned)
  - Tiny indicator `+0.2%` / `—` / `+0.1%` (đa số là `—` vì giá không đổi thường xuyên, vài cái có % để cảm giác live)
- Apps đề xuất: lọc từ APPS array `popular: true` — Adobe Photoshop, ChatGPT, Figma, Cursor, Claude, Midjourney
- Footer hàng: "+24 app khác →" (link scroll xuống apps section) + "1 USD = 26.158đ" (dùng `id="rate-display"` đã có)

**Critical type details:**
- `font-variant-numeric: tabular-nums` cho mọi giá
- Right-align số
- Subtle divider 1px giữa các hàng (`var(--border-2)`)
- Padding row đủ rộng để dễ đọc (12-14px vertical)

### Cell phải-dưới (app logo grid)

- Header: "TOÀN BỘ 29 APP" + arrow → (link `#apps`)
- Grid 5x2 hoặc 4x3 = 10-12 logo phổ biến nhất
- Mỗi logo: 50-60px square, background trắng, rounded 12px, padding nhẹ
- Hover → scale 1.05 + show tooltip "Tên app · $X/th"
- Click → scroll xuống section apps

Logo gợi ý lấy từ `icons/`: figma-color, adobe-photoshop-2, chatgpt-6, claude-logo, cursor, notion, canva, capcut-3, framer-2, midjourney, claude-logo, davinci-resolve-12...

---

## File & technical

- File: `C:\Users\MaRa\toolbanquyen.vn\index.html`
- Section: chỉ `<section class="hero">`
- Header, các section khác (`#apps`, `#recs`, `#professions`, `#skills`), JS logic, data — **không đụng**
- CSS vars có sẵn ở `:root` + `[data-theme="light"]`. Accent: `#22c55e`.

**Giữ IDs (JS bind):**
- `salary-hero`, `salary-cur-hero` — salary input + currency select
- `search-input` — search field (có thể di chuyển khỏi hero, nhưng phải còn tồn tại đâu đó hoặc trong cell)
- `rate-display` — tỉ giá display

**Đã tồn tại trong APPS array** (dùng được làm data nguồn):
- `app.id`, `app.name`, `app.logo`, `app.color`, `app.popular`, `app.tiers[].price`, `app.tiers[].priceVND`
- Có thể viết JS render bảng live prices từ data này, không hardcode

---

## Hard constraints

1. **KHÔNG** `backdrop-filter`, `filter: blur/drop-shadow/saturate` trên animated elements
2. **Responsive**: ≥1080 desktop bento, <1080 stack 1 column (title trên, table giữa, logo grid dưới)
3. **Cả 2 theme** phải đẹp (dark là chính, light cũng cân — receipt feel hợp light theme đặc biệt tốt)
4. **Không thêm CDN** mới
5. **File integrity**: cuối file phải còn `normalizeTiers(); bindIntent(); fetchRate(); renderAll(); </script></body></html>`

---

## Inspiration

- **Wise** (wise.com): big numbers monospace, currency codes prominent, sparse design, functional elegance
- **Mercury** (mercury.com): black bg + sharp green accents, big stats, editorial type
- **Stripe Atlas** (stripe.com/atlas): receipt-like tables, clean dividers
- **Notion landing hero**: bento mix of cells with different roles
- **Vercel**: bold typography first

**Đừng** dùng:
- Floating cards
- 3D perspective
- Dotted curves SVG
- Green glow borders
- Gradient mesh background
- Ghost/blurred cards

---

## Polish details (nếu có thời gian)

- Live table: khi load, prices đếm up từ 0 đến giá thật (1.2s) — chỉ lần đầu, không loop
- Logo grid: subtle staggered fade-in entrance (50ms each)
- "● LIVE" dot pulse animation 2s infinite (chỉ dot, không phải cả hero)
- USD/VND toggle trong table: switch instant, smooth transition

---

## Memory về user

- User Vietnamese, designer (không phải coder), tư duy hệ thống mạnh
- Luôn đúng về file/deploy — conflict thì kiểm tra bản thân trước
- Đã từ chối: floating cards, ghost cards, curves, glow borders
- Đã thích: clean, có character, không generic
- Reply tiếng Việt, không over-format chat

---

## Deliverable

1. Edit `index.html` hero section only
2. Test dark + light + responsive (1920/1440/1280/1080/768/375)
3. Verify file integrity
4. Báo cáo ngắn: làm gì, lý do design choice, có gì cần feedback

**Direction này thuộc về bạn. Make it sing.**
