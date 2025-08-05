import './Stutus.css'
function Status({ status }) {
    const className = `status ${status.toLowerCase().replace(" ", "-")}`;

    return <span className={className}>{status}</span>;
}
export default Status;