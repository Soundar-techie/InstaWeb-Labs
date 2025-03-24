import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type ElementType = 'heading' | 'paragraph' | 'image' | 'button';

export interface BuilderElement {
  id: string;
  type: ElementType;
  content: string;
  props: {
    className?: string;
    style?: Record<string, string | number>;
    [key: string]: any;
  };
}

interface BuilderStore {
  elements: BuilderElement[];
  selectedElement: BuilderElement | null;
  addElement: (type: ElementType) => void;
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
  removeElement: (id: string) => void;
  setSelectedElement: (element: BuilderElement | null) => void;
  reorderElements: (elements: BuilderElement[]) => void;
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  elements: [],
  selectedElement: null,
  addElement: (type) =>
    set((state) => ({
      elements: [
        ...state.elements,
        {
          id: uuidv4(),
          type,
          content: getDefaultContent(type),
          props: getDefaultProps(type),
        },
      ],
    })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElement: state.selectedElement?.id === id ? null : state.selectedElement,
    })),
  setSelectedElement: (element) => set({ selectedElement: element }),
  reorderElements: (elements) => set({ elements }),
}));

function getDefaultContent(type: ElementType): string {
  switch (type) {
    case 'heading':
      return 'New Heading';
    case 'paragraph':
      return 'New paragraph text';
    case 'button':
      return 'Click me';
    case 'image':
      return 'https://via.placeholder.com/300x200';
    default:
      return '';
  }
}

function getDefaultProps(type: ElementType) {
  switch (type) {
    case 'heading':
      return {
        className: 'text-2xl font-bold mb-4',
        style: {},
      };
    case 'paragraph':
      return {
        className: 'text-base mb-4',
        style: {},
      };
    case 'button':
      return {
        className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
        style: {},
      };
    case 'image':
      return {
        className: 'max-w-full h-auto rounded',
        style: {},
        alt: 'Placeholder image',
      };
    default:
      return {};
  }
}