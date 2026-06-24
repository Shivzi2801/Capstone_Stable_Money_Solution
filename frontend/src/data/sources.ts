// Source registry — every fact on screen maps to one of these.
export type SourceKey =
  | 'partner_rate'
  | 'rbi_mpc'
  | 'fd_laddering'
  | 'fd_taxation'
  | 'dicgc'
  | 'icra_rating'
  | 'crisil_rating'
  | 'premature_withdrawal'
  | 'savings_rate'
  | 'commission_disclosure';

type SourceEntry = {
  title: string;
  publisher: string;
  oneLiner: string;
  asOf: string;
};

export const SOURCES: Record<SourceKey, SourceEntry> = {
  partner_rate: {
    title: 'Partner FD rate card',
    publisher: 'Partner small finance banks',
    oneLiner:
      'The 8.10% headline rate is the 1-year retail FD rate published by our partner bank on its public rate card.',
    asOf: 'June 2026',
  },
  rbi_mpc: {
    title: 'RBI Monetary Policy Committee statement',
    publisher: 'Reserve Bank of India',
    oneLiner:
      'The repo rate is set by the RBI MPC and announced publicly. Banks tend to revise FD rates within a few weeks.',
    asOf: 'June 2026',
  },
  fd_laddering: {
    title: 'FD laddering strategy',
    publisher: 'Standard banking practice — described by RBI and bank investor-education portals',
    oneLiner:
      'Splitting one FD into multiple maturities (a "ladder") to keep cash regularly accessible is a long-established strategy.',
    asOf: 'Evergreen',
  },
  fd_taxation: {
    title: 'FD interest taxation (FY25-26)',
    publisher: 'Income Tax Department of India',
    oneLiner:
      'FD interest is added to your income and taxed at your slab. TDS kicks in above ₹50,000 of interest per bank per year (₹1,00,000 for seniors).',
    asOf: 'FY 2025-26',
  },
  dicgc: {
    title: 'DICGC deposit insurance',
    publisher: 'Deposit Insurance and Credit Guarantee Corporation, RBI subsidiary',
    oneLiner:
      'DICGC insures each depositor up to ₹5,00,000 (principal + interest) per bank, including small finance banks.',
    asOf: 'Standing rule',
  },
  icra_rating: {
    title: 'ICRA credit rating',
    publisher: 'ICRA Limited (a Moody’s affiliate)',
    oneLiner:
      'ICRA assigns a credit rating that reflects the bank’s ability to honour its obligations. "A" means adequate safety.',
    asOf: 'Latest review',
  },
  crisil_rating: {
    title: 'CRISIL credit rating',
    publisher: 'CRISIL Ratings (an S&P Global company)',
    oneLiner:
      'CRISIL assigns a credit rating that reflects the bank’s ability to honour its obligations. "A+" is a notch above "A".',
    asOf: 'Latest review',
  },
  premature_withdrawal: {
    title: 'Premature withdrawal rules',
    publisher: 'Bank-published FD terms — RBI permits early break with penalty',
    oneLiner:
      'You can break an FD any time. Banks usually trim the applicable rate by 0.5–1% as a penalty. Principal is not touched.',
    asOf: 'Standard FD terms',
  },
  savings_rate: {
    title: 'Savings-account interest rate',
    publisher: 'Bank’s public schedule of interest rates',
    oneLiner:
      'Most savings accounts pay around 2.5–3% p.a., set unilaterally by each bank.',
    asOf: 'June 2026',
  },
  commission_disclosure: {
    title: 'Stable Money commission disclosure',
    publisher: 'Stable Money — distributor agreement with partner banks',
    oneLiner:
      'Stable Money earns a commission from the bank on every booking. The commission is similar across banks, so we have no incentive to push one over another.',
    asOf: 'Current',
  },
};
