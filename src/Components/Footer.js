import '../styles/Header.css';

const Footer=()=> {
  const today = new Date().toLocaleDateString();

  return (
    <div className="footer">
      <p>@AayushMaheshwari</p>
      <p>{today}</p>
    </div>
  );
}

export default Footer;
