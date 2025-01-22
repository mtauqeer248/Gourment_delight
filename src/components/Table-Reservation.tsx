interface Table {
    id: number;
    seats: number;
    isOccupied: boolean;
    position: string;
  }
  
  interface Reservation {
    name: string;
    email: string;
    phone: string;
    time: string;
    date: string;
  }
  
  import React, { useState } from 'react';
 
  
  const RestaurantSeating: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [, setShowForm] = useState<boolean>(false);
    const [reservation, setReservation] = useState<Reservation>({
      name: '',
      email: '',
      phone: '',
      time: '',
      date: ''
    });
  
    const tables: Table[] = [
      { id: 1, seats: 2, isOccupied: false, position: 'translate-x-12 translate-y-12' },
      { id: 2, seats: 4, isOccupied: true, position: 'translate-x-48 translate-y-12' },
      { id: 3, seats: 6, isOccupied: false, position: 'translate-x-96 translate-y-12' },
      { id: 4, seats: 2, isOccupied: false, position: 'translate-x-12 translate-y-48' },
      { id: 5, seats: 4, isOccupied: false, position: 'translate-x-48 translate-y-48' },
      { id: 6, seats: 6, isOccupied: true, position: 'translate-x-96 translate-y-48' }
    ];
  
    const handleTableClick = (table: Table): void => {
      if (!table.isOccupied) {
        setSelectedTable(table);
        setShowForm(true);
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      if (selectedTable) {
        console.log('Booking table:', selectedTable.id, reservation);
      }
      setShowForm(false);
      setSelectedTable(null);
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
        <h1 className="text-3xl font-bold mb-8 text-center">Restaurant Seating</h1>
        
        <div className="relative w-full h-96 border-2 border-gray-300 bg-white rounded-lg mb-8">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`absolute ${table.position} cursor-pointer transition-all`}
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
  
        
         
              <h1>Book Table {selectedTable?.id}</h1>
         
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.entries({
                name: 'text',
                date: 'date',
                time: 'time',
                phone: 'tel',
                email: 'email'
              }).map(([field, type]) => (
                <div key={field}>
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    id={field}
                    type={type}
                    value={reservation[field as keyof Reservation]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <button type="submit" className="w-full">Confirm Reservation</button>
            </form>
         
      </div>
    );
  };
  
  export default RestaurantSeating;