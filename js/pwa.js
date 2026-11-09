(() => {
  let deferredPrompt=null;const installButtons=()=>[document.getElementById('installButton'),document.getElementById('settingsInstall')].filter(Boolean);
  function showInstall(){installButtons().forEach(b=>b.hidden=false)}
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event;showInstall();const help=document.getElementById('installHelp');if(help)help.textContent='Install TripMate on this device for an app-like experience.'});
  window.addEventListener('appinstalled',()=>{deferredPrompt=null;installButtons().forEach(b=>b.hidden=true);window.TripMate?.toast('TripMate was installed successfully.')});
  async function install(){if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;return}const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);window.TripMate?.toast(isIOS?'To install: tap Share in Safari, then choose “Add to Home Screen”.':'Use your browser menu and choose “Install app” or “Create shortcut”.')}
  installButtons().forEach(b=>b.addEventListener('click',install));
  function online(){const el=document.getElementById('connectionStatus');if(!el)return;el.classList.toggle('offline',!navigator.onLine);el.innerHTML=`<i></i> ${navigator.onLine?'Online':'Offline'}`}
  window.addEventListener('online',online);window.addEventListener('offline',online);online();
  if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1')){
    window.addEventListener('load',async()=>{try{const reg=await navigator.serviceWorker.register('./service-worker.js');const status=document.getElementById('swStatus');if(status)status.textContent='Offline support is active.';if(reg.waiting)updateNotice(reg.waiting);reg.addEventListener('updatefound',()=>{const worker=reg.installing;if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)updateNotice(worker)})})}catch(err){console.error('Service worker registration failed',err);const status=document.getElementById('swStatus');if(status)status.textContent='Offline support could not be enabled on this host.'}})
  }else{const status=document.getElementById('swStatus');if(status)status.textContent='Serve on HTTPS or localhost to enable offline support.'}
  function updateNotice(worker){if(confirm('A new TripMate update is ready. Reload now to use it?')){worker.postMessage({type:'SKIP_WAITING'});window.location.reload()}}
})();
