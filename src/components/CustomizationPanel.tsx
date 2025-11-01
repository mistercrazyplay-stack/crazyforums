import { FormStyle } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

interface CustomizationPanelProps {
  style: FormStyle;
  onStyleChange: (style: FormStyle) => void;
}

const CustomizationPanel = ({ style, onStyleChange }: CustomizationPanelProps) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5" />
        <h3 className="font-semibold">עיצוב הטופס</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>צבע רקע</Label>
          <Input
            type="color"
            value={style.backgroundColor}
            onChange={(e) => onStyleChange({ ...style, backgroundColor: e.target.value })}
            className="h-10 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Label>צבע טקסט</Label>
          <Input
            type="color"
            value={style.textColor}
            onChange={(e) => onStyleChange({ ...style, textColor: e.target.value })}
            className="h-10 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Label>צבע ראשי</Label>
          <Input
            type="color"
            value={style.primaryColor}
            onChange={(e) => onStyleChange({ ...style, primaryColor: e.target.value })}
            className="h-10 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Label>עיגול פינות</Label>
          <Select 
            value={style.borderRadius} 
            onValueChange={(value) => onStyleChange({ ...style, borderRadius: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0px">ללא</SelectItem>
              <SelectItem value="4px">קטן</SelectItem>
              <SelectItem value="8px">בינוני</SelectItem>
              <SelectItem value="12px">גדול</SelectItem>
              <SelectItem value="16px">מאוד גדול</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>ריווח בין שאלות</Label>
          <Select 
            value={style.spacing} 
            onValueChange={(value) => onStyleChange({ ...style, spacing: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1rem">קטן</SelectItem>
              <SelectItem value="1.5rem">בינוני</SelectItem>
              <SelectItem value="2rem">גדול</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default CustomizationPanel;
