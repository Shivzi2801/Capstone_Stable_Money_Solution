// Seeded data — June 2026 snapshot. Do NOT fetch live.
export type Bank = {
  id: string;
  name: string;
  shortName: string;
  rate: number; // % per annum, 1Y FD
  rating: string; // e.g. 'ICRA A'
  ratingAgency: 'ICRA' | 'CRISIL';
  ratingPlain: string;
  brandColor: string;
  isCurrent?: boolean; // user already has FD here
};

export const BANKS: Bank[] = [
  {
    id: 'suryoday',
    name: 'Suryoday Small Finance Bank',
    shortName: 'Suryoday SFB',
    rate: 8.10,
    rating: 'ICRA A',
    ratingAgency: 'ICRA',
    ratingPlain: 'Adequate safety, RBI-licensed SFB',
    brandColor: '#E5532F',
  },
  {
    id: 'utkarsh',
    name: 'Utkarsh Small Finance Bank',
    shortName: 'Utkarsh SFB',
    rate: 8.10,
    rating: 'CRISIL A+',
    ratingAgency: 'CRISIL',
    ratingPlain: 'Good safety, a notch above A',
    brandColor: '#1A6FB5',
  },
  {
    id: 'shivalik',
    name: 'Shivalik Small Finance Bank',
    shortName: 'Shivalik SFB',
    rate: 7.80,
    rating: 'CRISIL A',
    ratingAgency: 'CRISIL',
    ratingPlain: 'Adequate safety',
    brandColor: '#0E8C5A',
  },
  {
    id: 'unity',
    name: 'Unity Small Finance Bank',
    shortName: 'Unity SFB',
    rate: 7.25,
    rating: 'ICRA A',
    ratingAgency: 'ICRA',
    ratingPlain: 'Adequate safety',
    brandColor: '#6B6577',
    isCurrent: true,
  },
];

export const CONSTANTS = {
  savingsRate: 3.0,
  dicgcLimit: 500000,
  defaultTaxSlab: 0.20,
  tdsThreshold: 50000,
  tdsThresholdSenior: 100000,
  userIdleSavings: 100000,
  userExistingFD: { bank: 'Unity SFB', amount: 25000, rate: 7.25 },
};
