import { Switch } from "@/components/ui/switch";

export default function SharedToggle({
  shared,
  onChange,
}: {
  shared: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Share with Client</span>
      <Switch checked={shared} onCheckedChange={onChange} />
    </div>
  );
}
