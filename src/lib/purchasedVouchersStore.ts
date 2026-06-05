export interface LocalPurchasedVoucher {
  id: string;
  user_id: string;
  voucher_id: string;
  key_code: string;
  status: 'active' | 'used' | 'expired';
  purchased_at: string;
  expires_at: string | null;
  redeemed_at: string | null;
  platform: string;
  voucher_type: string;
  variant_label: string | null;
  vendor?: string;
}

const STORAGE_KEY = 'getmo_purchased_vouchers';

function readAll(): LocalPurchasedVoucher[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LocalPurchasedVoucher[]) : [];
  } catch {
    return [];
  }
}

export function getLocalPurchasedVouchers(userId: string): LocalPurchasedVoucher[] {
  return readAll().filter(p => p.user_id === userId);
}

export function addLocalPurchasedVoucher(pv: LocalPurchasedVoucher) {
  try {
    const list = readAll();
    list.unshift(pv);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}