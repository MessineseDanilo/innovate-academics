const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Academic Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
