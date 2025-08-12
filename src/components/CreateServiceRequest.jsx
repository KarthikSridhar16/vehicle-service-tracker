import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://6894b423be3700414e143b8c.mockapi.io/servicetracker';

export default function CreateServiceRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    vehicle_type: '',
    vehicle_number: '',
    date_of_service: '',
    date_of_delivery: '',
    service_details: '',
    service_amount: '',
    service_provider: '',
    contact: '',
    location: '',
    insurance_due_date: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      date_of_service: Number(form.date_of_service),
      date_of_delivery: Number(form.date_of_delivery),
      service_amount: Number(form.service_amount),
      contact: Number(form.contact),
      insurance_due_date: Number(form.insurance_due_date),
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      navigate('/');
    } catch (err) {
      setError('Failed to create service. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <h1>Create Service Request</h1>

      <form className="form" onSubmit={submit}>
        <div className="form-grid">
          <label>Service Provider
            <input name="service_provider" value={form.service_provider} onChange={update} required />
          </label>

          <label>Location
            <input name="location" value={form.location} onChange={update} required />
          </label>

          <label>Vehicle Type
            <input name="vehicle_type" value={form.vehicle_type} onChange={update} required />
          </label>

          <label>Vehicle Number
            <input name="vehicle_number" value={form.vehicle_number} onChange={update} required />
          </label>

          <label>Service Details
            <input name="service_details" value={form.service_details} onChange={update} required />
          </label>

          <label>Date of Service (number)
            <input name="date_of_service" type="number" value={form.date_of_service} onChange={update} required />
          </label>

          <label>Date of Delivery (number)
            <input name="date_of_delivery" type="number" value={form.date_of_delivery} onChange={update} required />
          </label>

          <label>Service Amount
            <input name="service_amount" type="number" value={form.service_amount} onChange={update} required />
          </label>

          <label>Contact
            <input name="contact" type="number" value={form.contact} onChange={update} required />
          </label>

          <label>Insurance Due Date (number)
            <input name="insurance_due_date" type="number" value={form.insurance_due_date} onChange={update} />
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="form-actions">
          <button type="button" className="btn" onClick={() => navigate('/')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
