(() => {
  const store=()=>Store.get();
  function upsert(data){const items=store().expenses;const item={...data,id:data.id||Store.uid(),amount:Number(data.amount),updatedAt:new Date().toISOString()};const i=items.findIndex(e=>e.id===item.id);if(i>=0)items[i]=item;else items.unshift(item);Store.save();return item}
  function remove(id){if(!confirm('Delete this expense? This cannot be undone.'))return false;store().expenses=store().expenses.filter(e=>e.id!==id);Store.save();return true}
  function total(list=store().expenses){return list.reduce((sum,e)=>sum+Number(e.amount||0),0)}
  window.Expenses={upsert,remove,total};
})();
