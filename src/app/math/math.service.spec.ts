import { MathService } from './math.service';

describe('MathService', () => {
  const service = new MathService();

  describe('Name of the group', () => {

    it('should behave...', () => {
      expect(service.getFloat(undefined, 100)).toBe(100);
      expect(service.getFloat(null, 85)).toBe(85);
      expect(service.getFloat('', 75)).toBe(75);
      expect(service.getFloat('4.25', 75)).toBe(4.25);
      expect(service.getFloat(3.7, 75)).toBe(3.7);
    });

  });

  describe('getPercent', () => {
    it('should calculate correctly', () => {
      expect(service.getPercent(25, 100)).toBe(25);
      expect(service.getPercent(25, 200)).toBe(12.5);
    });
  });

  describe('round', () => {

    it('round', () => {
      const mathService = new MathService();
      expect(mathService.round(10.345, 2)).toEqual(10.35);
      expect(mathService.round(10.345, 3)).toEqual(10.345);
      expect(mathService.round(10.3457, 3)).toEqual(10.346);
      expect(mathService.round(10.3455, 3)).toEqual(10.346);
      expect(mathService.round(10.3454, 3)).toEqual(10.345);
    });
  });

  describe('getYearsAndMonths', () => {
    it('25 months should return 2 years 1 months', () => {
      const x = service.getYearsAndMonths(25);
      expect(x.years).toBe(2);
      expect(x.months).toBe(1);
    });

    it('36 months should return 3 years 0 months', () => {
      const x = service.getYearsAndMonths(36);
      expect(x.years).toBe(3);
      expect(x.months).toBe(0);
    });

  });
});
