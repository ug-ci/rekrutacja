export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>Uniwersytet Gdański</h4>
          <p>ul. Jana Bażyńskiego 8</p>
          <p>80-309 Gdańsk</p>
        </div>
        <div className="footer-col">
          <h4>Rekrutacja</h4>
          <p>Tel: +48 58 523 25 32</p>
          <p>Email: rekrutacja@ug.edu.pl</p>
        </div>
        <div className="footer-col">
          <h4>Linki</h4>
          <a href="https://ug.edu.pl" target="_blank" rel="noopener noreferrer">ug.edu.pl</a>
          <a href="https://irk.ug.edu.pl" target="_blank" rel="noopener noreferrer">IRK</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Uniwersytet Gdański. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
