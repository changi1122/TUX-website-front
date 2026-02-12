export const REFERENCE_ROOM_CATEGORIES = [
  { label: '강의/스터디', value: 'study', color: 'rgb(254 226 226)' },
  { label: '시험정보', value: 'exam', color: 'rgb(243 232 255)' },
  { label: '갤러리', value: 'gallery', color: 'rgb(254 249 195)' },
];

const ALL_CATEGORY = { label: '전체 글', value: '', color: 'rgb(209 213 219)' };

export const REFERENCE_ROOM_ALL_CATEGORIES = [ALL_CATEGORY, ...REFERENCE_ROOM_CATEGORIES];

function toTuple(cat) {
  return [cat.label, cat.value, cat.color];
}

const EXAM_DEFAULT = toTuple(REFERENCE_ROOM_CATEGORIES[1]);

export function getDefaultReferenceRoomCategory(type) {
  const cat = REFERENCE_ROOM_CATEGORIES.find(c => c.value === type);
  return cat ? toTuple(cat) : toTuple(ALL_CATEGORY);
}

export function getDefaultReferenceRoomWriteCategory(type) {
  const cat = REFERENCE_ROOM_CATEGORIES.find(c => c.value === type);
  return cat ? toTuple(cat) : EXAM_DEFAULT;
}

export function toReferenceRoomCategory(type) {
  const cat = REFERENCE_ROOM_CATEGORIES.find(c => c.value === type?.toLowerCase());
  return cat ? toTuple(cat) : EXAM_DEFAULT;
}
