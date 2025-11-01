import { FormStyle } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <Tabs 
        value={style.backgroundType} 
        onValueChange={(value) => onStyleChange({ ...style, backgroundType: value as 'solid' | 'gradient' | 'image' })}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="solid">צבע אחיד</TabsTrigger>
          <TabsTrigger value="gradient">מעבר צבעים</TabsTrigger>
          <TabsTrigger value="image">תמונת רקע</TabsTrigger>
        </TabsList>

        <TabsContent value="solid" className="space-y-4">
          <div className="space-y-2">
            <Label>צבע רקע</Label>
            <Input
              type="color"
              value={style.backgroundColor}
              onChange={(e) => onStyleChange({ ...style, backgroundColor: e.target.value, backgroundType: 'solid' })}
              className="h-10 cursor-pointer"
            />
          </div>
        </TabsContent>

        <TabsContent value="gradient" className="space-y-4">
          <div className="space-y-2">
            <Label>צבע התחלה</Label>
            <Input
              type="color"
              value={style.gradientStart || '#3b82f6'}
              onChange={(e) => onStyleChange({ ...style, gradientStart: e.target.value, backgroundType: 'gradient' })}
              className="h-10 cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <Label>צבע סיום</Label>
            <Input
              type="color"
              value={style.gradientEnd || '#8b5cf6'}
              onChange={(e) => onStyleChange({ ...style, gradientEnd: e.target.value, backgroundType: 'gradient' })}
              className="h-10 cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <Label>כיוון המעבר</Label>
            <Select 
              value={style.gradientDirection || 'to bottom'} 
              onValueChange={(value) => onStyleChange({ ...style, gradientDirection: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to bottom">למטה</SelectItem>
                <SelectItem value="to top">למעלה</SelectItem>
                <SelectItem value="to right">ימינה</SelectItem>
                <SelectItem value="to left">שמאלה</SelectItem>
                <SelectItem value="to bottom right">אלכסון ימינה למטה</SelectItem>
                <SelectItem value="to bottom left">אלכסון שמאלה למטה</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          <div className="space-y-2">
            <Label>כתובת תמונה (URL)</Label>
            <Input
              type="url"
              value={style.backgroundImage || ''}
              onChange={(e) => onStyleChange({ ...style, backgroundImage: e.target.value, backgroundType: e.target.value ? 'image' : 'solid' })}
              placeholder="https://example.com/image.jpg"
              dir="ltr"
            />
            <p className="text-xs text-muted-foreground">
              הדבק קישור לתמונה מהאינטרנט
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
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
