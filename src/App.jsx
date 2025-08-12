import React, { useEffect, useState } from 'react';
import ServiceCard from './components/ServiceCard';
import SearchBar from './components/SearchBar';
import { Routes, Route } from 'react-router-dom';
import ServiceDetails from './components/ServiceDetails';
import CreateServiceRequest from './components/CreateServiceRequest';
import { useNavigate } from 'react-router-dom';
import car from './assets/car_create.png'
import './index.css';

const API_URL = 'https://6894b423be3700414e143b8c.mockapi.io/servicetracker';

function Home() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');

  const fetchServices = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setServices(data);
      setFiltered(data);
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      setFiltered(services);
      return;
    }
    const result = services.filter((s) =>
      s.location.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this service?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchServices();
  }
};

  return (
    <div className="container">
      <h1>Vehicle Service Tracker</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0 20px' }}>
        <button
          type="button"
          onClick={() => navigate('/create')}
          className="btn-primary"
          aria-label="Create service request"
        >
          <img src={car} className="icon" alt="Create service" style={{ marginRight: '6px' }} />
          Create
        </button>
      </div>

      <div className="card-grid">
        {filtered.length ? (
          filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={(id) => navigate(`/edit/${id}`)}
              onDelete={(id) => handleDelete(id)}
            />

          ))
        ) : (
          <p>No services found</p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/service/:id" element={<ServiceDetails />} />
       <Route path="/create" element={<CreateServiceRequest />} />
       <Route path="/edit/:id" element={<CreateServiceRequest />} />
    </Routes>
  );
}