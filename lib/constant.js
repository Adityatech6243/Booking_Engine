export const currency = "₹";
let basepath;

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  // Local environment
  basepath = "localhost";
} else {
  // Server environment
  basepath = "riverorchidresort.com/booking-engine";
}

export { basepath };
