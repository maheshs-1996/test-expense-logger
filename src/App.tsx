import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import './App.css';

type Expense = {
  id?: string;
  title: string;
  type: string;
  amount: number;
  date: string;
  paidBy: string;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PEERS = [
  { name: 'Manjula', id: 'manjula' },
  { name: 'Mamatha', id: 'mamatha' },
  { name: 'Mahesh', id: 'mahesh' },
];

const EXPENSE_TYPES = [
  { title: 'Construction', id: 'cons' },
  { title: 'Interiors', id: 'int' },
  { title: 'Others', id: 'othes' },
];

function App() {
  const [expensesList, setExpensesList] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      console.error(
        'Firebase configuration is missing! Ensure .env is set up and RESTART your dev server.',
      );
      setIsLoading(false);
      return;
    }

    const q = query(collection(db, 'expenses'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const expenses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Expense[];
        setExpensesList(expenses);
        setIsLoading(false);
      },
      (error) => {
        console.error('Firestore listener error:', error);
        setIsLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const [formValues, setFormValues] = useState<Expense>({
    title: '',
    type: EXPENSE_TYPES[0].id,
    amount: 0,
    date: '',
    paidBy: PEERS[0].id,
  });
  const [filterName, setFilterName] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const [addView, setAddViewFlag] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'expenses'), formValues);
      setAddViewFlag(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
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
        {addView ? 'Expenses Logger' : 'Expenses List'}
      </h1>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '40px',
          }}
        >
          {!addView && (
            <div
              style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
            >
              <button
                style={{
                  width: 'fit-content',
                  padding: '8px',
                }}
                onClick={() => setAddViewFlag(true)}
              >
                Add expense
              </button>
            </div>
          )}

          {addView ? (
            <section id='add-expense'>
              <button
                style={{
                  width: 'fit-content',
                  padding: '8px',
                  margin: 'auto',
                  marginBottom: '30px',
                }}
                type='button'
                onClick={() => setAddViewFlag(false)}
              >
                Go back
              </button>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
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

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
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

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
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

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
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

                <div>
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
                </div>
              </form>
            </section>
          ) : (
            <section id='expenses-list'>
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

              {isLoading ? (
                <p style={{ textAlign: 'center', marginTop: '40px' }}>
                  Loading data from Firebase...
                </p>
              ) : (
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
                            color: 'black',
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
                            color: 'black',
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
                            color: 'black',
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
                            color: 'black',
                          }}
                        >
                          Paid By
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.map((expense) => (
                        <tr key={expense.id}>
                          <td
                            style={{
                              border: '1px solid #ddd',
                              wordBreak: 'break-word',
                              padding: '10px',
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              navigator.clipboard.writeText(expense.id)
                            }
                          >
                            {expense.title}
                          </td>
                          <td
                            style={{
                              border: '1px solid #ddd',
                              padding: '10px',
                            }}
                          >
                            ₹{expense.amount.toLocaleString('en-IN')}
                          </td>
                          <td
                            style={{
                              border: '1px solid #ddd',
                              padding: '10px',
                            }}
                          >
                            {EXPENSE_TYPES.find((t) => t.id === expense.type)
                              ?.title || expense.type}
                          </td>
                          <td
                            style={{
                              border: '1px solid #ddd',
                              padding: '10px',
                            }}
                          >
                            {PEERS.find((p) => p.id === expense.paidBy)?.name ||
                              expense.paidBy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot
                      style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}
                    >
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
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
