import { UnitService } from './unit.service';

describe('UnitService', () => {
  let unitSerive = new UnitService();

  describe('breakEvenUnits', () => {
 
    it('1.50 revenue, .40 variable expense, 2000 fixed = 1819 units', () => {
      let units = unitSerive.breakEvenUnits(1.50, .40, 2000)
      expect(units).toEqual(1819);
    });

    it('100 revenue, 20 variable expense, 10000 fixed = 125 units', () => {
      let units = unitSerive.breakEvenUnits(100, 20, 10000)
      expect(units).toEqual(125);
    });

    it('should calculate correctly', () => {
      let units = unitSerive.breakEvenUnits(9, 4, 2000)
      expect(units).toEqual(400);
    });
   
  });
});
