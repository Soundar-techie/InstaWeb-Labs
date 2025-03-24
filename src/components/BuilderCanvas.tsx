import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BuilderElement, useBuilderStore } from '../lib/store';
import { SortableElement } from './SortableElement';

export const BuilderCanvas: React.FC = () => {
  const elements = useBuilderStore((state) => state.elements);
  const { setNodeRef } = useDroppable({
    id: 'builder-canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 p-8 bg-white rounded-lg shadow-inner min-h-[600px]"
    >
      <SortableContext
        items={elements.map((el) => el.id)}
        strategy={verticalListSortingStrategy}
      >
        {elements.map((element) => (
          <SortableElement key={element.id} element={element} />
        ))}
      </SortableContext>
      
      {elements.length === 0 && (
        <div className="h-full flex items-center justify-center text-gray-400">
          Drag and drop elements here
        </div>
      )}
    </div>
  );
};