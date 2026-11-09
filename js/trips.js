(() => {
  const store=()=>Store.get();
  function status(trip){const now=new Date();now.setHours(0,0,0,0);const start=new Date(trip.startDate+'T00:00:00'),end=new Date(trip.endDate+'T23:59:59');return now<start?'upcoming':now>end?'completed':'ongoing'}
  function spent(id){return store().expenses.filter(e=>e.tripId===id).reduce((s,e)=>s+Number(e.amount||0),0)}
  function upsert(data){const trips=store().trips;const item={...data,id:data.id||Store.uid(),budget:Number(data.budget),updatedAt:new Date().toISOString()};const i=trips.findIndex(t=>t.id===item.id);if(i>=0)trips[i]=item;else trips.unshift(item);Store.save();return item}
  function remove(id){const trip=store().trips.find(t=>t.id===id);if(!trip)return;const count=store().expenses.filter(e=>e.tripId===id).length;if(!confirm(`Delete “${trip.name}” and its ${count} related expense(s)? This cannot be undone.`))return false;store().trips=store().trips.filter(t=>t.id!==id);store().expenses=store().expenses.filter(e=>e.tripId!==id);Store.save();return true}
  window.Trips={status,spent,upsert,remove};
})();
