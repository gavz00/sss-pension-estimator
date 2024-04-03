import { useState } from "react";
import "./App.css";

interface WorkHistory {
  index: number;
  yearOfService: number;
  salary: number;
}

function App() {
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([
    { index: 1, yearOfService: 3, salary: 10000 },
  ]);
  const [totalYearsOfService, setTotalYearsOfService] = useState<number>(0);
  const [averageSalary, setAverageSalary] = useState<number>(0);
  const [pension, setPension] = useState<number>(0);

  const getTotalYearsOfService = () => {
    let total = 0;
    workHistory.map((work) => {
      total += work.yearOfService;
    });
    setTotalYearsOfService(total);
  };

  const resetWorkHistory = () => {
    setWorkHistory([{ index: 1, yearOfService: 3, salary: 10000 }]);
    setPension(0);
  };

  const getAverageSalary = () => {
    let total = 0;
    workHistory.map((work) => {
      total += work.salary;
    });
    console.log(total + "+" + workHistory.length);
    setAverageSalary(Number((total / workHistory.length).toFixed(2)));
  };

  const addform = () => {
    const newFieldId = workHistory.length + 1;
    setWorkHistory([
      ...workHistory,
      { index: newFieldId, yearOfService: 0, salary: 0 },
    ]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof (typeof workHistory)[0]
  ) => {
    const updatedFields = [...workHistory];
    updatedFields[index][field] = Number(e.target.value);
    setWorkHistory(updatedFields);
    console.log("Work History" + JSON.stringify(workHistory));
    getTotalYearsOfService();
    getAverageSalary();
  };

  const computePension = () => {
    let pension = 0;
    pension =
      300 +
      (0.2 * averageSalary +
        0.02 * (averageSalary * (totalYearsOfService - 10))) +
      1000;
    console.log(
      `300 +(0.2 * averageSalary + 0.02 * averageSalary * (totalYearsOfService - 10)) + 1000`
    );
    console.log(
      `300 +(0.2 * ` +
        averageSalary +
        `)+ 0.02 *` +
        averageSalary +
        `* (` +
        totalYearsOfService +
        ` - 10)) + 1000`
    );
    console.log(
      `300 +` +
        0.2 * averageSalary +
        `+ 0.02 *` +
        averageSalary * (totalYearsOfService - 10) +
        `+ 1000`
    );
    console.log(
      `300 +` +
        0.2 * averageSalary +
        `+ 0.02 * averageSalary * ` +
        (totalYearsOfService - 10) +
        `+ 1000`
    );
    console.log(
      `300 +` +
        0.2 * averageSalary +
        `+ 0.02 * ` +
        averageSalary * (totalYearsOfService - 10) +
        `+ 1000`
    );
    console.log(
      `300 +` +
        (0.2 * averageSalary).toFixed(2) +
        `+` +
        (0.02 * +averageSalary * (totalYearsOfService - 10)).toFixed(2) +
        `+ 1000`
    );
    console.log(
      `300 +` +
        (0.2 * averageSalary +
          0.02 * averageSalary * (totalYearsOfService - 10)) +
        `+ 1000`
    );
    console.log(
      300 +
        0.2 * averageSalary +
        0.02 * averageSalary * (totalYearsOfService - 10) +
        1000
    );

    setPension(Number(pension.toFixed(2)));
  };

  return (
    <>
      <div className="workHistory">
        {workHistory.map((work, index) => (
          <div key={index}>
            <input
              id={`salary-${index}`}
              value={work.salary}
              onChange={(e) => handleInputChange(e, index, "salary")}
            />
            <input
              id={`yearOfService-${index}`}
              value={work.yearOfService}
              onChange={(e) => handleInputChange(e, index, "yearOfService")}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addform();
          }}
        >
          Add more
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            computePension();
          }}
        >
          Compute
        </button>
      </div>
      <div>{pension}</div>
      {pension > 0 ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            resetWorkHistory();
          }}
        >
          Reset
        </button>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
