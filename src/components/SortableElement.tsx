import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BuilderElement, useBuilderStore } from '../lib/store';

interface SortableElementProps {
  element: BuilderElement;
}

export const SortableElement: React.FC<SortableElementProps> = ({ element }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const setSelectedElement = useBuilderStore((state) => state.setSelectedElement);
  const selectedElement = useBuilderStore((state) => state.selectedElement);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderElement = () => {
    switch (element.type) {
      case 'heading':
        return <h2 {...element.props}>{element.content}</h2>;
      case 'paragraph':
        return <p {...element.props}>{element.content}</p>;
      case 'button':
        return <button {...element.props}>{element.content}</button>;
      case 'image':
        return <img src={element.content} {...element.props} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group cursor-move p-2 rounded border-2 ${
        selectedElement?.id === element.id
          ? 'border-blue-500'
          : 'border-transparent hover:border-gray-200'
      }`}
      onClick={() => setSelectedElement(element)}
    >
      {renderElement()}
    </div>
  );
};