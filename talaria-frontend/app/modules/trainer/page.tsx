// import { Card, CardContent } from "@/components/ui/card";
// import { Dumbbell, Users, ClipboardList, Calendar } from "lucide-react";
// import { workouts, clients } from "@/data/mockData";
// import TrainerLayout from "./TrainerLayout";
 
// export default function TrainerDashboard() {
//   const totalClients = clients.length;
//   const totalWorkouts = workouts.length;
//   const sharedWorkouts = workouts.filter((w) => w.shared).length;
//   const upcomingSessions = [
//     { client: "Alice Johnson", time: "Mon 9:00 AM", type: "Upper Body A" },
//     { client: "Ben Carter", time: "Tue 2:00 PM", type: "Leg Power" },
//     { client: "Chloe Smith", time: "Thu 5:30 PM", type: "Cardio Endurance" },
//   ];

//   return (
//     <TrainerLayout>
//     <div className="space-y-8">
//       {/* ===== Header ===== */}
//       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-sm">
//         <h1 className="text-2xl font-semibold">Trainer Dashboard</h1>
//         <p className="text-sm opacity-90 mt-1">
//           Overview of your clients, workouts, and schedule.
//         </p>
//       </section>

//       {/* ===== Summary Cards ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card className="bg-white shadow-sm border hover:shadow-md transition">
//           <CardContent className="p-5 flex items-center gap-4">
//             <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
//               <Users size={22} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Clients</p>
//               <h2 className="text-2xl font-semibold text-gray-800">{totalClients}</h2>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-white shadow-sm border hover:shadow-md transition">
//           <CardContent className="p-5 flex items-center gap-4">
//             <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
//               <Dumbbell size={22} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Workouts</p>
//               <h2 className="text-2xl font-semibold text-gray-800">{totalWorkouts}</h2>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-white shadow-sm border hover:shadow-md transition">
//           <CardContent className="p-5 flex items-center gap-4">
//             <div className="bg-green-100 text-green-600 p-3 rounded-lg">
//               <ClipboardList size={22} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Shared Templates</p>
//               <h2 className="text-2xl font-semibold text-gray-800">{sharedWorkouts}</h2>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-white shadow-sm border hover:shadow-md transition">
//           <CardContent className="p-5 flex items-center gap-4">
//             <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
//               <Calendar size={22} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">This Week</p>
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 {upcomingSessions.length}
//               </h2>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* ===== Recent Workouts ===== */}
//       <section>
//         <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Workouts</h2>
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {workouts.slice(0, 3).map((w) => (
//             <Card key={w.id} className="border shadow-sm bg-white hover:shadow-md transition">
//               <CardContent className="p-4">
//                 <h3 className="font-medium text-gray-800">{w.title}</h3>
//                 <p className="text-xs text-gray-500 mb-2">
//                   {new Date(w.date).toLocaleDateString()} —{" "}
//                   {w.shared ? "Shared" : "Private"}
//                 </p>
//                 <ul className="text-xs text-gray-600 list-disc ml-4">
//                   {w.exercises.slice(0, 3).map((ex) => (
//                     <li key={ex.id}>
//                       Exercise #{ex.id} ({ex.sets}x{ex.reps})
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* ===== Upcoming Schedule ===== */}
//       <section>
//         <h2 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Sessions</h2>
//         <Card className="border bg-white shadow-sm">
//           <CardContent className="p-4">
//             <table className="w-full text-sm text-gray-700">
//               <thead className="border-b text-gray-500 text-xs uppercase">
//                 <tr>
//                   <th className="text-left py-2">Client</th>
//                   <th className="text-left py-2">Workout</th>
//                   <th className="text-left py-2">Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {upcomingSessions.map((s, i) => (
//                   <tr key={i} className="border-b last:border-0">
//                     <td className="py-2 font-medium">{s.client}</td>
//                     <td className="py-2">{s.type}</td>
//                     <td className="py-2 text-gray-500">{s.time}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>
//       </section>
//     </div>
//     </TrainerLayout>
//   );
// }
