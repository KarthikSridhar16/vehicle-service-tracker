import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'https://6894b423be3700414e143b8c.mockapi.io/servicetracker';

export default function CreateServiceRequest() {
  const { id } = useParams();               
  const navigate = useNavigate();
  const isEdit = Boolean(id);

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

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
    
        setForm({
          vehicle_type: data.vehicle_type ?? '',
          vehicle_number: data.vehicle_number ?? '',
          date_of_service: String(data.date_of_service ?? ''),
          date_of_delivery: String(data.date_of_delivery ?? ''),
          service_details: data.service_details ?? '',
          service_amount: String(data.service_amount ?? ''),
          service_provider: data.service_provider ?? '',
          contact: String(data.contact ?? ''),
          location: data.location ?? '',
          insurance_due_date: String(data.insurance_due_date ?? ''),
        });
      } catch (e) {
        setError('Failed to load service.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

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
      const res = await fetch(isEdit ? `${API_URL}/${id}` : API_URL, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      navigate('/');
    } catch (e) {
      console.error(e);
      setError(isEdit ? 'Update failed.' : 'Create failed.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container"><p>Loading…</p></div>;

  return (
    <div className="container">
      <h1>{isEdit ? 'Edit Service Request' : 'Create Service Request'}</h1>

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
            {saving ? (isEdit ? 'Updating…' : 'Saving…') : (isEdit ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
}
