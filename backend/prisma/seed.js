"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
const prisma = new client_1.PrismaClient();
// Path to Exercise Template CSV
const csvPath = path_1.default.join(process.cwd(), "Exercise_library_with_muscles.csv");
async function seedExerciseTemplates() {
    console.log("Looking for CSV at:", csvPath);
    if (!fs_1.default.existsSync(csvPath)) {
        console.error("❌ CSV not found at:", csvPath);
        return;
    }
    const rows = [];
    console.log("📥 Reading CSV:", csvPath);
    await new Promise((resolve, reject) => {
        fs_1.default.createReadStream(csvPath)
            .pipe((0, csv_parser_1.default)())
            .on("data", (row) => rows.push(row))
            .on("end", resolve)
            .on("error", reject);
    });
    console.log(`📦 Loaded ${rows.length} exercise template rows`);
    let inserted = 0;
    let skipped = 0;
    for (const r of rows) {
        const name = (r["Unnamed: 0"] ?? r.name ?? r.Name ?? "").trim();
        if (!name)
            continue;
        const data = {
            name,
            videoURL: r["Video link"] ?? null,
            description: r["Notes"] ?? null,
            primaryMuscle: r["Muscles used"] ?? null,
            category: r["Compound or isolation"] ??
                r["Compound or isolation "] ??
                null,
        };
        const exists = await prisma.exerciseTemplate.findFirst({
            where: { name },
        });
        if (exists) {
            skipped++;
            continue;
        }
        await prisma.exerciseTemplate.create({ data });
        inserted++;
    }
    console.log(`🌱 Exercise Templates Seeded → Inserted: ${inserted}, Skipped: ${skipped}`);
}
// ───────────────────────────────────────────────────────────
// Seed Clients
// ───────────────────────────────────────────────────────────
async function seedClients() {
    const clients = [
        {
            name: "Dan K",
            email: "dan@example.com",
            goal: "Strength & Conditioning",
        },
        {
            name: "Emma Stone",
            email: "emma@example.com",
            goal: "Hypertrophy",
        },
        {
            name: "Ahmed Ali",
            email: "ahmed@example.com",
            goal: "Fat Loss",
        },
    ];
    for (const c of clients) {
        await prisma.client.upsert({
            where: { email: c.email },
            update: {},
            create: c,
        });
    }
    console.log("👤 Clients seeded");
}
// ───────────────────────────────────────────────────────────
// Seed Bookings + Sessions + TrainingSessionExercises
// ───────────────────────────────────────────────────────────
async function seedTrainingData() {
    const clients = await prisma.client.findMany();
    const templates = await prisma.exerciseTemplate.findMany();
    if (templates.length === 0) {
        console.warn("⚠️ No ExerciseTemplates found — cannot seed sessions.");
        return;
    }
    const randomTemplate = () => templates[Math.floor(Math.random() * templates.length)];
    for (const client of clients) {
        // 1. Booking
        const booking = await prisma.booking.create({
            data: {
                clientId: client.id,
                date: new Date(Date.now() + 86400000), // tomorrow
                status: "scheduled",
            },
        });
        // 2. TrainingSession (linked 1:1 to booking)
        const session = await prisma.trainingSession.create({
            data: {
                bookingId: booking.id,
                title: `${client.name}'s Auto Session`,
                notes: "Generated from seed script.",
            },
        });
        // 3. Add 3 exercises to session
        for (let i = 0; i < 3; i++) {
            const template = randomTemplate();
            await prisma.trainingSessionExercise.create({
                data: {
                    sessionId: session.id,
                    templateId: template.id,
                    sets: 3 + i,
                    reps: i === 0 ? "10" : i === 1 ? "8" : "12",
                    rest: "90s",
                },
            });
        }
    }
    console.log("🏋️ TrainingSessions & SessionExercises seeded");
}
// ───────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────
async function main() {
    console.log("🌱 Starting full database seed…");
    await seedExerciseTemplates();
    await seedClients();
    await seedTrainingData();
    console.log("🌍 FULL SEED COMPLETE");
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
});
