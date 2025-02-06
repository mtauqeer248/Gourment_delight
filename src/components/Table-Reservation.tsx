/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { db, collection, addDoc } from '../lib/firebase'; // Import Firestore functions

interface Table {
  id: number;
  seats: number;
  isOccupied: boolean;
  section: string; // Indoor, Outdoor, Poolside, Rooftop
  position: string; // Position in the restaurant layout (e.g., "left", "center", "right")
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
    { id: 1, seats: 2, isOccupied: false, section: 'Indoor 🏠', position: 'left' },
    { id: 2, seats: 4, isOccupied: true, section: 'Indoor 🏠', position: 'center' },
    { id: 3, seats: 6, isOccupied: false, section: 'Outdoor 🌳', position: 'right' },
    { id: 4, seats: 2, isOccupied: false, section: 'Poolside 🏖️', position: 'left' },
    { id: 5, seats: 4, isOccupied: false, section: 'Rooftop 🌆', position: 'center' },
    { id: 6, seats: 6, isOccupied: true, section: 'Rooftop 🌆', position: 'right' },
    { id: 7, seats: 2, isOccupied: false, section: 'Indoor 🏠', position: 'left' },
    { id: 8, seats: 4, isOccupied: false, section: 'Poolside 🏖️', position: 'center' },
    { id: 9, seats: 6, isOccupied: false, section: 'Outdoor 🌳', position: 'right' },
    { id: 10, seats: 2, isOccupied: false, section: 'Indoor 🏠', position: 'right' },
    { id: 11, seats: 4, isOccupied: true, section: 'Outdoor 🌳', position: 'left' },
    { id: 12, seats: 6, isOccupied: false, section: 'Rooftop 🌆', position: 'center' },
    { id: 13, seats: 4, isOccupied: false, section: 'Poolside 🏖️', position: 'right' },
    { id: 14, seats: 6, isOccupied: false, section: 'Indoor 🏠', position: 'center' },
    { id: 15, seats: 2, isOccupied: false, section: 'Outdoor 🌳', position: 'left' },
    { id: 16, seats: 4, isOccupied: true, section: 'Indoor 🏠', position: 'right' },
    { id: 17, seats: 6, isOccupied: false, section: 'Poolside 🏖️', position: 'left' },
    { id: 18, seats: 4, isOccupied: false, section: 'Rooftop 🌆', position: 'right' },
    { id: 19, seats: 2, isOccupied: false, section: 'Outdoor 🌳', position: 'center' },
    { id: 20, seats: 4, isOccupied: true, section: 'Rooftop 🌆', position: 'left' }
  ]);
  const [loading, setLoading] = useState<boolean>(false);


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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (selectedTable) {
      setLoading(true);  // Show loading state
      
      try {
        // Save reservation data to Firestore
        await addDoc(collection(db, "reservations"), {
          tableId: selectedTable.id,
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          time: reservation.time,
          date: reservation.date,
          section: selectedTable.section,
          seats: selectedTable.seats,
        });
  
        const updatedTables = tables.map((table) =>
          table.id === selectedTable.id ? { ...table, isOccupied: true } : table
        );
        setTables(updatedTables);
  
        Swal.fire({
          icon: 'success',
          title: 'Reservation Successful!',
          text: `Table ${selectedTable.id} has been booked for ${reservation.name}`,
          confirmButtonText: 'Great!'
        });
  
        setShowForm(false);
        setSelectedTable(null);
        setReservation({
          name: '',
          email: '',
          phone: '',
          time: '',
          date: ''
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue with your reservation. Please try again later.',
        });
      } finally {
        setLoading(false);  // Hide loading state
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-stone-800">Restaurant Seating</h1>

      {/* Restaurant Tables Layout */}
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`w-40 h-40 flex items-center justify-center 
              ${table.isOccupied ? 'bg-red-400 text-white shadow-[0_0_8px_#ff4d4d,0_0_12px_#ff4d4d,0_0_20px_#ff4d4d]' : 'bg-green-400 text-white shadow-[0_0_8px_#66ff66,0_0_12px_#66ff66,0_0_20px_#66ff66]'} 
              rounded-lg cursor-pointer transition-transform transform hover:scale-105 border-2 border-stone-200 shadow-lg`}
            onClick={() => handleTableClick(table)}
          >
            <div className="text-center">
              <p><strong>Table {table.id}</strong></p>
              <p>{table.seats} seats</p>
              <p>{table.section}</p>
              <p className={`text-sm`}>
                {table.isOccupied ? 'Occupied' : 'Available'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Reservation Form with Glassmorphism */}
      {showForm && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-stone-800">
              Book Table {selectedTable.id}
            </h2>
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
  disabled={loading}
  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
>
  {loading ? 'Saving Reservation...' : 'Confirm Reservation'}
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
