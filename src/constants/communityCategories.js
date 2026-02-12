export const COMMUNITY_CATEGORIES = [
  { label: '공지사항', value: 'notice', color: 'rgb(220 252 231)' },
  { label: '팀원 모집', value: 'teamrecruitment', color: 'rgb(252 231 243)' },
  { label: '대회/공모전', value: 'contest', color: 'rgb(254 249 195)' },
  { label: '채용/취업', value: 'job', color: 'rgb(254 226 226)' },
  { label: '자유게시판', value: 'free', color: 'rgb(243 232 255)' },
];

const ALL_CATEGORY = { label: '전체 글', value: '', color: 'rgb(209 213 219)' };

export const COMMUNITY_ALL_CATEGORIES = [ALL_CATEGORY, ...COMMUNITY_CATEGORIES];

function toTuple(cat) {
  return [cat.label, cat.value, cat.color];
}

const FREE_DEFAULT = toTuple(COMMUNITY_CATEGORIES[4]);

export function getDefaultCommunityCategory(type) {
  const cat = COMMUNITY_CATEGORIES.find(c => c.value === type);
  return cat ? toTuple(cat) : toTuple(ALL_CATEGORY);
}

export function getDefaultCommunityWriteCategory(type) {
  const cat = COMMUNITY_CATEGORIES.find(c => c.value === type);
  return cat ? toTuple(cat) : FREE_DEFAULT;
}

export function toCommunityCategory(type) {
  const cat = COMMUNITY_CATEGORIES.find(c => c.value === type?.toLowerCase());
  return cat ? toTuple(cat) : FREE_DEFAULT;
}
