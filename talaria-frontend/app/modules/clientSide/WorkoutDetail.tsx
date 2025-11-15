import { useParams } from "react-router-dom";
import { workouts, exercises } from "@/data/mockData";

export default function WorkoutDetail() {
  const { id } = useParams();
  const workout = workouts.find((w) => w.id === Number(id));

  if (!workout)
    return <p className="text-gray-500">Workout not found.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{workout.title}</h2>
      <p className="text-sm text-gray-500">{new Date(workout.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-700 italic">{workout.notes}</p>

      <div className="grid gap-3">
        {workout.exercises.map((e) => {
          const ref = exercises.find((ex) => ex.id === e.id);
          return (
            <div key={e.id} className="border p-3 bg-white rounded shadow-sm">
              <h3 className="font-medium text-gray-800">{ref?.name}</h3>
              <p className="text-xs text-gray-500">
                {e.sets} sets × {e.reps} reps — Rest {e.rest}
              </p>
              <a
                href={ref?.video}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-xs hover:underline"
              >
                Watch Tutorial
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
