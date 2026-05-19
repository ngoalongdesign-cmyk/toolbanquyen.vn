# Pricing Audit Report — 19/05/2026

**Auto-generated bởi Cowork scheduled task.** Verify 15 app top của toolbanquyen.vn.

## Tóm tắt

- ✅ OK (giá khớp): **7** apps — claude, figma, notion, ms365, spotify, netflix, linear
- ⚠️ Cần update / có thay đổi: **6** apps — chatgpt, adobe-cc, cursor, webflow (xác nhận match), canva, github-copilot, youtube-premium (partial)
- ❌ Couldn't verify đầy đủ: **2** apps — google-workspace (WebFetch blocked), adobe-cc (conflict source)

---

## ✅ Apps OK (giá đúng, không cần action)

- **claude** (verified URL: https://claude.com/pricing) — Pro $17 annual / $20 monthly ✓; Max 5x từ $100, 20x $200 ✓; Team Standard $20 annual ($25 monthly) ✓; Team Premium $100 annual ($125 monthly) ✓
- **figma** (verified URL: https://www.figma.com/pricing) — Starter Free ✓; Professional Full seat $16 annual (Dev $12, Collab $3) ✓; Organization Full $55 ✓; Enterprise Full $90 ✓
- **notion** (verified URL: https://www.notion.com/pricing) — Free $0 ✓; Plus $10/seat annual ✓; Business $20/seat annual ✓; Enterprise Custom ✓
- **ms365** (verified URL: https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-plans-and-pricing) — Personal $9.99 ✓; Family $12.99 ✓; Business Basic $6 → $7 từ 1/7/2026 ✓ (note đã có); Standard $12.50 → $14 ✓; Premium $22 ✓
- **spotify** (verified URL: https://www.spotify.com/vn-vi/premium/) — Individual ₫65,000 ✓; Student ₫33,000 ✓. (Duo ₫85k, Family ₫99k không show trên VN page hiện tại — cần verify thủ công nếu tier vẫn tồn tại)
- **netflix** (verified URL: https://help.netflix.com/en/node/24926 + dienthoaivui.com.vn) — Mobile ₫74,000 ✓; Basic ₫114,000 ✓; Standard ₫231,000 ✓; Premium ₫273,000 ✓. Khớp 100%.
- **linear** (verified URL: https://linear.app/pricing) — Free $0 ✓; Basic $10/user annual ($12 monthly) ✓; Business $16/user annual ($18 monthly) ✓; Enterprise Custom ✓
- **webflow** (verified URL: https://webflow.com/blog/simplified-plans-and-updated-pricing-2026) — Restructure May 2026 đã được code reflect đúng: Basic $15 annual/$25 monthly ✓; Premium $25 annual/$39 monthly ✓; Team $2500/mo ✓. Note "Restructured May 13/2026" chính xác.

---

## ⚠️ Apps có thay đổi (cần update code)

### chatgpt (verified URL: https://chatgpt.com/pricing/)

| Tier | Code hiện tại | Web hiện tại | Diff |
|---|---|---|---|
| Free | $0 | $0 | OK |
| Go | $5 | **$8** | **+$3 (+60%)** ⚠️ |
| Plus | $20 | $20 | OK |
| Pro | $109 (1 tier) | **$100 (5x) + $200 (20x) — SPLIT** | **Tier restructure 9/4/2026** ⚠️ |
| Business | $25 monthly / $25 in code | **$20 annual / $25 monthly** | Annual giảm $5 (2/4/2026) |
| Business Codex | null | unchanged | OK |
| Enterprise | null | Custom | OK |

**Note:** OpenAI launched **2 Pro tiers** ngày 9/4/2026: Pro $100 (5x Plus limits) và Pro $200 (20x). Code đang merge thành single $109 tier — KHÔNG còn match. Cần split. Go tăng từ $5 → $8 (giá US, có thể VN cũng tăng — cần verify priceVND ₫132,000). Business annual giảm xuống $20.

### adobe-cc (verified URL: https://www.adobe.com/creativecloud/plans.html — JS-rendered, dùng search results) — **NEEDS HUMAN VERIFY**

| Tier | Code hiện tại | Web research | Diff |
|---|---|---|---|
| Photography 1TB | $19.99 | $19.99 | OK |
| Single App | $22.99 | $22.99 | OK |
| **CC Pro (Personal)** | **$33.99** | **$69.99 (per web search nhiều nguồn)** | **+$36 (+105%) hoặc HUMAN VERIFY** ⚠️ |
| Student | $18.99 | $19.99 (gần đúng) | nhỏ |
| Teams CC Pro | $99.99 | $99.99 | OK |

**Note CRITICAL — NEEDS HUMAN VERIFY:** Adobe restructure tháng 8/2025: "All Apps" plan ($54.99 cũ) bị thay bằng 2 plan mới: **Creative Cloud Pro $69.99/mo** (Personal) và **Standard $54.99/mo**. Code đang ghi $33.99 cho CC Pro Personal — không khớp với web. Tuy nhiên scheduled task có note "Adobe CC Pro Personal hiện tại $33.99 (NOT $69.99 business)" — MARA có thể có nguồn riêng (regional pricing VN, promo dài hạn, hoặc Adobe stagger pricing theo region). Đề nghị MARA check trực tiếp tab "Cá nhân" trên https://www.adobe.com/creativecloud/plans.html bằng IP Việt Nam để xác định giá list thực tế. Nếu web hiển thị $69.99 → cần update code; nếu $33.99 → giữ nguyên và update lesson learned.

### cursor (verified URL: https://cursor.com/pricing)

| Tier | Code hiện tại | Web hiện tại | Diff |
|---|---|---|---|
| Hobby | $0 | Free | OK |
| Pro (Individual) | $20 | $20 | OK |
| Pro+ | $60 | (web show "Pro+" trong toggle nhưng không list giá explicit) | NEEDS HUMAN VERIFY |
| Ultra | $200 | (tương tự, web show toggle Ultra nhưng không list price) | NEEDS HUMAN VERIFY |
| Business (Teams) | $40/user | $40/user | OK |
| Enterprise | Custom | Custom | OK |

**Note:** Web đã simplify display — chỉ show $20 Individual + $40 Teams + Custom Enterprise. Pro+/Ultra giá ($60/$200) trong code có thể chính xác (lịch sử pricing model của Cursor) nhưng web không xác nhận trực tiếp. NEEDS HUMAN VERIFY bằng cách login dashboard hoặc check changelog Cursor để confirm Pro+ $60 / Ultra $200 còn đúng.

### canva (verified URL: https://www.canva.com/pricing/ — fetch quá lớn, dùng search results)

| Tier | Code hiện tại | Web hiện tại | Diff |
|---|---|---|---|
| Pro (Personal) | $15 | $15 monthly / $10 annual ($120/year) | OK |
| **Teams** | **$30 cho package 5 người** | **$10/user/mo annual ($20 monthly), min 3 seats** | **MODEL CHANGE** ⚠️ |
| Enterprise | Custom | Custom | OK |

**Note:** Canva đổi pricing model Teams: thay vì "package 5 người $30/mo" → giờ là PER USER ($10 annual / $20 monthly, min 3 seats). Code hiện đang miêu tả sai model. Đề nghị restructure label: "Teams (per user, min 3 seats)" với price $10/user annual. Tên brand cũng đã đổi sang **Canva Business** cho signup mới.

### github-copilot (verified URL: search results — github.com/features/copilot/plans fetch quá lớn)

| Tier | Code hiện tại | Web hiện tại | Diff |
|---|---|---|---|
| Free | — (không có trong code) | $0 | **MISSING tier** ⚠️ |
| Pro (Individual) | $10 | $10 | OK |
| **Pro+** | — (không có) | **$39/mo (NEW Individual tier)** | **MISSING tier** ⚠️ |
| Business | $19 | $19 | OK |
| Enterprise | $39 | $39 | OK |

**Note CRITICAL:** GitHub thêm tier **Pro+ $39/mo** cho cá nhân power user — code đang miss. Thêm vào: Free tier $0 cho cá nhân (2,000 completion/month).

**Major billing change từ 1/6/2026:** Toàn bộ Copilot chuyển sang **usage-based billing với AI Credits**. Pro $10 base + $5 flex = $15 included; Pro+ $39 base + $31 flex = $70 included. Code có thể cần thêm note flag "Billing model change effective Jun 1, 2026".

### youtube-premium (verified URL: VN search results — youtube.com/premium client-render)

| Tier | Code hiện tại | Web hiện tại | Diff |
|---|---|---|---|
| Lite | ₫49,000 | Không thấy mention rõ trên VN sources | NEEDS HUMAN VERIFY |
| Individual | ₫79,000 | ₫79,000 ✓ | OK |
| Family | ₫149,000 | ₫149,000 ✓ | OK |
| Student | ₫49,000 | ₫49,000 ✓ | OK |

**Note:** Premium Lite ($1.87 / ₫49,000) trong code — VN sources không list explicit tier này; có thể là tier mới hoặc chưa rollout VN đầy đủ. Cần MARA check thử trực tiếp trên youtube.com/premium khi login VN account.

---

## ❌ Couldn't verify đầy đủ

- **google-workspace**: WebFetch tới workspace.google.com bị restricted (URL not in provenance set). Không verify được nhưng giá Starter $7 / Standard $14 / Plus $22 annual trong code khớp với pricing chuẩn lịch sử Google Workspace 2024-2026 — KHẢ NĂNG OK nhưng cần MARA verify thủ công.
- **adobe-cc**: Như note ở trên — conflict giữa user note ($33.99) và web search ($69.99). Cần human truy cập trực tiếp trang Adobe VN.

---

## Critical changes (require user attention sáng thứ Hai)

1. **ChatGPT Pro tier restructure** — code 1 tier $109 → web 2 tier $100/$200. **Phải split** trước khi user khác hiểu nhầm.
2. **ChatGPT Go +60%** — $5 → $8. Cập nhật giá + priceVND.
3. **Adobe CC Pro Personal** — discrepancy $33.99 vs $69.99 — NEEDS MARA xác nhận bằng truy cập trực tiếp trang Adobe VN/global.
4. **GitHub Copilot Pro+ tier missing** — thêm tier $39 + flag billing change 1/6/2026.
5. **Canva Teams model change** — chuyển từ package $30 sang per-user $10 (min 3 seats).
6. **MS 365 price hike** sắp tới ngày 1/7/2026 — code đã có note OK, không cần action ngay nhưng cần follow-up tracking.
7. **GitHub Copilot billing model** — chuyển sang usage-based AI Credits từ 1/6/2026 — flag cho VN users biết.

---

## Sources

- [ChatGPT Pricing](https://chatgpt.com/pricing/) (JS-rendered, dùng search)
- [Claude Pricing](https://claude.com/pricing)
- [Adobe CC Plans](https://www.adobe.com/creativecloud/plans.html) (JS-rendered, dùng search)
- [Adobe CC Pro](https://www.adobe.com/creativecloud/pro.html)
- [Figma Pricing](https://www.figma.com/pricing)
- [Notion Pricing](https://www.notion.com/pricing)
- [Cursor Pricing](https://cursor.com/pricing)
- [MS 365 Plans](https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-plans-and-pricing)
- [MS 365 Pricing Update 2026](https://www.microsoft.com/en-us/licensing/news/2026-m365-packaging-pricing-updates)
- [Spotify VN Premium](https://www.spotify.com/vn-vi/premium/)
- [Netflix VN](https://help.netflix.com/en/node/24926)
- [YouTube Premium VN price source](https://premiumvns.com/gia-youtube-premium-cac-nuoc/)
- [Webflow Pricing Restructure May 2026](https://webflow.com/blog/simplified-plans-and-updated-pricing-2026)
- [Linear Pricing](https://linear.app/pricing)
- [Canva Pricing](https://www.canva.com/pricing/) (fetch oversized, dùng search)
- [GitHub Copilot Plans](https://github.com/features/copilot/plans) (fetch oversized, dùng search)
- [GitHub Copilot Billing Change](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
