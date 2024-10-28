import { useDraggable } from '@dnd-kit/core';

export default function Disc({ id, image, isTopDisc, className }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: !isTopDisc,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <img
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`disc ${className}`}
            src={image}
            alt={"Disc"}
        />
    );
}
