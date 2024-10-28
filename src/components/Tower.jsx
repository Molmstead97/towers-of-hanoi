import { useDroppable } from '@dnd-kit/core';
import Disc from "./Disc";

export default function Tower({ tower, towerId }) {
  const { setNodeRef } = useDroppable({
    id: towerId,
  });

  // Reverse the tower array for display purposes
  const displayTower = [...tower].reverse();

  return (
    <section className="tower" ref={setNodeRef}>
      <div className="towerStructure">
        <div className="vertical"></div>
        <div className="horizontal"></div>
      </div>
      <div className="discs">
        {displayTower.map((disc, index) => (
          <Disc 
            key={disc.id} 
            {...disc} 
            isTopDisc={index === 0} // Changed because we reversed the array
          />
        ))}
      </div>
    </section>
  );
}
