import Link from "next/link";
import Image from "next/image";

const MyNavbar = ({ expanded, handleToggle, handleMenuItemClick }) => {
  return (
    <nav className="bg-[#ffffff] sticky top-0 shadow z-50">
      <div className="container flex mx-auto space-x-4 justify-between">
        <Link href="/">
          <Image
            src="/Logo.png"
            width="60"
            height="60"
            alt="logo"
            style={{width: "auto", height: "auto" }}
          />
        </Link>
        {/* <button
          onClick={handleToggle}
          className="text-dark lg:hidden block float-right"
        >
          ☰
        </button> */}
        <div className="lg:flex lg:items-center lg:w-auto justify-end">
          <ul className="bg-[#9f1f63] lg:flex lg:space-x-2 lg:mt-0 mt-4 text-white p-2 rounded-md">
            <li>
              <Link
                href="https://www.riverorchidresort.com"
                onClick={handleMenuItemClick}
                className="hover:text-[#ffffff] text-uppercase text-center mx-2"
                target="_blank"
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
