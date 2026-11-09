(() => {
  function apply(){const theme=Store.get().settings.theme==='dark'?'dark':'light';document.documentElement.dataset.theme=theme;const sel=document.getElementById('themeSetting');if(sel)sel.value=theme;const cur=document.getElementById('currencySetting');if(cur)cur.value=Store.get().settings.currency||'USD';document.getElementById('themeToggle').textContent=theme==='dark'?'☀':'☾'}
  function setCurrency(v){Store.get().settings.currency=v;Store.save()}
  function setTheme(v){Store.get().settings.theme=v;Store.save();apply()}
  function money(n){const currency=Store.get().settings.currency||'USD';try{return new Intl.NumberFormat(undefined,{style:'currency',currency,maximumFractionDigits:currency==='KHR'?0:2}).format(Number(n)||0)}catch{return `${currency} ${(Number(n)||0).toFixed(2)}`}}
  function download(name,content,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
  function backup(){download('tripmate-backup-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(Store.get(),null,2),'application/json')}
  async function restore(file){const parsed=JSON.parse(await file.text());if(!parsed||!Array.isArray(parsed.trips)||!Array.isArray(parsed.expenses))throw Error('This file is not a valid TripMate backup.');if(!confirm('Restore this backup? It will replace the data currently stored in this browser.'))return false;Store.replace(parsed);return true}
  function csv(){const rows=[['Expense','Amount','Currency','Category','Date','Trip','Description']];Store.get().expenses.forEach(e=>{const trip=Store.get().trips.find(t=>t.id===e.tripId);rows.push([e.name,e.amount,Store.get().settings.currency,e.category,e.date,trip?.name||'',e.description||''])});const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');download('tripmate-expenses.csv','\ufeff'+csv,'text/csv;charset=utf-8')}
  window.AppSettings={apply,setCurrency,setTheme,money,backup,restore,csv,download};window.formatMoney=money;
})();
