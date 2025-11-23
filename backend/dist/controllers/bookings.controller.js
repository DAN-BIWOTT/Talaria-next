"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = createBooking;
exports.getBookingsForClient = getBookingsForClient;
exports.getSingleBooking = getSingleBooking;
exports.updateBookingStatus = updateBookingStatus;
exports.rescheduleBooking = rescheduleBooking;
exports.deleteBooking = deleteBooking;
const bookingService = __importStar(require("../services/bookings.service"));
// CREATE BOOKING
// POST /api/bookings
async function createBooking(req, res) {
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
        const session = await bookingService.createDefaultSessionForBooking(booking.id);
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
    }
    catch (error) {
        console.error("❌ Error creating booking:", error);
        return res.status(500).json({ message: "Failed to create booking" });
    }
}
// GET BOOKINGS FOR A CLIENT
// GET /api/bookings/client/:clientId
async function getBookingsForClient(req, res) {
    try {
        const clientId = Number(req.params.clientId);
        if (isNaN(clientId)) {
            return res.status(400).json({ message: "Invalid clientId" });
        }
        const bookings = await bookingService.getBookingsForClient(clientId);
        return res.json(bookings);
    }
    catch (error) {
        console.error("❌ Error fetching bookings:", error);
        return res.status(500).json({ message: "Failed to fetch bookings" });
    }
}
// GET SINGLE BOOKING
// GET /api/bookings/:id
async function getSingleBooking(req, res) {
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
    }
    catch (error) {
        console.error("❌ Error fetching booking:", error);
        return res.status(500).json({ message: "Failed to fetch booking" });
    }
}
// UPDATE BOOKING STATUS
// PATCH /api/bookings/:id/status
async function updateBookingStatus(req, res) {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }
        const updated = await bookingService.updateBookingStatus(id, status);
        return res.json(updated);
    }
    catch (error) {
        console.error("❌ Error updating booking status:", error);
        return res.status(500).json({ message: "Failed to update booking status" });
    }
}
// RESCHEDULE BOOKING
// PATCH /api/bookings/:id/reschedule
async function rescheduleBooking(req, res) {
    try {
        const id = Number(req.params.id);
        const { date } = req.body;
        if (!date) {
            return res.status(400).json({ message: "New date is required" });
        }
        const updated = await bookingService.rescheduleBooking(id, new Date(date));
        return res.json(updated);
    }
    catch (error) {
        console.error("❌ Error rescheduling booking:", error);
        return res.status(500).json({ message: "Failed to reschedule booking" });
    }
}
// DELETE BOOKING
// DELETE /api/bookings/:id
async function deleteBooking(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }
        await bookingService.deleteBooking(id);
        return res.json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        console.error("❌ Error deleting booking:", error);
        return res.status(500).json({ message: "Failed to delete booking" });
    }
}
