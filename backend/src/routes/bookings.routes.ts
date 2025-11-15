import { Router } from "express";
import {
  createBooking,
  getBookingsForClient,
  getSingleBooking,
  updateBookingStatus,
  rescheduleBooking,
  deleteBooking,
} from "../controllers/bookings.controller";

const router = Router();

// Create a booking
// POST /api/bookings
router.post("/", createBooking);

// Get bookings for a specific client
// GET /api/bookings/client/:clientId
router.get("/client/:clientId", getBookingsForClient);

// Get a single booking
// GET /api/bookings/:id
router.get("/:id", getSingleBooking);

// Update booking status (cancel, completed, etc)
// PATCH /api/bookings/:id/status
router.patch("/:id/status", updateBookingStatus);

// Reschedule a booking (update date)
// PATCH /api/bookings/:id/reschedule
router.patch("/:id/reschedule", rescheduleBooking);

// Delete booking
// DELETE /api/bookings/:id
router.delete("/:id", deleteBooking);

export default router;
