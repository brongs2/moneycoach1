import './GotoButton.css';

export default function GotoButton({ icon, title, description, isSelected, onClick }) {
  return (
    <div
      className='goto-button'
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
