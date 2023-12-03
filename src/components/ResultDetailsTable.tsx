import { twMerge } from 'tailwind-merge';
import rules from '../core/rules';
import { IRR2IRT, annual2Monthly, convertToPersianNumbers } from '../utils';
import { TaxFormType, currencyLabel, periodLabel } from './TaxForm';

type Props = {
  steps: {
    annualMin: number;
    taxPercent: number;
    appliedTax: number;
  }[];
  currency: TaxFormType['currency'];
  totalTax: number;
  period: TaxFormType['period'];
  year: TaxFormType['year'];
};

function generateRangeText(
  index: number,
  currency: TaxFormType['currency'],
  period: TaxFormType['period'],
  year: TaxFormType['year']
) {
  const currentStepValue = convertToPersianNumbers(
    normalizeValue(rules[year].steps[index].annualMin, currency, period),
    {
      useGrouping: true,
      fractionDigits: 0,
    }
  );

  if (!rules[year].steps[index + 1]) return `از ${currentStepValue} به بالا`;

  const nextStepValue = convertToPersianNumbers(
    normalizeValue(rules[year].steps[index + 1].annualMin, currency, period),
    {
      useGrouping: true,
      fractionDigits: 0,
    }
  );

  return `از ${currentStepValue} تا ${nextStepValue}`;
}

function normalizeValue(
  value: number,
  currency: TaxFormType['currency'],
  period: TaxFormType['period']
) {
  let result = value;

  if (currency === 'IRT') {
    result = IRR2IRT(result);
  }

  if (period === 'monthly') {
    result = annual2Monthly(result);
  }

  return result;
}

function ResultDetailsTable({
  steps,
  currency,
  totalTax,
  period,
  year,
}: Props) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <h3 className="text-base font-bold text-slate-800">جزئیات محاسبه</h3>
      <table className="border-collapse border border-slate-400 bg-slate-100">
        <tr>
          <th className="border border-slate-400 p-3 font-bold text-right">
            پله مالیاتی
          </th>
          <th className="border border-slate-400 p-3 font-bold text-right">
            {`بازه ${periodLabel[period]} (${currencyLabel[currency]})`}
          </th>
          <th className="border border-slate-400 p-3 font-bold text-right">
            درصد
          </th>
          <th className="border border-slate-400 p-3 font-bold text-right">
            {`مالیات ${periodLabel[period]} (${currencyLabel[currency]})`}
          </th>
        </tr>
        {steps.map(({ taxPercent, appliedTax }, index) => (
          <tr key={index}>
            <td className="border border-slate-400 p-3 text-right">
              {convertToPersianNumbers(index + 1, {
                useGrouping: false,
                fractionDigits: 0,
              })}
            </td>
            <td className={twMerge('border border-slate-400 p-3 text-right')}>
              {generateRangeText(index, currency, period, year)}
            </td>
            <td className={twMerge('border border-slate-400 p-3 text-right')}>
              {convertToPersianNumbers(taxPercent, {
                useGrouping: false,
                currency: '٪',
                fractionDigits: 0,
              })}
            </td>
            <td className={twMerge('border border-slate-400 p-3 text-right')}>
              {convertToPersianNumbers(
                normalizeValue(appliedTax, currency, period),
                {
                  useGrouping: true,
                  fractionDigits: 0,
                }
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td className="border border-slate-400 p-3 text-right">جمع</td>
          <td className={twMerge('border border-slate-400 p-3 text-right')}>
            -
          </td>
          <td className={twMerge('border border-slate-400 p-3 text-right')}>
            -
          </td>
          <td className={twMerge('border border-slate-400 p-3 text-right')}>
            {convertToPersianNumbers(
              normalizeValue(totalTax, currency, period),
              {
                useGrouping: true,
                fractionDigits: 0,
              }
            )}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ResultDetailsTable;
