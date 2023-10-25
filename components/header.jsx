import Link from "next/link";

const MyNavbar = ({ expanded, handleToggle, handleMenuItemClick }) => {
  return (
    <nav className="bg-[#ffffff] sticky top-0 shadow z-50">
      <div className="container flex mx-auto space-x-4 justify-between">
        <Link href="/">
          <img src="./Logo.png" width="60" alt="logo" />
        </Link>
        <button
          onClick={handleToggle}
          className="text-dark lg:hidden block float-right"
        >
          ☰
        </button>
        <div
          className={`${
            expanded ? "block" : "hidden"
          } lg:flex lg:items-center lg:w-auto justify-end`}
        >
          <ul className="lg:flex lg:space-x-2">
            <li>
              <Link
                href="https://www.riverorchidresort.com"
                onClick={handleMenuItemClick}
                className="hover:text-dark text-uppercase text-center mx-2"
              >
                {" "}
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
