import { UnitService } from './unit.service';

describe('UnitService', () => {
  let unitService = new UnitService();

  describe('breakEvenUnitIncomeStatement', () => {

    it('should calculate the income statement correctly', () => {
      const incomeStatement = unitService.breakEvenUnitIncomeStatement(8.5, 3.08, 10000);            
      expect(incomeStatement.units).toEqual(1846);
      expect(incomeStatement.revenue).toEqual(15691);
      expect(incomeStatement.variableExpense).toEqual(5685.68);
      expect(incomeStatement.fixedExpense).toEqual(10000);
      expect(incomeStatement.expenseTotal).toEqual(15685.68);
      expect(incomeStatement.grossProfit).toEqual(5.32);
    });
  });

  describe('breakEvenUnits', () => {
    it('1.50 revenue, .40 variable expense, 2000 fixed = 1819 units', () => {
      let units = unitService.breakEvenUnits(1.50, .40, 2000);
      expect(units).toEqual(1819);
    });

    it('100 revenue, 20 variable expense, 10000 fixed = 125 units', () => {
      let units = unitService.breakEvenUnits(100, 20, 10000);
      expect(units).toEqual(125);
    });

    it('should calculate correctly', () => {
      let units = unitService.breakEvenUnits(9, 4, 2000);
      expect(units).toEqual(400);
    });

  });
});
