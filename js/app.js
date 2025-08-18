// ---- Fragment loader ----
async function loadFragment(mountId, url) {
  const el = document.getElementById(mountId);
  const html = await fetch(url).then(r => r.text());
  el.innerHTML = html;
}

function refreshIcons(){ window.lucide && window.lucide.createIcons(); }

// ---- Simple Router ----
const Page = (title, content) => {
  const header = document.getElementById('pageHeader');
  const app = document.getElementById('app');
  header.innerHTML = `
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">${title}</h1>
      <div class="text-sm text-slate-500">Prototype</div>
    </div>`;
  app.innerHTML = content;
  refreshIcons();
};

const metricCard = (label, value, icon) => `
  <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft">
    <div class="flex items-center gap-3">
      <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <i data-lucide="${icon}"></i>
      </span>
      <div>
        <div class="text-xs text-slate-500">${label}</div>
        <div class="text-xl font-semibold">${value}</div>
      </div>
    </div>
  </div>`;

const placeholder = (intro, buttons = '') => `
  <div class="space-y-4">
    <p class="text-slate-600">${intro}</p>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="rounded-xl border border-slate-200 p-4 bg-slate-50">
        <h3 class="font-semibold mb-2">Quick actions</h3>
        <div class="flex flex-wrap gap-2">${buttons || `
          <button class="btn">Add</button>
          <button class="btn">Import CSV</button>
          <button class="btn">Export</button>`}
        </div>
      </div>
      <div class="rounded-xl border border-slate-200 p-4">
        <h3 class="font-semibold mb-2">Coming soon</h3>
        <ul class="list-disc ml-5 text-slate-600">
          <li>Filters, tables, and forms</li>
          <li>Role-based access</li>
          <li>API integration</li>
        </ul>
      </div>
    </div>
  </div>`;

const routes = {
  '#/dashboard': () => {
    const cards = `
      <div class="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
        ${metricCard('Total Assets', '1,248', 'boxes')}
        ${metricCard('Net Book Value', '$ 3,420,900', 'banknote')}
        ${metricCard('Due Maintenance', '37', 'wrench')}
        ${metricCard('Overdue Verifications', '12', 'scan-line')}
      </div>`;
    const charts = `
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div class="col-span-1 xl:col-span-2 bg-slate-50 rounded-xl p-4">
          <h3 class="font-semibold mb-3">Assets by Category</h3>
          <canvas id="chartCategories" height="120"></canvas>
        </div>
        <div class="bg-slate-50 rounded-xl p-4">
          <h3 class="font-semibold mb-3">Maintenance Due (Next 30 days)</h3>
          <canvas id="chartMaintenance" height="120"></canvas>
        </div>
      </div>`;
    Page('Dashboard', cards + charts);

    // charts
    const catCtx = document.getElementById('chartCategories');
    new Chart(catCtx, {
      type: 'bar',
      data: {
        labels: ['IT','Furniture','Vehicles','Buildings','Machinery'],
        datasets: [{ label: 'Assets', data: [420,310,70,12,436] }]
      },
      options: { plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} }
    });

    const maintCtx = document.getElementById('chartMaintenance');
    new Chart(maintCtx, {
      type: 'line',
      data: {
        labels: ['Week 1','Week 2','Week 3','Week 4'],
        datasets: [{ label: 'Tasks', data: [6,12,9,10], tension:.3 }]
      },
      options: { plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} }
    });
  },

  '#/assets/register': () => Page('Asset Register', placeholder('Browse and filter all assets.')),
  '#/assets/add': () => Page('Add Asset', `
    <form class="grid md:grid-cols-2 gap-4">
      ${textField('Asset Name')}
      ${textField('Asset Tag Number')}
      ${textField('Category')}
      ${textField('Model')}
      ${textField('Serial Number')}
      ${textField('Department')}
      ${textField('Location (Branch / Building / Room)')}
      ${textField('Acquisition Date', 'date')}
      ${textField('Acquisition Cost', 'number')}
      ${selectField('Depreciation Method', ['Straight-line','Reducing balance'])}
      ${textField('Useful Life (years)', 'number')}
      <div class="md:col-span-2">
        <button type="button" class="btn">Save (demo)</button>
      </div>
    </form>
  `),

  '#/maintenance': () => Page('Maintenance', placeholder('Plan work orders and schedules.')),
  '#/depreciation': () => Page('Depreciation', placeholder('Configure methods and post runs.')),
  '#/verification': () => Page('Verification', placeholder('Run physical verification sessions.')),
  '#/disposals': () => Page('Disposals', placeholder('Record asset disposals.')),
  '#/procurement': () => Page('Procurement', placeholder('Link suppliers, POs, invoices.')),
  '#/reports': () => Page('Reports', placeholder('NBV, aging, maintenance, exceptions.')),
  '#/admin': () => Page('Admin / Settings', placeholder('Roles, sequences, custom fields.')),

  // Lookups
  '#/lookups/categories': () => Page('Lookups — Categories & Classes', placeholder('CRUD for categories & classes.')),
  '#/lookups/conditions': () => Page('Lookups — Conditions', placeholder('CRUD for condition values.')),
  '#/lookups/statuses': () => Page('Lookups — Statuses', placeholder('CRUD for status values.')),
  '#/lookups/dep-methods': () => Page('Lookups — Depreciation Methods', placeholder('CRUD for depreciation methods.')),
  '#/lookups/branch': () => Page('Lookups — Branch / Site', placeholder('CRUD for branches/sites.')),
  '#/lookups/building': () => Page('Lookups — Building / Floor / Room', placeholder('CRUD for location hierarchy.')),
  '#/lookups/departments': () => Page('Lookups — Departments', placeholder('CRUD for departments.')),
  '#/lookups/cost-centers': () => Page('Lookups — Cost Centers / Projects', placeholder('CRUD for cost centers & projects.')),
  '#/lookups/funding': () => Page('Lookups — Funding Sources', placeholder('CRUD for funding sources.')),
  '#/lookups/suppliers': () => Page('Lookups — Suppliers', placeholder('CRUD for suppliers.')),
  '#/lookups/warranty': () => Page('Lookups — Warranty Types', placeholder('CRUD for warranty types.')),
  '#/lookups/disposal': () => Page('Lookups — Disposal Methods', placeholder('CRUD for disposal methods.')),
  '#/lookups/maint-types': () => Page('Lookups — Maintenance Types', placeholder('CRUD for maintenance types.')),
};

function textField(label, type='text'){
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  return `
    <label class="block">
      <span class="text-sm text-slate-600">${label}</span>
      <input type="${type}" id="${id}" class="mt-1 w-full rounded-xl border-slate-300 focus:border-primary focus:ring-primary" />
    </label>`;
}
function selectField(label, options){
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  return `
    <label class="block">
      <span class="text-sm text-slate-600">${label}</span>
      <select id="${id}" class="mt-1 w-full rounded-xl border-slate-300 focus:border-primary focus:ring-primary">
        ${options.map(o=>`<option>${o}</option>`).join('')}
      </select>
    </label>`;
}

function activateNav(route) {
  document.querySelectorAll('[data-route]').forEach(a => {
    const isActive = a.getAttribute('data-route') === route;
    a.classList.toggle('active', isActive);
  });
}

// ---- Boot ----
(async function init(){
  // load fragments
  await loadFragment('topbarMount', '../fragments/fragment-topbar.html');
  await loadFragment('sidebarMount', '../fragments/fragment-sidebar.html');
  await loadFragment('mainMount', '../fragments/fragment-main.html');
  await loadFragment('footerMount', '../fragments/fragment-footer.html');

  // footer year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // mobile sidebar toggle
  const toggleBtn = document.getElementById('sidebarToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const sb = document.getElementById('sidebar');
      sb.classList.toggle('hidden');
      sb.classList.toggle('absolute');
      sb.classList.toggle('z-50');
      sb.classList.toggle('top-16');
      sb.classList.toggle('left-0');
      sb.classList.toggle('right-0');
    });
  }

  // sidebar nav events (delegated)
  const sidebarNav = document.getElementById('sidebarNav');
  if (sidebarNav) {
    sidebarNav.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        location.hash = link.getAttribute('data-route');
        if (window.innerWidth < 1024) {
          document.getElementById('sidebar').classList.add('hidden');
        }
      }
    });
    // Improve <details> arrow rotation
    sidebarNav.querySelectorAll('details').forEach(d => {
      d.addEventListener('toggle', () => refreshIcons());
    });
  }

  // router
  function renderRoute() {
    const hash = location.hash || '#/dashboard';
    (routes[hash] || routes['#/dashboard'])();
    activateNav(hash);
  }
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
  refreshIcons();
})();
