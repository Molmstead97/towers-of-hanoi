import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { discs } from "../assets/discs";
import Tower from "./Tower";

export default function Game() {
  const [moves, setMoves] = useState(0);
  const [towerState, setTowerState] = useState({
    t1: [...discs],
    t2: [],
    t3: [],
  });

  useEffect(() => {
    if (towerState.t3.length === discs.length) {
      toast.success(`You won! It only took you ${moves} moves. Great job!`);
    }
  }, [towerState, moves]);

  function handleDragEnd({ active, over }) {
    if (!over) return;

    const discId = active.id;
    const disc = discs.find((d) => d.id === discId);
    const targetTowerId = over.id;

    setTowerState((prev) => {
      const sourceTowerId = Object.keys(prev).find((towerId) =>
        prev[towerId].some((d) => d.id === discId)
      );

      if (!sourceTowerId) {
        console.error("Disc not found in any tower");
        return prev;
      }

      const targetTower = prev[targetTowerId];

      // Check if the move is valid (updated to use disc size)
      if (targetTower.length > 0 && disc.size > targetTower[targetTower.length - 1].size) {
        toast.error("Invalid move: You can't place a larger disc on top of a smaller one!");
        return prev;
      }
      
      if (towerState.t3.length === discs.length) {
        toast.success(`You won! It took you ${moves} moves!`);
      }

      const newTowers = { ...prev };
      const discIndex = newTowers[sourceTowerId].findIndex((d) => d.id === discId);
      const [movedDisc] = newTowers[sourceTowerId].splice(discIndex, 1);
      newTowers[targetTowerId].push(movedDisc);

      setMoves((prevMoves) => prevMoves + 1);

      return newTowers;
    });
  }

  return (
    <main>
      <DndContext onDragEnd={handleDragEnd}>
        <Tower towerId="t1" tower={towerState.t1} />
        <Tower towerId="t2" tower={towerState.t2} />
        <Tower towerId="t3" tower={towerState.t3} />
      </DndContext>
    </main>
  );
}
