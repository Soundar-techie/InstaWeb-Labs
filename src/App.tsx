import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { BuilderToolbox } from './components/BuilderToolbox';
import { BuilderCanvas } from './components/BuilderCanvas';
import { ElementProperties } from './components/ElementProperties';
import { useBuilderStore } from './lib/store';

function App() {
  const {
    elements,
    addElement,
    reorderElements,
    setSelectedElement,
  } = useBuilderStore();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (!active.data.current?.isToolboxItem) {
      setSelectedElement(elements.find((el) => el.id === active.id) || null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle dropping a new element from the toolbox
    if (active.data.current?.isToolboxItem && over.id === 'builder-canvas') {
      addElement(active.data.current.type);
      return;
    }

    // Handle reordering existing elements
    const oldIndex = elements.findIndex((el) => el.id === active.id);
    const newIndex = elements.findIndex((el) => el.id === over.id);

    if (oldIndex !== newIndex) {
      reorderElements(arrayMove(elements, oldIndex, newIndex));
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Website Builder</h1>
          
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <BuilderToolbox />
            </div>
            
            <div className="col-span-6">
              <BuilderCanvas />
            </div>
            
            <div className="col-span-3">
              <ElementProperties />
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default App;