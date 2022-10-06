import { ProfitAnalysisService } from './profitAnalysis.service';

describe('UnitService', () => {
  let service = new ProfitAnalysisService();

  describe('grossProfitByNetIncome', () => {
    it('should calculate correctly', () => {
      expect(service.grossProfitByNetIncome(35, 6500)).toEqual(10000);
    });
  });

  describe('unitsIncomeStatementNetIcome', () => {
    it('should calculate the income statement correctly', () => {
      //page 475 Managerial accounting
      //1400 * 325 = 455.000 variable expense + 45,000 fixed expense =+45      
      const incomeStatement = service.unitsIncomeStatementNetIcome(500, 225, 45000, 65130, 35);
      expect(incomeStatement.units).toEqual(528);
      expect(incomeStatement.revenue).toEqual(264000);
      expect(incomeStatement.variableExpense).toEqual(118800);
      expect(incomeStatement.fixedExpense).toEqual(45000);
      expect(incomeStatement.expenseTotal).toEqual(163800);
      expect(incomeStatement.grossProfit).toEqual(100200);
      expect(incomeStatement.grossProfitPercent).toEqual(37.95); //TODO verify this math
      expect(incomeStatement.incomeTax).toEqual(35070);
      expect(incomeStatement.netIncome).toEqual(65130);
    });
  });

  describe('breakEvenUnitIncomeStatement', () => {
    it('should calculate the income statement correctly', () => {
      //page 475 Managerial accounting
      //1400 * 325 = 455.000 variable expense + 45,000 fixed expense =+45      
      const incomeStatement = service.unitsIncomeStatement(400, 325, 45000, 60000, 40);
      expect(incomeStatement.units).toEqual(1400);
      expect(incomeStatement.revenue).toEqual(560000);
      expect(incomeStatement.variableExpense).toEqual(455000);
      expect(incomeStatement.fixedExpense).toEqual(45000);
      expect(incomeStatement.expenseTotal).toEqual(500000);
      expect(incomeStatement.grossProfit).toEqual(60000);
      expect(incomeStatement.incomeTax).toEqual(24000);
      expect(incomeStatement.netIncome).toEqual(36000);
    });

    it('should calculate the income statement correctly', () => {
      const incomeStatement = service.unitsIncomeStatement(8.5, 3.08, 10000);
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
      let units = service.unitsForGrossProfit(1.50, .40, 2000);
      expect(units).toEqual(1819);
    });

    it('100 revenue, 20 variable expense, 10000 fixed = 125 units', () => {
      let units = service.unitsForGrossProfit(100, 20, 10000);
      expect(units).toEqual(125);
    });

    it('should calculate correctly', () => {
      let units = service.unitsForGrossProfit(9, 4, 2000);
      expect(units).toEqual(400);
    });

  });
});
