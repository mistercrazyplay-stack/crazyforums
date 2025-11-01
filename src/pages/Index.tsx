import { useState, useEffect } from "react";
import { Form } from "@/types/form";
import FormBuilder from "@/components/FormBuilder";
import FormPreview from "@/components/FormPreview";

const Index = () => {
  const [form, setForm] = useState<Form>({
    id: 'form-1',
    title: '',
    description: '',
    questions: [],
    style: {
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      primaryColor: '#3b82f6',
      borderRadius: '8px',
      spacing: '1.5rem',
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const savedForm = localStorage.getItem('discord-form');
    if (savedForm) {
      try {
        setForm(JSON.parse(savedForm));
      } catch (error) {
        console.error('Failed to load saved form:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('discord-form', JSON.stringify(form));
  }, [form]);

  if (showPreview) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            חזור לעריכה
          </button>
        </div>
        <FormPreview form={form} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <FormBuilder
          form={form}
          onFormChange={setForm}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
        />
      </div>
    </div>
  );
};

export default Index;
