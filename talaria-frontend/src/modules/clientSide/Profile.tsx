import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function Profile() {
  const [form, setForm] = useState({
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    goal: "Lose fat and improve stamina",
    weight: "63 kg",
    height: "165 cm",
    joined: "2024-01-15",
    trainer: "Nathan G.",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await new Promise((res) => setTimeout(res, 1000)); // mock save
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <p className="text-sm opacity-90 mt-1">
          Manage your account details and fitness goals
        </p>
      </section>

      {/* Profile Info Card */}
      <Card className="border shadow-sm bg-white">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
              <p className="text-xs text-gray-500">Update your basic account info</p>
            </div>
            {saved && (
              <span className="text-xs text-green-600 font-medium">
                ✓ Changes saved
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">Height</label>
              <input
                type="text"
                name="height"
                value={form.height}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">Weight</label>
              <input
                type="text"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-gray-600 font-medium">Goal</label>
              <textarea
                name="goal"
                value={form.goal}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={2}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trainer Info */}
      <Card className="border shadow-sm bg-white">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Assigned Trainer
          </h2>
          <p className="text-sm text-gray-600">
            You are currently being coached by <b>{form.trainer}</b>.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Joined on {new Date(form.joined).toLocaleDateString("en-GB")}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
