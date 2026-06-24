import React, { createContext, useContext, useMemo, useState } from 'react';
import { CONSTANTS } from './data/banks';
import type { SourceKey } from './data/sources';

export type FD = {
  id: string;
  bank: string;
  bankId: string;
  amount: number;
  rate: number;
  bookedAt: string;
  tenureMonths: number;
  label?: string;
};

type Ctx = {
  cash: number;
  // % of cash going into the "top-safety" portion (rest goes to ladder)
  safeSplitPct: number;
  setSafeSplitPct: (v: number) => void;

  selectedBankId: string | null;
  setSelectedBankId: (id: string | null) => void;

  fds: FD[];
  addFD: (fd: Omit<FD, 'id' | 'bookedAt'>) => void;

  // Source modal
  activeSource: SourceKey | null;
  openSource: (k: SourceKey) => void;
  closeSource: () => void;

  // One-time banner dismiss
  bannerDismissed: boolean;
  dismissBanner: () => void;
};

const StableMoneyContext = createContext<Ctx | null>(null);

export const StableMoneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [safeSplitPct, setSafeSplitPct] = useState(70);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [fds, setFds] = useState<FD[]>([
    {
      id: 'seed-unity',
      bank: 'Unity SFB',
      bankId: 'unity',
      amount: CONSTANTS.userExistingFD.amount,
      rate: CONSTANTS.userExistingFD.rate,
      bookedAt: '2026-03-18',
      tenureMonths: 12,
      label: 'Your first',
    },
  ]);
  const [activeSource, setActiveSource] = useState<SourceKey | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const value = useMemo<Ctx>(
    () => ({
      cash: CONSTANTS.userIdleSavings,
      safeSplitPct,
      setSafeSplitPct,
      selectedBankId,
      setSelectedBankId,
      fds,
      addFD: (fd) =>
        setFds((prev) => [
          ...prev,
          { ...fd, id: `fd-${Date.now()}`, bookedAt: new Date().toISOString().slice(0, 10) },
        ]),
      activeSource,
      openSource: setActiveSource,
      closeSource: () => setActiveSource(null),
      bannerDismissed,
      dismissBanner: () => setBannerDismissed(true),
    }),
    [safeSplitPct, selectedBankId, fds, activeSource, bannerDismissed],
  );

  return <StableMoneyContext.Provider value={value}>{children}</StableMoneyContext.Provider>;
};

export const useStableMoney = () => {
  const ctx = useContext(StableMoneyContext);
  if (!ctx) throw new Error('useStableMoney must be used inside StableMoneyProvider');
  return ctx;
};

// Helpers
export const fmtINR = (n: number) =>
  '₹' + Math.round(n).toLocaleString('en-IN');

export const fmtINRDecimal = (n: number) =>
  '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
