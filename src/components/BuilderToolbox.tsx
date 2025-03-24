import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ElementType } from '../lib/store';
import { Image, Type, Type as TypeH1, Square } from 'lucide-react';

interface ToolboxItemProps {
  type: ElementType;
  icon: React.ReactNode;
  label: string;
}

const ToolboxItem: React.FC<ToolboxItemProps> = ({ type, icon, label }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `toolbox-${type}`,
    data: {
      type,
      isToolboxItem: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 p-3 bg-white rounded-lg shadow cursor-move hover:bg-gray-50 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export const BuilderToolbox: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <div className="space-y-2">
        <ToolboxItem type="heading" icon={<TypeH1 className="w-5 h-5" />} label="Heading" />
        <ToolboxItem type="paragraph" icon={<Type className="w-5 h-5" />} label="Paragraph" />
        <ToolboxItem type="image" icon={<Image className="w-5 h-5" />} label="Image" />
        <ToolboxItem type="button" icon={<Square className="w-5 h-5" />} label="Button" />
      </div>
    </div>
  );
};