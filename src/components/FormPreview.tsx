import { useState } from "react";
import { Form } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface FormPreviewProps {
  form: Form;
}

const FormPreview = ({ form }: FormPreviewProps) => {
  const { style } = form;
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required questions are answered
    const unansweredRequired = form.questions.filter(q => {
      if (!q.required) return false;
      
      const answer = answers[q.id];
      
      // Check if answer is empty, undefined, or null
      if (answer === undefined || answer === null || answer === '') return true;
      
      // For checkboxes, check if any option is selected
      if (q.type === 'checkbox' && (!answer || Object.keys(answer).length === 0)) return true;
      
      return false;
    });

    if (unansweredRequired.length > 0) {
      toast({
        title: "לא ניתן לשלוח טופס",
        description: "יש לענות על כל השאלות המסומנות כחובה (*)",
        variant: "destructive",
      });
      return;
    }

    // Form is valid
    toast({
      title: "הטופס נשלח בהצלחה!",
      description: "תודה על מילוי הטופס.",
    });
    
    // Reset form
    setAnswers({});
  };

  const getBackgroundStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      color: style.textColor,
      minHeight: '100vh',
      padding: '1.5rem',
      transition: 'all 0.3s ease'
    };

    // Gradient background
    if (style.backgroundType === 'gradient') {
      const startColor = style.gradientStart || '#3b82f6';
      const endColor = style.gradientEnd || '#8b5cf6';
      const direction = style.gradientDirection || 'to bottom';
      
      return {
        ...baseStyle,
        background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
        backgroundAttachment: 'fixed'
      };
    } 
    
    // Image background
    if (style.backgroundType === 'image' && style.backgroundImage) {
      return {
        ...baseStyle,
        backgroundImage: `url(${style.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      };
    }
    
    // Solid color background (default)
    return {
      ...baseStyle,
      backgroundColor: style.backgroundColor
    };
  };

  return (
    <div style={getBackgroundStyle()}>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <Card 
            className="p-8 space-y-6 shadow-xl"
            style={{
              borderRadius: style.borderRadius,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    style={{ borderRadius: style.borderRadius }}
                  />
                )}

                {question.type === 'number' && (
                  <Input 
                    type="number" 
                    placeholder="הזן מספר..." 
                    dir="auto"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    style={{ borderRadius: style.borderRadius }}
                  />
                )}

                {question.type === 'textarea' && (
                  <Textarea 
                    placeholder="תשובתך..." 
                    rows={4}
                    dir="auto"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    style={{ borderRadius: style.borderRadius }}
                  />
                )}

                {question.type === 'multiple-choice' && (
                  <RadioGroup 
                    value={answers[question.id] || ''}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
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
                        <Checkbox 
                          id={option.id}
                          checked={answers[question.id]?.[option.id] || false}
                          onCheckedChange={(checked) => {
                            const currentAnswers = answers[question.id] || {};
                            handleAnswerChange(question.id, {
                              ...currentAnswers,
                              [option.id]: checked
                            });
                          }}
                        />
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
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default FormPreview;
