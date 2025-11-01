import { Form } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FormPreviewProps {
  form: Form;
}

const FormPreview = ({ form }: FormPreviewProps) => {
  const { style } = form;

  const getBackgroundStyle = () => {
    const baseStyle: React.CSSProperties = {
      color: style.textColor,
      transition: 'all 0.3s ease'
    };

    if (style.backgroundType === 'gradient' && style.gradientStart && style.gradientEnd) {
      return {
        ...baseStyle,
        backgroundImage: `linear-gradient(${style.gradientDirection || 'to bottom'}, ${style.gradientStart}, ${style.gradientEnd})`
      };
    } else if (style.backgroundType === 'image' && style.backgroundImage) {
      return {
        ...baseStyle,
        backgroundImage: `url(${style.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      };
    }
    
    return {
      ...baseStyle,
      backgroundColor: style.backgroundColor
    };
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={getBackgroundStyle()}
    >
      <div className="max-w-2xl mx-auto">
        <Card 
          className="p-8 space-y-6"
          style={{
            borderRadius: style.borderRadius,
            backgroundColor: 'hsl(var(--card))',
          }}
        >
          <div className="space-y-2" dir="auto">
            <h1 
              className="text-3xl font-bold"
              style={{ color: style.primaryColor }}
            >
              {form.title || 'כותרת הטופס'}
            </h1>
            {form.description && (
              <p className="text-muted-foreground">
                {form.description}
              </p>
            )}
          </div>

          <div className="space-y-6">
            {form.questions.map((question, index) => (
              <div 
                key={question.id} 
                className="space-y-3"
                style={{ marginBottom: style.spacing }}
                dir="auto"
              >
                <Label className="text-base font-medium">
                  {index + 1}. {question.title}
                  {question.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>

                {question.type === 'text' && (
                  <Input 
                    placeholder="תשובתך..." 
                    dir="auto"
                    style={{ borderRadius: style.borderRadius }}
                  />
                )}

                {question.type === 'textarea' && (
                  <Textarea 
                    placeholder="תשובתך..." 
                    rows={4}
                    dir="auto"
                    style={{ borderRadius: style.borderRadius }}
                  />
                )}

                {question.type === 'multiple-choice' && (
                  <RadioGroup>
                    {question.options?.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label 
                          htmlFor={option.id} 
                          className="cursor-pointer font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === 'checkbox' && (
                  <div className="space-y-3">
                    {question.options?.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <Checkbox id={option.id} />
                        <Label 
                          htmlFor={option.id} 
                          className="cursor-pointer font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {form.questions.length > 0 && (
            <Button 
              className="w-full"
              style={{ 
                backgroundColor: style.primaryColor,
                borderRadius: style.borderRadius 
              }}
            >
              שלח טופס
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FormPreview;
