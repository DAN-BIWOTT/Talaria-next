"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookings_controller_1 = require("../controllers/bookings.controller");
const router = (0, express_1.Router)();
// Create a booking
// POST /api/bookings
router.post("/", bookings_controller_1.createBooking);
// Get bookings for a specific client
// GET /api/bookings/client/:clientId
router.get("/client/:clientId", bookings_controller_1.getBookingsForClient);
// Get a single booking
// GET /api/bookings/:id
router.get("/:id", bookings_controller_1.getSingleBooking);
// Update booking status (cancel, completed, etc)
// PATCH /api/bookings/:id/status
router.patch("/:id/status", bookings_controller_1.updateBookingStatus);
// Reschedule a booking (update date)
// PATCH /api/bookings/:id/reschedule
router.patch("/:id/reschedule", bookings_controller_1.rescheduleBooking);
// Delete booking
// DELETE /api/bookings/:id
router.delete("/:id", bookings_controller_1.deleteBooking);
exports.default = router;
