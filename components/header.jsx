import Link from "next/link";

const MyNavbar = ({ expanded, handleToggle, handleMenuItemClick }) => {
  return (
    <nav className="bg-light sticky top-0 shadow">
      <div className="container mx-auto p-5">
        <Link href="/">
          <img src="/img/Logo.png" width="170" alt="logo" />
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
                href="/"
                onClick={handleMenuItemClick}
                className="hover:text-dark text-uppercase text-center mx-2"
              >
                
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={handleMenuItemClick}
                className="hover:text-dark text-uppercase text-center mx-2"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                onClick={handleMenuItemClick}
                className="hover:text-dark text-uppercase text-center mx-2"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={handleMenuItemClick}
                className="hover:text-dark text-uppercase text-center mx-2"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/facilities"
                onClick={handleMenuItemClick}
                className="hover:text-dark text-uppercase text-center mx-2"
              >
                Facilities
              </Link>
            </li>
            <li>
              <Link
                href="/packages"
                onClick={handleMenuItemClick}
                className="hover:text-dark text-uppercase text-center mx-2"
              >
                Rooms & Packages
              </Link>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/place/River+Orchid+Resort+Tapola..."
                target="_blank"
                className="hover:text-dark text-uppercase text-center mx-2"
              >
                Show On Map
              </a>
            </li>
          </ul>
          <div className="lg:ml-4">
            <a
              href="https://asiatech.in/booking_engine/index3?token=MzU0NQ=="
              target="_blank"
              className="bg-pink-500 text-white text-uppercase py-2 px-4 rounded-md text-center mx-2"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
