export const currency = "₹";
let basepath;

if (
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
) {
  // Local environment
  basepath = "localhost";
} else {
  // Server environment
  basepath = "localhost/booking-engine";
}

export { basepath };
