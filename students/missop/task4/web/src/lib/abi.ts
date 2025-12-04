export const VIBE_ABI = [
  { "type":"function","name":"claim","stateMutability":"nonpayable","inputs":[],"outputs":[] },
  { "type":"function","name":"transfer","stateMutability":"nonpayable","inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"type":"bool"}]},
  { "type":"function","name":"decimals","stateMutability":"view","inputs":[],"outputs":[{"type":"uint8"}]},
  { "type":"function","name":"symbol","stateMutability":"view","inputs":[],"outputs":[{"type":"string"}]},
  { "type":"function","name":"name","stateMutability":"view","inputs":[],"outputs":[{"type":"string"}]}
] as const;
