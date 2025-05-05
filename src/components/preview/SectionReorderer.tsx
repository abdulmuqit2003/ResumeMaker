import React from 'react';
import { useResumeStore, SectionOrder } from '../../store/resumeStore';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  id: string;
  title: string;
  enabled: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, title, enabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 border mb-2 rounded-md ${
        enabled 
          ? 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700' 
          : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-500'
      }`}
    >
      <span className="text-sm font-medium">
        {title} {!enabled && '(Hidden)'}
      </span>
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
      >
        <GripVertical className="h-5 w-5" />
      </div>
    </div>
  );
};

export const SectionReorderer: React.FC = () => {
  const { sectionOrder, updateSectionOrder } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = sectionOrder.findIndex((section) => section.id === active.id);
      const newIndex = sectionOrder.findIndex((section) => section.id === over.id);
      
      const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
      updateSectionOrder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sectionOrder.map((section) => section.id)}
        strategy={verticalListSortingStrategy}
      >
        {sectionOrder.map((section) => (
          <SortableItem 
            key={section.id} 
            id={section.id} 
            title={section.title} 
            enabled={section.enabled} 
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};