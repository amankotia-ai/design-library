// Keep an explicitly selected concurrent panel while its observed interval still applies.
export function referenceBeatAtTime(beats, selectedIndex, time, duration=Infinity) {
 if (!Number.isFinite(time)) return selectedIndex;
 const contains=beat=>time>=beat.start-0.00001&&(time<beat.end||(Math.abs(time-duration)<0.00001&&Math.abs(beat.end-duration)<0.001));
 if (beats[selectedIndex]&&contains(beats[selectedIndex])) return selectedIndex;
 return beats.findIndex(contains);
}
