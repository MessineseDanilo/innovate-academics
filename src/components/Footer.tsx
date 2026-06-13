const Footer = () => {
  return (
    <footer className="border-t border-border px-5 py-8 md:px-6">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-2 text-[12px] text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Danilo Messinese</p>
        <p>Assistant Professor of Strategy, IE Business School</p>
      </div>
    </footer>
  );
};

export default Footer;
