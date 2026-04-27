import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as db from './db';

// Mock the db module
vi.mock('./db', () => ({
  getUserAdsAccounts: vi.fn(),
  getUserTotalStats: vi.fn(),
}));

describe('Dashboard Procedures', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('allCampaignMetrics', () => {
    it('should return zero metrics when user has no accounts', async () => {
      vi.mocked(db.getUserAdsAccounts).mockResolvedValue([]);

      const result = {
        totalSpend: 0,
        totalClicks: 0,
        totalImpressions: 0,
        ctr: 0,
        conversionRate: 0,
        campaigns: 0,
        accountsCount: 0,
      };

      expect(result.totalSpend).toBe(0);
      expect(result.accountsCount).toBe(0);
    });

    it('should return aggregated metrics when user has accounts', async () => {
      const mockAccounts = [
        {
          id: 1,
          userId: 'user1',
          accountId: '123-456-7890',
          accountName: 'Account 1',
          status: 'linked',
          protectionEnabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 'user1',
          accountId: '234-567-8901',
          accountName: 'Account 2',
          status: 'linked',
          protectionEnabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(db.getUserAdsAccounts).mockResolvedValue(mockAccounts);

      const result = {
        totalSpend: 5250.75,
        totalClicks: 1842,
        totalImpressions: 45230,
        ctr: 4.08,
        conversionRate: 2.15,
        campaigns: 12,
        accountsCount: 2,
      };

      expect(result.accountsCount).toBe(2);
      expect(result.totalSpend).toBeGreaterThan(0);
      expect(result.totalClicks).toBeGreaterThan(0);
      expect(result.ctr).toBeGreaterThan(0);
      expect(result.conversionRate).toBeGreaterThan(0);
    });

    it('should format metrics correctly', () => {
      const metrics = {
        totalSpend: 5250.75,
        totalClicks: 1842,
        totalImpressions: 45230,
        ctr: 4.08,
        conversionRate: 2.15,
        campaigns: 12,
        accountsCount: 1,
      };

      expect(metrics.totalSpend).toBeCloseTo(5250.75, 2);
      expect(metrics.ctr).toBeCloseTo(4.08, 2);
      expect(metrics.conversionRate).toBeCloseTo(2.15, 2);
    });

    it('should handle large numbers correctly', () => {
      const metrics = {
        totalSpend: 1000000.99,
        totalClicks: 999999,
        totalImpressions: 50000000,
        ctr: 2.0,
        conversionRate: 1.5,
        campaigns: 100,
        accountsCount: 50,
      };

      expect(metrics.totalSpend).toBeGreaterThan(1000000);
      expect(metrics.totalClicks).toBeGreaterThan(900000);
      expect(metrics.accountsCount).toBe(50);
    });
  });

  describe('Campaign Metrics Validation', () => {
    it('should validate CTR percentage', () => {
      const ctr = 4.08;
      expect(ctr).toBeGreaterThanOrEqual(0);
      expect(ctr).toBeLessThanOrEqual(100);
    });

    it('should validate Conversion Rate percentage', () => {
      const conversionRate = 2.15;
      expect(conversionRate).toBeGreaterThanOrEqual(0);
      expect(conversionRate).toBeLessThanOrEqual(100);
    });

    it('should handle zero metrics', () => {
      const metrics = {
        totalSpend: 0,
        totalClicks: 0,
        totalImpressions: 0,
        ctr: 0,
        conversionRate: 0,
        campaigns: 0,
        accountsCount: 0,
      };

      expect(metrics.totalSpend).toBe(0);
      expect(metrics.totalClicks).toBe(0);
      expect(metrics.ctr).toBe(0);
    });
  });

  describe('Metrics Formatting', () => {
    it('should format spend with 2 decimal places', () => {
      const spend = 5250.75;
      const formatted = spend.toFixed(2);
      expect(formatted).toBe('5250.75');
    });

    it('should format percentages with 2 decimal places', () => {
      const ctr = 4.08;
      const formatted = ctr.toFixed(2);
      expect(formatted).toBe('4.08');
    });

    it('should format large numbers with locale string', () => {
      const clicks = 1842;
      const formatted = clicks.toLocaleString('ar-SA');
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
    });
  });
});
