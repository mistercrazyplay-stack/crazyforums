export type QuestionType = 'text' | 'textarea' | 'multiple-choice' | 'checkbox';

export interface Option {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: Option[];
}

export interface FormStyle {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  borderRadius: string;
  spacing: string;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  style: FormStyle;
}
