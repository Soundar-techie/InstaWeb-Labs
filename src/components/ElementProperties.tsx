import React from 'react';
import { useForm } from 'react-hook-form';
import { useBuilderStore, BuilderElement } from '../lib/store';

export const ElementProperties: React.FC = () => {
  const selectedElement = useBuilderStore((state) => state.selectedElement);
  const updateElement = useBuilderStore((state) => state.updateElement);
  const removeElement = useBuilderStore((state) => state.removeElement);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: selectedElement || {},
  });

  React.useEffect(() => {
    reset(selectedElement || {});
  }, [selectedElement, reset]);

  if (!selectedElement) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select an element to edit its properties</p>
      </div>
    );
  }

  const onSubmit = (data: Partial<BuilderElement>) => {
    if (selectedElement) {
      updateElement(selectedElement.id, data);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <form onChange={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <input
            {...register('content')}
            className="w-full p-2 border rounded"
            type="text"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Class Name</label>
          <input
            {...register('props.className')}
            className="w-full p-2 border rounded"
            type="text"
          />
        </div>

        {selectedElement.type === 'image' && (
          <div>
            <label className="block text-sm font-medium mb-1">Alt Text</label>
            <input
              {...register('props.alt')}
              className="w-full p-2 border rounded"
              type="text"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => removeElement(selectedElement.id)}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove Element
        </button>
      </form>
    </div>
  );
};