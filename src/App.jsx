import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './components/ServiceCard';
import SearchBar from './components/SearchBar';
import './index.css';

const API_URL = 'https://6894b423be3700414e143b8c.mockapi.io/servicetracker';

function App() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');

  const fetchServices = async () => {
    try {
      const res = await axios.get(API_URL);
      setServices(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return setFiltered(services);

    const result = services.filter((s) =>
      s.location.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="container">
      <h1>Vehicle Service Tracker</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      <div className="card-grid">
        {filtered.length ? (
          filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <p>No services found</p>
        )}
      </div>
    </div>
  );
}

export default App;
