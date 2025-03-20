

const Navbar = () => {
  return (
    <nav className="p-3 md:p-6 sticky bg-neutral-100/80 z-50 backdrop-blur-2xl top-0 w-full lg:grid grid-cols-5">
      <div className="flex items-center col-span-1 xl:col-span-2 justify-between lg:justify-start">
        <a href="/" className="pr-4 block flex-shrink-0">StreamWhere</a>
      </div>
      <button className="flex items-center mt-3 lg:mt-0 hover:bg-neutral-300/70 col-span-3 xl:col-span-1 transition-colors gap-2 py-.15 justify-start md:justify-center px-4 h-10 w-full lg:max-w-sm xl:max-w-full mx-auto text-neutral-600 bg-neutral-200/70 rounded-full text-sm">Search for movies...</button>
    </nav>
  );
};

export default Navbar;

