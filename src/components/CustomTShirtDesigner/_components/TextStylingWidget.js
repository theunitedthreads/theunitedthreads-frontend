import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ALargeSmall } from "lucide-react";

// Font Families (custom fonts are declared in globals.css)
const FONT_FAMILIES = [
  { key: 1, name: "Arial", value: "Arial" },
  { key: 2, name: "Helvetica", value: "Helvetica" },
  { key: 3, name: "Times New Roman", value: "Times New Roman" },
  { key: 4, name: "Courier", value: "Courier" },
  { key: 5, name: "Verdana", value: "Verdana" },
  { key: 6, name: "Georgia", value: "Georgia" },
  { key: 7, name: "Garamond", value: "Garamond" },
  // custom fonts
  { key: 8, name: "Pacifico", value: "Pacifico" },
  { key: 7, name: "Maxcellent", value: "Maxcellent" },
];

export default function TextStylingWidget({
  handleStyleChange,
  activeObject,
  ref,
}) {
  return (
    <div
      className={cn(
        "fixed bottom-2 z-20 mx-auto mt-5 flex w-3/4 items-center justify-center gap-x-16 rounded-xl bg-gray-200 px-6 py-2 transition-all duration-300 ease-in-out",
        activeObject?.type === "i-text"
          ? "translate-y-0 opacity-100"
          : "translate-y-[100vh] opacity-0",
      )}
      ref={ref}
    >
      <div className="w-full">
        <Label htmlFor="fontFamily">Text Style</Label>

        <Select
          id="fontFamily"
          onValueChange={(value) => handleStyleChange("fontFamily", value)}
          defaultValue={activeObject?.fontFamily || "Arial"}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select font family" />
          </SelectTrigger>
          <SelectContent>
            {FONT_FAMILIES.map((family) => (
              <SelectItem
                key={family.key}
                value={family.value}
                style={{ fontFamily: family.value }}
              >
                {family.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Label htmlFor="textAlign">Text Align</Label>
        <Select
          id="textAlign"
          onValueChange={(value) => handleStyleChange("textAlign", value)}
          defaultValue={activeObject?.textAlign || "left"}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Label htmlFor="fontSize">Text Size</Label>
        <Input
          id="fontSize"
          type="number"
          onChange={(e) => handleStyleChange("fontSize", e.target.value)}
          defaultValue={activeObject?.fontSize || 40}
          min={10}
          max={100}
        />
      </div>

      <div className="w-full">
        <Label id="textColor">Text Color</Label>
        <Input
          id="textColor"
          type="color"
          onChange={(e) => handleStyleChange("fill", e.target.value)}
          defaultValue={activeObject?.fill || "#000000"}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="fontWeight" className="flex-center-start gap-x-2">
          <Input
            id="fontWeight"
            type="checkbox"
            onChange={(e) =>
              handleStyleChange(
                "fontWeight",
                e.target.checked ? "bold" : "normal",
              )
            }
            className="h-4 w-4"
          />

          <span>Bold</span>
        </Label>
      </div>
    </div>
  );
}
