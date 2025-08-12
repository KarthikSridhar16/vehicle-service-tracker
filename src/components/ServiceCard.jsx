import React from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/car_edit.png";
import deleteIcon from "../assets/car_delete.png";

function ServiceCard({ service, onDelete, onEdit }) {
  const navigate = useNavigate();

  const goToDetails = () => navigate(`/service/${service.id}`);

  return (
    <div
      className="card"
      role="button"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goToDetails()}
    >
      <div className="card-header">
        <div className="icon-btn icon-edit"  onClick={(e) => {
          e.stopPropagation();
          navigate(`/edit/${service.id}`);
        }}>
          <img src={editIcon} alt="Edit" />
        </div>

        <div className="card-title">
          <strong>{service.service_provider}</strong>
          <span className="location">location : {service.location}</span>
        </div>

        <div className="icon-btn icon-delete" onClick={() => onDelete(service.id)}>
          <img src={deleteIcon} alt="Delete" />
        </div>

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
