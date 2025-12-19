import { Form } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Sparkles } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ParticleNetwork from "./ParticleNetwork";
import StickyNav from "./StickyNav";
import { playHoverSound, playClickSound, playDeleteSound } from "@/lib/sounds";

interface FormsListProps {
  forms: Form[];
  onCreateNew: () => void;
  onEdit: (formId: string) => void;
  onDelete: (formId: string) => void;
  onPreview: (formId: string) => void;
}

const FormsList = ({ forms, onCreateNew, onEdit, onDelete, onPreview }: FormsListProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Neural Network Particle Background */}
      <ParticleNetwork />

      {/* Sticky Navigation */}
      <StickyNav onCreateNew={onCreateNew} />

      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto pt-32 pb-12 px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 stagger-children">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6 text-sm text-muted-foreground cursor-default"
            onMouseEnter={playHoverSound}
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-inter">בונה טפסים מתקדם</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 text-gradient">
            CrazyForms
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-inter font-light max-w-2xl mx-auto mb-8">
            צור טפסים מדהימים עם עיצוב עתידני ואפקטים מרהיבים
          </p>

          <Button 
            onClick={() => {
              playClickSound();
              onCreateNew();
            }}
            onMouseEnter={playHoverSound}
            className="btn-neon group"
            size="lg"
          >
            <Plus className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300" />
            <span>צור טופס חדש</span>
          </Button>
        </div>

        {/* Forms Grid */}
        {forms.length === 0 ? (
          <Card className="glass-card p-16 text-center glow-border fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="max-w-md mx-auto space-y-6">
              <div 
                className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto pulse-glow cursor-pointer hover:scale-110 transition-transform duration-300"
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  onCreateNew();
                }}
              >
                <Plus className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-orbitron font-semibold">אין טפסים עדיין</h2>
              <p className="text-muted-foreground font-inter font-light">
                צור את הטופס הראשון שלך והתחל לאסוף מידע בסטייל
              </p>
              <Button 
                onClick={() => {
                  playClickSound();
                  onCreateNew();
                }}
                onMouseEnter={playHoverSound}
                className="btn-neon mt-4"
              >
                <Plus className="w-5 h-5 ml-2" />
                צור טופס ראשון
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {forms.map((form, index) => (
              <Card 
                key={form.id} 
                className="glass-card p-6 space-y-4 group hover:scale-[1.02] transition-all duration-300 glow-border"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                onMouseEnter={playHoverSound}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-orbitron font-semibold line-clamp-1 group-hover:text-primary transition-colors" dir="auto">
                      {form.title || 'ללא כותרת'}
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                  </div>
                  
                  {form.description && (
                    <p className="text-sm text-muted-foreground font-inter font-light line-clamp-2" dir="auto">
                      {form.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-inter">
                    <div className="px-2 py-1 bg-primary/10 rounded-md text-primary">
                      {form.questions.length} שאלות
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      playClickSound();
                      onPreview(form.id);
                    }}
                    onMouseEnter={playHoverSound}
                    className="flex-1 bg-transparent border-border/50 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300 group/btn"
                  >
                    <Eye className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform" />
                    תצוגה
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      playClickSound();
                      onEdit(form.id);
                    }}
                    onMouseEnter={playHoverSound}
                    className="flex-1 btn-neon text-sm py-2 group/btn"
                  >
                    <Edit className="w-4 h-4 ml-2 group-hover/btn:rotate-12 transition-transform" />
                    עריכה
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onMouseEnter={playHoverSound}
                        onClick={playClickSound}
                        className="bg-transparent border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 text-destructive transition-all duration-300 group/btn"
                      >
                        <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="glass-card border-border/50">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-orbitron">מחיקת טופס</AlertDialogTitle>
                        <AlertDialogDescription className="font-inter">
                          האם אתה בטוח שברצונך למחוק את הטופס "{form.title || 'ללא כותרת'}"? 
                          פעולה זו לא ניתנת לביטול.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel 
                          className="font-inter"
                          onMouseEnter={playHoverSound}
                          onClick={playClickSound}
                        >
                          ביטול
                        </AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => {
                            playDeleteSound();
                            onDelete(form.id);
                          }}
                          onMouseEnter={playHoverSound}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          מחק
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 text-center fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-sm text-muted-foreground font-inter font-light">
            Built with <span className="text-primary animate-pulse">♥</span> by CrazyForms
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormsList;
