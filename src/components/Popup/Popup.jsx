import React, { useState } from 'react';

const formatValue = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const PrincipalInput = ({ value, onChange }) => (
  <div className="mb-4">
    <label htmlFor="principal" className="block mb-1">
      Valor Inicial:
    </label>
    <input
      type="number"
      id="principal"
      className="border text-slate-900 rounded-md border-gray-300 p-2 w-full"
      value={value}
      onChange={onChange}
    />
  </div>
);

const InterestRateInput = ({ value, onChange }) => (
  <div className="mb-4">
    <label htmlFor="interestRate" className="block mb-1">
      Taxa de Juros (%):
    </label>
    <input
      type="number"
      id="interestRate"
      className="border text-slate-900 rounded-md border-gray-300 p-2 w-full"
      value={value}
      onChange={onChange}
    />
  </div>
);

const TimeInput = ({ value, onChange, timeUnit, onTimeUnitChange }) => (
  <div className="mb-4">
    <label htmlFor="time" className="block mb-1">
      Tempo:
    </label>
    <div className="flex items-center gap-3">
      <input
        type="number"
        id="time"
        className="border text-slate-900 rounded-md border-gray-300 p-2 w-1/2"
        value={value}
        onChange={onChange}
      />
      <select
        className="border text-slate-900  rounded-md border-gray-300 p-2 w-1/2"
        value={timeUnit}
        onChange={onTimeUnitChange}
      >      
        <option value="years">Anos</option>
        <option value="months">Meses</option>
      </select>
    </div>
  </div>
);

const MonthlyContributionInput = ({ value, onChange }) => (
  <div className="mb-4">
    <label htmlFor="monthlyContribution" className="block mb-1">
      Aporte Mensal:
    </label>
    <input
      type="number"
      id="monthlyContribution"
      className="border text-slate-900 rounded-md border-gray-300 p-2 w-full"
      value={value}
      onChange={onChange}
    />
  </div>
);

const Result = ({ result }) => {
  const formattedResult = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(result);

  return (
    <div className="mt-4">
      <strong>Resultado:</strong> {formattedResult}
    </div>
  );
};

const Popup = () => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [time, setTime] = useState(0);
  const [timeUnit, setTimeUnit] = useState('years');
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [result, setResult] = useState(0);

  const handleCalculate = () => {
    let totalMonths = time;
    if (timeUnit === 'years') {
      totalMonths = time * 12;
    }

    const monthlyRate = interestRate / 100 / 12;
    let compoundInterest = principal;

    for (let i = 0; i < totalMonths; i++) {
      compoundInterest = (compoundInterest + monthlyContribution) * (1 + monthlyRate);
    }

    setResult(compoundInterest.toFixed(2));
  };

  return (
    <div className="p-4 rounded-sm">
      <h2 className="text-2xl font-bold mb-4">Cálculo de Juros Compostos</h2>
      <PrincipalInput value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value))} />
      <InterestRateInput value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
      <TimeInput
        value={time}
        onChange={(e) => setTime(parseFloat(e.target.value))}
        timeUnit={timeUnit}
        onTimeUnitChange={(e) => setTimeUnit(e.target.value)}
      />
      <MonthlyContributionInput
        value={monthlyContribution}
        onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCalculate}>
        Calcular
      </button>
      <Result result={result} />
    </div>
  );
};

export default Popup;
