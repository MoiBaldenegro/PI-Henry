import "./fotter.css";

const Fotter = () => {
  return (
    <footer className="footer">
      <p>© 2023 Siriux. Todos los derechos reservados.</p>
      <p>
        <a href="/about">Acerca de mi</a> |{" "}
        <a
          href="https://www.linkedin.com/in/giovannicespedes/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contacto
        </a>
      </p>
    </footer>
  );
};

export default Fotter;
