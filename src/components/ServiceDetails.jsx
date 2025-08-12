import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://6894b423be3700414e143b8c.mockapi.io/servicetracker';

export default function ServiceDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItem(data);
      } catch (e) {
        setErr('Failed to load details');
        console.error(e);
      }
    })();
  }, [id]);

  if (err) return <div className="container"><p>{err}</p></div>;
  if (!item) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>Service Details</h1>
      <div className="table-wrap">
        <table className="details-table">
          <tbody>
            <tr><th>Service Provider</th><td>{item.service_provider}</td></tr>
            <tr><th>Location</th><td>{item.location}</td></tr>
            <tr><th>Vehicle Type</th><td>{item.vehicle_type}</td></tr>
            <tr><th>Vehicle Number</th><td>{item.vehicle_number}</td></tr>
            <tr><th>Service Details</th><td>{item.service_details}</td></tr>
            <tr><th>Date of Service</th><td>{item.date_of_service}</td></tr>
            <tr><th>Date of Delivery</th><td>{item.date_of_delivery}</td></tr>
            <tr><th>Service Amount</th><td>₹{item.service_amount}</td></tr>
            <tr><th>Contact</th><td>{item.contact}</td></tr>
            <tr><th>Insurance Due Date</th><td>{item.insurance_due_date}</td></tr>
            <tr><th>ID</th><td>{item.id}</td></tr>
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 16 }}>
        <Link to="/">← Back to list</Link>
      </p>
    </div>
  );
}
