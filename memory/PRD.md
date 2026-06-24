# Stable Money — Interactive FD Prototype (PRD)

## Goal
A polished, demo-ready prototype of an Indian fixed-deposit app focused on increasing 90-day repeat-FD bookings from 20% → 35% among first-time users. Built as a self-contained Expo mobile app with seeded data (no backend).

## Core principle
Every number on screen (rate, rating, tax %, insurance limit) is accompanied by a tappable "source" chip that opens a modal naming the publisher (RBI MPC, DICGC, ICRA, CRISIL, partner FD rate, FD taxation rules, etc.). The user always makes the final choice — no auto-pick.

## Stack
- Expo SDK 54, Expo Router (file-based), React Native, react-native-svg, react-native-reanimated, expo-linear-gradient, expo-haptics, expo-font, @react-native-community/slider.
- Plus Jakarta Sans loaded at runtime via fontsource CDN.
- All state in React Context (`/app/frontend/src/store.tsx`). No backend, no MongoDB writes.

## Brand tokens (`/app/frontend/src/theme.ts`)
- Purple `#5A31F4` / `#4422C8`, lime `#C8F560`, ink `#1A1626`, slate `#6B6577`, bg `#F6F5FB`, fact green `#0F6E56` on `#E6F6EF`, success `#1F9D6B`, warning `#C8841F`.

## Screens
| Route | Purpose |
|---|---|
| `/(tabs)/index.tsx` | Home — purple header, idle-cash hero with bar comparison, source chips, passbook card, tools row, tappable bell with rate alert. |
| `/(tabs)/passbook.tsx` | All FDs with DICGC insured chip per row. |
| `/(tabs)/explore.tsx` | Tool + alert directory. |
| `/(tabs)/profile.tsx` | KYC card + commission disclosure with source chip. |
| `/rate-alert.tsx` | RBI MPC repo-rate event, with "honest version" copy that rates could fall too. |
| `/allocation.tsx` | Donut + slider (40–100% safe). Live ₹ amounts. FD-laddering source chip. |
| `/compare.tsx` | Bank list with 3 sort tabs (rate / safety / after-tax). Current bank (Unity) shown dashed/greyed. Commission disclosure card. |
| `/confirm.tsx` | Receipt-style math breakdown (amount × rate − tax). Trust card with 3 verify links. |
| `/success.tsx` | Animated checkmark, "A decision you made" pill, ladder follow-up card. |
| `/tools/calculator.tsx` | Live after-tax maturity (compounded), amount slider + tenure tabs. |
| `/tools/liquidity.tsx` | "Your principal is never at risk" — 3 facts + misconception buster. |
| `/tools/ladder.tsx` | Bar chart of 4 rungs (3/6/9/12 mo), slider, per-rung list. |

## Seeded data (`/app/frontend/src/data/banks.ts`)
4 SFBs as of June 2026: Suryoday 8.10% (ICRA A), Utkarsh 8.10% (CRISIL A+), Shivalik 7.80% (CRISIL A), Unity 7.25% (ICRA A — user's current bank). Constants: savings 3%, DICGC ₹5L, tax 20%, idle cash ₹1L, existing FD ₹25K in Unity.

## Source registry (`/app/frontend/src/data/sources.ts`)
8 sources: partner_rate, rbi_mpc, fd_laddering, fd_taxation, dicgc, icra_rating, crisil_rating, premature_withdrawal, commission_disclosure. Each renders into the global `<SourceModal/>` mounted at root.

## Reusable components (`/app/frontend/src/`)
- `SourceChip` (3 variants: chip / inline / block) — used everywhere a fact appears.
- `SourceModal` — global modal triggered by context.
- `Donut` (SVG conic), `BankLogo` (initials avatar), `PrimaryButton` (with haptics).
- `StableMoneyProvider` — single context for cash, split %, FDs, selected bank, source modal.

## Test IDs
All interactive elements have stable `testID`s: `cta-put-to-work`, `notif-bell`, `notif-item`, `alloc-slider`, `alloc-cta`, `sort-rate|safety|tax`, `bank-<id>`, `confirm-cta`, `success-home`, `source-modal`, `source-modal-close`, `tool-calculator|ladder|liquidity`, etc.

## Demo flow that drives the 20→35% retention thesis
1. Idle-cash hero shows the *opportunity cost* of cash sitting in savings.
2. Allocation screen frames it as a split with a built-in laddered portion → first repeat is pre-planned at booking time.
3. Confirm screen re-derives the math in front of the user (no hidden numbers) → confidence to repeat.
4. Success screen explicitly tells the user "Future decisions — we'll bring them to you," establishing the next 3-month prompt cycle.
5. Tools (calculator, ladder, liquidity) deepen trust pre- and post-booking.
