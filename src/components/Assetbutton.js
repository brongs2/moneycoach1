
import './Assetbutton.css';

export default function AssetButton({ icon, title, description, isSelected, onClick }) {
  return (
    <div
      className={`asset-button ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="icon">{icon}</div>
      <div className="text">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
}
