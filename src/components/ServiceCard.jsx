import React from 'react';

function ServiceCard({ service }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{service.service_provider || 'Service'}</h3>
        <p>location : {service.location}</p>
      </div>
      <div className="card-content">
        <p>vehicle type: {service.vehicle_type}</p>
        <p>date of service: {service.date_of_service}</p>
        <p>date of delivery: {service.date_of_delivery}</p>
        <p className="card-amount">service amount : ₹{service.service_amount}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
