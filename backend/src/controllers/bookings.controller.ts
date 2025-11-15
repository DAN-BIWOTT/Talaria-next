import { Request, Response } from "express";
import * as bookingService from "../services/bookings.service";
import { PrismaClient } from "@prisma/client";

// CREATE BOOKING
// POST /api/bookings
export async function createBooking(req: Request, res: Response) {
  try {
    const { clientId, date, status } = req.body;

    if (!clientId || !date) {
      return res.status(400).json({ message: "clientId and date are required" });
    }

    // 1️⃣ Create the booking
    const booking = await bookingService.createBooking({
      clientId: Number(clientId),
      date: new Date(date),
      status: status ?? "scheduled",
    });

    // 2️⃣ Create an empty session
    const session = await bookingService.createDefaultSessionForBooking(
      booking.id
    );

    // 3️⃣ Return matching BookingSchema structure
    return res.status(201).json({
      ...booking,
      session: {
        ...session,
        booking: {
          date: booking.date,
          status: booking.status,
        },
      },
    });

  } catch (error) {
    console.error("❌ Error creating booking:", error);
    return res.status(500).json({ message: "Failed to create booking" });
  }
}




// GET BOOKINGS FOR A CLIENT
// GET /api/bookings/client/:clientId
export async function getBookingsForClient(req: Request, res: Response) {
  try {
    const clientId = Number(req.params.clientId);

    if (isNaN(clientId)) {
      return res.status(400).json({ message: "Invalid clientId" });
    }

    const bookings = await bookingService.getBookingsForClient(clientId);
    return res.json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

// GET SINGLE BOOKING
// GET /api/bookings/:id
export async function getSingleBooking(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await bookingService.getSingleBooking(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json(booking);
  } catch (error) {
    console.error("❌ Error fetching booking:", error);
    return res.status(500).json({ message: "Failed to fetch booking" });
  }
}

// UPDATE BOOKING STATUS
// PATCH /api/bookings/:id/status
export async function updateBookingStatus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updated = await bookingService.updateBookingStatus(id, status);
    return res.json(updated);
  } catch (error) {
    console.error("❌ Error updating booking status:", error);
    return res.status(500).json({ message: "Failed to update booking status" });
  }
}

// RESCHEDULE BOOKING
// PATCH /api/bookings/:id/reschedule
export async function rescheduleBooking(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "New date is required" });
    }

    const updated = await bookingService.rescheduleBooking(id, new Date(date));
    return res.json(updated);
  } catch (error) {
    console.error("❌ Error rescheduling booking:", error);
    return res.status(500).json({ message: "Failed to reschedule booking" });
  }
}

// DELETE BOOKING
// DELETE /api/bookings/:id
export async function deleteBooking(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    await bookingService.deleteBooking(id);

    return res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting booking:", error);
    return res.status(500).json({ message: "Failed to delete booking" });
  }
}
