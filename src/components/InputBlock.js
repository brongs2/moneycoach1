// components/InputBlock.jsx
export default function InputBlock({ label, children }) {
    return (
        <div className="input-block">
            <h2>{label}</h2>
            <div className="input-content">
                {children}
            </div>
        </div>
    );
}
