import { useState, useEffect } from 'react';
import './App.css';

type Expense = {
  title: string;
  type: string;
  amount: number;
  date: string;
  paidBy: string;
};

const PEERS = [
  { name: 'Mahesh', id: 'mahesh' },
  { name: 'Manjula', id: 'manjula' },
  { name: 'Mamatha', id: 'mamatha' },
];

const EXPENSE_TYPES = [
  { title: 'Construction', id: 'cons' },
  { title: 'Interiors', id: 'int' },
  { title: 'Others', id: 'othes' },
];

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”: ', error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

function App() {
  const [expensesList, setExpensesList] = useLocalStorage<Expense[]>(
    'expenses_data',
    [
      // Manjula
      {
        title: 'Sandforleveling',
        type: 'cons',
        amount: 275000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'Construction 1st payment',
        type: 'cons',
        amount: 900000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title:
          'Water electricity connection electric pole motor lawyer charges',
        type: 'othes',
        amount: 203000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'Construction 2nd payment 1st half',
        type: 'cons',
        amount: 385000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'Construction 2nd payment 2nd half',
        type: 'cons',
        amount: 300000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'For mannu, jcb work, slab oota',
        type: 'cons',
        amount: 52650,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'Construction fifth payment',
        type: 'cons',
        amount: 200000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'Pop',
        type: 'int',
        amount: 200000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'Interiors material',
        type: 'int',
        amount: 500000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'Kamadhenu stone cladding',
        type: 'othes',
        amount: 34000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      {
        title: 'Construction sixth payment',
        type: 'cons',
        amount: 300000,
        date: '2024-01-01',
        paidBy: 'manjula',
      },
      // Mamatha
      {
        title:
          'Water electricity connection electric pole motor lawyer charges',
        type: 'othes',
        amount: 50000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Construction 2nd payment 1st half',
        type: 'cons',
        amount: 115000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Construction 2nd payment 2nd half',
        type: 'cons',
        amount: 200000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Construction 3rd payment',
        type: 'cons',
        amount: 1500000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Construction fourth payment',
        type: 'cons',
        amount: 800000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Stainless steel window rod and food to labours',
        type: 'othes',
        amount: 20000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Construction fifth payment',
        type: 'cons',
        amount: 100000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Construction sixth payment',
        type: 'cons',
        amount: 300000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Interiors',
        type: 'int',
        amount: 200000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      {
        title: 'Panchayath 919 paper for electricity',
        type: 'othes',
        amount: 24000,
        date: '2024-01-01',
        paidBy: 'mamatha',
      },
      // Mahesha
      {
        title: 'Construction first payment',
        type: 'cons',
        amount: 600000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Construction fourth payment',
        type: 'cons',
        amount: 200000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Construction fifth payment',
        type: 'cons',
        amount: 700000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Interiors material',
        type: 'int',
        amount: 200000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Stone cladding remaining amount',
        type: 'othes',
        amount: 40000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Stone cladding wooden boxing',
        type: 'othes',
        amount: 2650,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Interiors',
        type: 'int',
        amount: 100000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Stone cladding transportation',
        type: 'othes',
        amount: 3300,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Construction/interiors',
        type: 'cons',
        amount: 200000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Panchayath 919 paper for electricity',
        type: 'othes',
        amount: 4000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Construction',
        type: 'cons',
        amount: 500000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
      {
        title: 'Electricity pole cable and gate cable',
        type: 'othes',
        amount: 9000,
        date: '2024-01-01',
        paidBy: 'mahesh',
      },
    ],
  );

  const [formValues, setFormValues] = useState<Expense>({
    title: '',
    type: EXPENSE_TYPES[0].id,
    amount: 0,
    date: '',
    paidBy: PEERS[0].id,
  });
  const [filterName, setFilterName] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredExpenses = expensesList.filter((expense) => {
    const nameMatch = filterName === 'all' || expense.paidBy === filterName;
    const typeMatch = filterType === 'all' || expense.type === filterType;
    return nameMatch && typeMatch;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  // Validation logic: Title is not empty, Amount is positive, Date is selected
  const isFormValid =
    formValues.title.trim() !== '' &&
    formValues.amount > 0 &&
    formValues.date !== '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExpensesList([...expensesList, formValues]);
    // Reset form after submission
    setFormValues({
      title: '',
      type: EXPENSE_TYPES[0].id,
      amount: 0,
      date: '',
      paidBy: PEERS[0].id,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>
        Expenses Logger{' '}
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 'bold' }}>Paid by: </label>
          <select
            name='paidBy'
            value={formValues.paidBy}
            onChange={handleChange}
            style={{
              padding: '10px',
              width: '100%',
              boxSizing: 'border-box',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            {PEERS.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 'bold' }}>Expense title: </label>
          <input
            name='title'
            type='text'
            placeholder='Expense title'
            value={formValues.title}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              width: '100%',
              boxSizing: 'border-box',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 'bold' }}>Expense type: </label>
          <select
            name='type'
            value={formValues.type}
            onChange={handleChange}
            style={{
              padding: '10px',
              width: '100%',
              boxSizing: 'border-box',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            {EXPENSE_TYPES.map(({ title, id }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 'bold' }}>Expense amount: </label>
          <input
            name='amount'
            type='number'
            placeholder='Expense amount'
            value={formValues.amount || ''}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              width: '100%',
              boxSizing: 'border-box',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 'bold' }}>Expense date: </label>
          <input
            name='date'
            type='date'
            value={formValues.date}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              width: '100%',
              boxSizing: 'border-box',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <button
          style={{
            width: 'fit-content',
            padding: '8px',
            margin: 'auto',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            opacity: isFormValid ? 1 : 0.5,
          }}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>

      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '40px',
          }}
        >
          <h1 style={{ margin: 0 }}>Expenses List</h1>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 150px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                }}
              >
                Filter by Name:{' '}
              </label>
              <select
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                style={{
                  padding: '8px',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value='all'>All</option>
                {PEERS.map(({ name, id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1 1 150px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                }}
              >
                Filter by Type:{' '}
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  padding: '8px',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value='all'>All</option>
                {EXPENSE_TYPES.map(({ title, id }) => (
                  <option key={id} value={id}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div
          style={{
            overflowX: 'auto',
            marginTop: '20px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '700px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th
                  style={{
                    border: '1px solid #ddd',
                    textAlign: 'left',
                    padding: '10px',
                    color: "black" 
                  }}
                >
                  Title
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    textAlign: 'left',
                    padding: '10px',
                    width: '150px',
                    color: "black" 
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    textAlign: 'left',
                    padding: '10px',
                    width: '120px',
                    color: "black" 
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    textAlign: 'left',
                    padding: '10px',
                    width: '120px',
                    color: "black" 
                  }}
                >
                  Paid By
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: '1px solid #ddd',
                      wordBreak: 'break-word',
                      padding: '10px',
                    }}
                  >
                    {expense.title}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    ₹{expense.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    {EXPENSE_TYPES.find((t) => t.id === expense.type)?.title ||
                      expense.type}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    {PEERS.find((p) => p.id === expense.paidBy)?.name ||
                      expense.paidBy}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
              <tr>
                <td
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    textAlign: 'right',
                    color: 'black',
                  }}
                >
                  Total Expense
                </td>
                <td
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    color: 'black',
                  }}
                >
                  ₹{totalAmount.toLocaleString('en-IN')}
                </td>
                <td
                  colSpan={2}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    color: 'black',
                  }}
                ></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
