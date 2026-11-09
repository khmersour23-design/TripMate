(() => {
  const KEY='tripmate-data-v1';
  const defaults={trips:[],expenses:[],profile:{name:'Traveler',email:''},settings:{currency:'USD',theme:'light'}};
  function load(){try{const raw=localStorage.getItem(KEY);if(!raw)return structuredClone(defaults);const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=='object')throw Error('Invalid data');return {...structuredClone(defaults),...parsed,trips:Array.isArray(parsed.trips)?parsed.trips:[],expenses:Array.isArray(parsed.expenses)?parsed.expenses:[],profile:{...defaults.profile,...(parsed.profile||{})},settings:{...defaults.settings,...(parsed.settings||{})}}}catch(e){console.warn('TripMate data could not be read. Starting safely with empty data.',e);return structuredClone(defaults)}}
  let state=load();
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch(e){console.error('Could not save TripMate data',e);window.TripMate?.toast('Storage is full or unavailable. Export a backup and free some space.','error');return false}}
  window.Store={get:()=>state,save,reset:()=>{state=structuredClone(defaults);save()},replace:data=>{state={...structuredClone(defaults),...data,trips:Array.isArray(data.trips)?data.trips:[],expenses:Array.isArray(data.expenses)?data.expenses:[],profile:{...defaults.profile,...(data.profile||{})},settings:{...defaults.settings,...(data.settings||{})}};save()},uid:()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2),defaults};
})();
