# Handoff cho session tiếp theo — toolbanquyen.vn

> Session 2026-05-17 đã kết thúc. Project đang ship-quality 8.5-9/10.
> Paste prompt bên dưới vào session Claude mới để pick up context.

---

## 🚀 PROMPT KHỞI ĐẦU SESSION MỚI

```
Đọc file C:\Users\MaRa\toolbanquyen.vn\HANDOFF-next-session.md
Và đọc memory project_toolbanquyen.md trước.

Sau đó hỏi mình: "Bạn đã deploy bản session trước chưa? Có feedback gì từ test thực tế? 
Hay muốn tiếp tục với P1 nào trong roadmap?" — đợi mình trả lời, đừng tự refactor.
```

---

## Project state hiện tại (kết thúc 2026-05-17)

**toolbanquyen.vn** — Web tool tính chi phí app bản quyền theo % lương. Positioning shifted from "calculator" → **"máy giải thích chi phí"** (advisor).

- **Title:** "Lương bạn nuôi bao nhiêu app?" (em xanh trên "bao nhiêu app")
- **Subtitle:** "Bạn dùng app gì? Lương bao nhiêu? Tool tính ngay nếu mua bản quyền thì chi phí chiếm % thu nhập, có hợp lý không, và có lựa chọn nhẹ hơn không."
- **File:** `C:\Users\MaRa\toolbanquyen.vn\index.html` (~4300 dòng, single file)
- **Deploy:** Cloudflare Pages (`git push` → auto)
- **Stack:** Pure HTML/CSS/JS, no framework, no build

### Tính năng đã ship

- **Hero bento 2-cell** (Cell A title+CTA, Cell B live price table 5 apps)
- **Floating calculator illustration** góc dưới-phải bento, drop-in + float animation, theme-aware PNG swap (dark/light), hidden mobile <768px
- **Apps section** 59 apps, search visible, 8 category tabs, pagination "Xem thêm N app", pills tier inline click=add/swap/remove
- **Onboarding hint** "Click pill gói giá..." auto-hide khi cart có app
- **Suggestions section** từ describe textarea (keyword match + dedupe overlap)
- **Verdict engine** (NEW): per-app severity (5 levels), VAT 10% included, alt chips với preview giá. Click alt → swap với `lightestTierIdx` (Free first)
- **"Đề xuất khác"** section labeled — overlap warnings + downgrade Free
- **Cart bar** sticky + popover list + "Copy link chia sẻ" + toast
- **Search visible** trong tabs-wrap, ⌘K shortcut
- **URL share state** (cart + tiers + salary + currency vào hash)
- **localStorage persist** theme + currency
- **Salary swap convention** USD=chấm (vi-VN locale), VND=phẩy (en-US locale) — user explicit request
- **Open Graph** + Twitter Card tags ready cho social share

### Architecture

```
APPS = [{id, name, cat, color, initials, popular, url, logo, desc, includes?, tiers}]
S = {cart, cartTiers, currency, rate, filter, search, showAll, suggestions, modalApp, modalTier}
// S.useCase optional ('personal'|'freelance'|'team'|'business-vat') — chưa có UI toggle

OVERLAP_GROUPS  — 13 groups cho dedupe + warning
ALTERNATIVES_MAP — 27 paid app → 2-6 free/cheap alts
VERDICT_THRESHOLDS + APP_VERDICT_RULES — 15 custom rules
KEYWORD_DICT — ~200 keywords VN+EN cho job analyzer
VAT_RATE = 0.10

renderAll() → renderApps + renderCartBar + renderCartPopover + renderSalary 
             + renderVerdicts + renderRecommendations + renderSuggestions + updateShareURL
```

---

## 📋 Roadmap còn lại (priority order)

### P1 — Sau khi user test + feedback

1. **Pills tier collapse default** trên card grid → click "Chọn gói" expand.
   - Lý do: 12 cards × 6 pills avg = ~72 buttons visible cùng lúc, visual heavy
   - Refactor ~30 phút trong renderApps template + CSS
   - Trade-off: 1-click add hiện tại đẹp speed-wise nhưng nặng visually

2. **Merge verdict + rec list** thành 1 unified stream insights
   - Hiện 2 hệ song song có label "ĐỀ XUẤT KHÁC" phân biệt
   - User có thể thấy redundant — chờ feedback
   - Refactor ~1 giờ: integrate overlap warning + downgrade vào verdict card hoặc tạo unified getInsights() function

3. **Calculator size + animation tuning** — chờ feedback từ user thật
   - Hiện 260×260 desktop, float -10px 5s
   - Có thể tăng size 320 hoặc giảm 220
   - Animation có thể mạnh hơn (translate -14px + rotate wobble)

4. **Calculator mobile** — hiện hidden <768px
   - Nếu user muốn show: size 100×100 góc Cell A, hoặc top-of-hero illustration full-width

### P2 — Use Case toggle (Phase C)

5. Radio "Cá nhân học / Freelance kiếm tiền / Doanh nghiệp VAT-registered" trong recs section
   - Adjust `VERDICT_THRESHOLDS` per use case (already defined in code)
   - Skip VAT cho `business-vat` (set S.useCase, effectivePriceVND auto handle)
   - ~30 phút work

### P3 — Optional polish

6. **Pill "Cập nhật giá tháng 5/2026"** đã bỏ. Có thể đưa lại vào footer dưới dạng tooltip "Data source + methodology" link
7. **Open-source GitHub** — sau 2-3 tháng public launch + có feedback đủ. MIT code + CC-BY-SA data + brand kept private. Open core model như Plausible/Cal.com.

### P4 — Content marketing

8. **Insight-first FB posts** series (không spam, post là value content + tool link cuối):
   - "Lương 15-25tr designer — app ăn bao nhiêu %?" (data-driven)
   - "Mình bỏ Adobe sang Affinity tiết kiệm Xtr/năm" (personal narrative)
   - "5 free alternative pro tool ít người biết" (utility)
   - "Lương dưới 15tr nên dùng tool nào?" (audience-specific)

---

## ⚠️ CRITICAL warnings (đừng làm)

1. **KHÔNG dùng Python/bash để modify index.html** — gây truncate cuối file. Luôn Edit tool.
2. **Bash mount stale size** — tin Read tool, không tin `stat`/`wc -c`. `mv` work trong icons/, `rm` không.
3. **Git push từ PowerShell** — bash không có quyền `.git/index.lock`.
4. **File integrity check** cuối file phải còn `normalizeTiers(); fetchRate(); renderAll(); </script></body></html>`
5. **KHÔNG thêm CDN dependency mới** — discuss với user trước
6. **KHÔNG tự refactor lớn** mà user chưa duyệt scope

---

## 🎨 Design philosophy đã chốt

User originally muốn "phức tạp giấu sau đơn giản" (Apple/SIUU MAGIC style). Sau thảo luận, **toolbanquyen.vn KHÔNG fit philosophy đó** vì là decision-support catalog (Nhóm B), không phải habit utility (Nhóm A).

**Philosophy đã apply:** Tufte "organized transparency" — show all data clearly với hierarchy chặt, không hide complexity, organize bằng layer.

**Đã làm subtract pass** (remove logo marquee + pill + compress hero-trust + VAT banner→nhỏ). Có thể subtract thêm (pills collapse, merge verdict+rec) nếu user thấy vẫn nặng.

---

## 👤 User profile reminder

- **MARA**, designer Việt tự học AI, tư duy hệ thống mạnh, không phải coder
- LUÔN ĐÚNG về file/deploy — conflict → check bản thân trước, không hỏi lại user
- Đã ship SIUU MAGIC (image AI tool, 4 tháng) — có gu, có tốc độ
- Không thích over-format chat — prose, không bullet tràn lan
- Đã ship nhiều rounds, kiên nhẫn nhưng yêu cầu accuracy + visual quality

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
├── index.html          ~4300 lines, single-file app
├── logo.svg
├── icons/              60+ app logos (figma-color.svg, chatgpt-6.svg, etc.)
│   └── animated icons/ (Lottie JSON unused, kept for archive)
├── images/
│   ├── calculator-dark-toolbanquyen.vn.png
│   └── calculator-light-toolbanquyen.vn.png
├── HANDOFF-next-session.md   ← THIS FILE
└── .git/
```

---

## 🧠 Memory files (đọc trước)

- `project_toolbanquyen.md` — full state, architecture, decisions
- `user_profile.md` — MARA profile
- `feedback_app_positioning.md` — Midjourney=art, Canva=amateur, Adobe=pro
