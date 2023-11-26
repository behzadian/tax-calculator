import rules from './rules';

type InputType = {
  salary: number; // annual IRR
  year: keyof typeof rules;
};

type OutputType = {
  steps: {
    annualMin: number;
    taxPercent: number;
    appliedTax: number; // annual IRR
  }[];
  totalTax: number; // annual IRR
  totalPercent: number;
};

function calculateTax({ salary, year }: InputType): OutputType {
  const currentYearRule = rules[year];
  if (!currentYearRule) {
    throw new Error('Tax rule not found');
  }

  if (salary < 0) {
    throw new Error('Salary should be a positive number');
  }

  return currentYearRule.steps.reduce(
    (
      acc: OutputType,
      { annualMin, taxPercent }: (typeof currentYearRule)['steps'][number],
      index: number,
      allSteps
    ) => {
      if (salary >= annualMin) {
        const currentStepUpperLimit = Math.min(
          salary,
          allSteps?.[index + 1]?.annualMin ?? Infinity
        );
        const currentStepTax =
          (currentStepUpperLimit - annualMin) * (taxPercent / 100);
        return {
          steps: [
            ...acc.steps,
            {
              annualMin,
              taxPercent,
              appliedTax: currentStepTax,
            },
          ],
          totalTax: acc.totalTax + currentStepTax,
          totalPercent:
            salary > 0 ? ((acc.totalTax + currentStepTax) * 100) / salary : 0,
        };
      }
      return acc;
    },
    { steps: [], totalTax: 0, totalPercent: 0 }
  );
}

export default calculateTax;
