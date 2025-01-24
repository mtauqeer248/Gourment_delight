import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Table {
  id: number;
  seats: number;
  isOccupied: boolean;
}

interface Reservation {
  name: string;
  email: string;
  phone: string;
  time: string;
  date: string;
}

const RestaurantSeating: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [tables, setTables] = useState<Table[]>([
    { id: 1, seats: 2, isOccupied: false },
    { id: 2, seats: 4, isOccupied: true },
    { id: 3, seats: 6, isOccupied: false },
    { id: 4, seats: 2, isOccupied: false },
    { id: 5, seats: 4, isOccupied: false },
    { id: 6, seats: 6, isOccupied: true },
    { id: 7, seats: 2, isOccupied: false },
    { id: 8, seats: 4, isOccupied: false },
    { id: 9, seats: 6, isOccupied: false }
  ]);

  const [reservation, setReservation] = useState<Reservation>({
    name: '',
    email: '',
    phone: '',
    time: '',
    date: ''
  });

  const handleTableClick = (table: Table): void => {
    if (!table.isOccupied) {
      setSelectedTable(table);
      setShowForm(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This table is already occupied!'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (selectedTable) {
      // Update table occupation status
      const updatedTables = tables.map(table => 
        table.id === selectedTable.id ? { ...table, isOccupied: true } : table
      );
      setTables(updatedTables);
      
      Swal.fire({
        icon: 'success',
        title: 'Reservation Successful!',
        text: `Table ${selectedTable.id} has been booked for ${reservation.name}`,
        confirmButtonText: 'Great!'
      });

      // Reset states
      setShowForm(false);
      setSelectedTable(null);
      setReservation({
        name: '',
        email: '',
        phone: '',
        time: '',
        date: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setReservation(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-stone-800">Restaurant Seating</h1>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tables.map((table) => (
          <div
            key={table.id}
            className="cursor-pointer transition-all w-40"
            onClick={() => handleTableClick(table)}
          >
            <div className={`p-4 rounded-lg border-2 ${
              table.isOccupied ? 
              'bg-red-100 border-red-500' : 
              'bg-green-100 border-green-500 hover:bg-green-200'
            }`}>
              <div className="text-center">
                <p className="font-semibold">Table {table.id}</p>
                <p className="text-sm">{table.seats} seats</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-500"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-500"></div>
          <span>Occupied</span>
        </div>
      </div>

      {showForm && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-stone-800">Book Table {selectedTable.id}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.entries({
                name: 'text',
                date: 'date',
                time: 'time',
                phone: 'tel',
                email: 'email'
              }).map(([field, type]) => (
                <div key={field} className="flex flex-col">
                  <label 
                    htmlFor={field} 
                    className="mb-2 text-sm font-medium text-stone-700 capitalize"
                  >
                    {field}
                  </label>
                  <input
                    id={field}
                    type={type}
                    value={reservation[field as keyof Reservation]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              ))}
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Confirm Reservation
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false);
                  setSelectedTable(null);
                }}
                className="w-full mt-2 bg-stone-200 text-stone-700 py-2 rounded-md hover:bg-stone-300 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantSeating;