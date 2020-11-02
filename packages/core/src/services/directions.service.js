import { DIRECTION_TYPE } from "../keys";

export function isDirectionTypeNational(direction) {
  return direction.type === DIRECTION_TYPE.national;
}

export function isDirectionTypeRegional(direction) {
  return direction.type === DIRECTION_TYPE.regional;
}

export function isDirectionTypeDepartemental(direction) {
  return direction.type === DIRECTION_TYPE.departemental;
}
