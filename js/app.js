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
  <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft hover:shadow-md group">
    <div class="flex items-center gap-4">
      <span class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15">
        <i data-lucide="${icon}" class="w-6 h-6"></i>
      </span>
      <div>
        <div class="text-sm font-medium text-slate-500 mb-1">${label}</div>
        <div class="text-2xl font-bold text-slate-800 group-hover:text-primary">${value}</div>
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
        ${metricCard('Due for Service', '37', 'wrench')}
        ${metricCard('Overdue Verifications', '12', 'scan-line')}
      </div>`;
      
    const quickActions = `
      <div class="mt-6 bg-white rounded-2xl border border-slate-200 p-4 shadow-soft">
        <h3 class="font-semibold mb-3 text-primary-800">Quick Actions</h3>
        <div class="flex flex-wrap gap-2">
          <a href="#/assets/add" class="btn-primary">
            <i data-lucide="plus" class="w-4 h-4 mr-1"></i> Add Asset
          </a>
          <a href="#/assets/register" class="btn">
            <i data-lucide="list" class="w-4 h-4 mr-1"></i> View Register
          </a>
          <a href="#/verification" class="btn">
            <i data-lucide="scan-line" class="w-4 h-4 mr-1"></i> Start Verification
          </a>
          <a href="#/maintenance" class="btn">
            <i data-lucide="wrench" class="w-4 h-4 mr-1"></i> Schedule Maintenance
          </a>
          <a href="#/reports" class="btn">
            <i data-lucide="file-text" class="w-4 h-4 mr-1"></i> Run Reports
          </a>
        </div>
      </div>`;
      
    const charts = `
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div class="col-span-1 xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-soft">
          <h3 class="font-semibold mb-3 text-primary-800">Assets by Category</h3>
          <canvas id="chartCategories" height="120"></canvas>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft">
          <h3 class="font-semibold mb-3 text-primary-800">Maintenance Due (Next 30 days)</h3>
          <canvas id="chartMaintenance" height="120"></canvas>
        </div>
      </div>`;
      
    const locationChart = `
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft">
          <h3 class="font-semibold mb-3 text-primary-800">Assets by Location</h3>
          <canvas id="chartLocations" height="120"></canvas>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft">
          <h3 class="font-semibold mb-3 text-primary-800">Assets by Condition</h3>
          <canvas id="chartConditions" height="120"></canvas>
        </div>
      </div>`;
      
    const recentActivity = `
      <div class="mt-6 bg-white rounded-2xl border border-slate-200 p-4 shadow-soft">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-primary-800">Recent Activity</h3>
          <a href="#" class="text-sm text-primary hover:underline">View All</a>
        </div>
        <div class="space-y-3">
          <div class="flex items-start gap-3 pb-3 border-b border-slate-100">
            <div class="bg-green-50 text-green-700 p-2 rounded-lg">
              <i data-lucide="plus-circle" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="font-medium">New Asset Added</div>
              <div class="text-sm text-slate-500">Dell Latitude 7420 added to IT Equipment</div>
              <div class="text-xs text-slate-400 mt-1">Today, 10:30 AM</div>
            </div>
          </div>
          <div class="flex items-start gap-3 pb-3 border-b border-slate-100">
            <div class="bg-blue-50 text-blue-700 p-2 rounded-lg">
              <i data-lucide="refresh-cw" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="font-medium">Maintenance Completed</div>
              <div class="text-sm text-slate-500">Scheduled maintenance for Printer HP LaserJet completed</div>
              <div class="text-xs text-slate-400 mt-1">Yesterday, 2:15 PM</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="bg-amber-50 text-amber-700 p-2 rounded-lg">
              <i data-lucide="user-check" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="font-medium">Asset Assigned</div>
              <div class="text-sm text-slate-500">iPhone 13 Pro assigned to Sarah Johnson</div>
              <div class="text-xs text-slate-400 mt-1">Aug 16, 9:45 AM</div>
            </div>
          </div>
        </div>
      </div>`;
      
    Page('Dashboard', cards + quickActions + charts + locationChart + recentActivity);

    // Category chart
    const catCtx = document.getElementById('chartCategories');
    new Chart(catCtx, {
      type: 'bar',
      data: {
        labels: ['IT Equipment','Furniture','Vehicles','Buildings','Machinery'],
        datasets: [{ 
          label: 'Assets', 
          data: [420,310,70,12,436],
          backgroundColor: [
            'rgba(182, 10, 28, 0.85)',
            'rgba(182, 10, 28, 0.7)',
            'rgba(182, 10, 28, 0.55)',
            'rgba(182, 10, 28, 0.4)',
            'rgba(182, 10, 28, 0.25)'
          ],
          borderRadius: 6,
          borderWidth: 0,
          hoverBackgroundColor: [
            'rgba(182, 10, 28, 0.95)',
            'rgba(182, 10, 28, 0.8)',
            'rgba(182, 10, 28, 0.65)',
            'rgba(182, 10, 28, 0.5)',
            'rgba(182, 10, 28, 0.35)'
          ],
          barThickness: 24,
          maxBarThickness: 30
        }]
      },
      options: { 
        plugins: {
          legend: {display: false},
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#334155',
            bodyColor: '#334155',
            bodyFont: {
              size: 14
            },
            padding: 12,
            boxWidth: 10,
            boxHeight: 10,
            boxPadding: 3,
            usePointStyle: true,
            borderColor: 'rgba(226, 232, 240, 1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            caretSize: 6
          }
        }, 
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(226, 232, 240, 0.5)',
              drawBorder: false
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#64748b'
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#64748b'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    });

    // Maintenance chart
    const maintCtx = document.getElementById('chartMaintenance');
    new Chart(maintCtx, {
      type: 'line',
      data: {
        labels: ['Week 1','Week 2','Week 3','Week 4'],
        datasets: [{ 
          label: 'Tasks', 
          data: [6,12,9,10], 
          tension: 0.4,
          borderColor: 'rgba(182, 10, 28, 1)',
          backgroundColor: 'rgba(182, 10, 28, 0.1)',
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(255, 255, 255, 1)',
          pointBorderColor: 'rgba(182, 10, 28, 1)',
          pointBorderWidth: 2,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
          pointHoverBorderColor: 'rgba(182, 10, 28, 1)',
          pointHoverBorderWidth: 3,
          fill: true
        }]
      },
      options: { 
        plugins: {
          legend: {display: false},
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#334155',
            bodyColor: '#334155',
            bodyFont: {
              size: 14
            },
            padding: 12,
            boxWidth: 10,
            boxHeight: 10,
            boxPadding: 3,
            usePointStyle: true,
            borderColor: 'rgba(226, 232, 240, 1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            caretSize: 6
          }
        }, 
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(226, 232, 240, 0.5)',
              drawBorder: false
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#64748b',
              padding: 8
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#64748b',
              padding: 8
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1200,
          easing: 'easeOutQuart'
        }
      }
    });
    
    // Location chart
    const locCtx = document.getElementById('chartLocations');
    new Chart(locCtx, {
      type: 'doughnut',
      data: {
        labels: ['Headquarters', 'Branch Office 1', 'Branch Office 2', 'Warehouse'],
        datasets: [{ 
          data: [540, 320, 180, 208],
          backgroundColor: [
            'rgba(182, 10, 28, 0.85)',
            'rgba(182, 10, 28, 0.65)',
            'rgba(182, 10, 28, 0.45)',
            'rgba(182, 10, 28, 0.25)'
          ],
          borderWidth: 2,
          borderColor: 'white',
          hoverBackgroundColor: [
            'rgba(182, 10, 28, 0.95)',
            'rgba(182, 10, 28, 0.75)',
            'rgba(182, 10, 28, 0.55)',
            'rgba(182, 10, 28, 0.35)'
          ],
          hoverBorderWidth: 3,
          hoverOffset: 10
        }]
      },
      options: { 
        cutout: '65%',
        radius: '90%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 15,
              font: {
                size: 12
              },
              color: '#334155'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#334155',
            bodyColor: '#334155',
            bodyFont: {
              size: 14
            },
            padding: 12,
            boxWidth: 10,
            boxHeight: 10,
            boxPadding: 3,
            usePointStyle: true,
            borderColor: 'rgba(226, 232, 240, 1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            caretSize: 6,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1200,
          easing: 'easeOutQuart'
        }
      }
    });
    
    // Condition chart
    const condCtx = document.getElementById('chartConditions');
    new Chart(condCtx, {
      type: 'pie',
      data: {
        labels: ['Excellent', 'Good', 'Fair', 'Poor'],
        datasets: [{ 
          data: [420, 580, 180, 68],
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderWidth: 2,
          borderColor: 'white',
          hoverBackgroundColor: [
            'rgba(16, 185, 129, 0.9)',
            'rgba(59, 130, 246, 0.9)',
            'rgba(245, 158, 11, 0.9)',
            'rgba(239, 68, 68, 0.9)'
          ],
          hoverBorderWidth: 3,
          hoverOffset: 10
        }]
      },
      options: { 
        radius: '90%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 15,
              font: {
                size: 12
              },
              color: '#334155'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#334155',
            bodyColor: '#334155',
            bodyFont: {
              size: 14
            },
            padding: 12,
            boxWidth: 10,
            boxHeight: 10,
            boxPadding: 3,
            usePointStyle: true,
            borderColor: 'rgba(226, 232, 240, 1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            caretSize: 6,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1200,
          easing: 'easeOutQuart'
        }
      }
    });
  },

  '#/assets/register': () => Page('Asset Register', `
    <div class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <button class="btn-primary">
            <i data-lucide="plus" class="w-4 h-4 mr-1"></i> Add Asset
          </button>
          <button class="btn">
            <i data-lucide="upload" class="w-4 h-4 mr-1"></i> Import
          </button>
          <button class="btn">
            <i data-lucide="download" class="w-4 h-4 mr-1"></i> Export
          </button>
          <div class="dropdown relative ml-1">
            <button class="btn">
              <i data-lucide="more-horizontal" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
        
        <div class="flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5">
          <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
          <input placeholder="Search assets..." class="outline-none text-sm w-56" />
        </div>
      </div>
      
      <div class="grid md:grid-cols-4 gap-4">
        <div class="md:col-span-1">
          <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-soft">
            <h3 class="font-semibold mb-4 text-primary-800 flex items-center gap-2">
              <i data-lucide="filter" class="w-4 h-4"></i>
              Smart Filters
            </h3>
            
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="layers" class="w-4 h-4 text-slate-500"></i>
                  Category
                </label>
                <div class="relative">
                  <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary pl-3 pr-8 py-2.5 appearance-none bg-white">
                    <option>All Categories</option>
                    <option>IT Equipment</option>
                    <option>Furniture</option>
                    <option>Vehicles</option>
                    <option>Buildings</option>
                    <option>Machinery</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-slate-500"></i>
                  Location
                </label>
                <div class="space-y-2 max-h-36 overflow-y-auto scrollbar-thin p-1 border border-slate-200 rounded-lg">
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Headquarters</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Branch Office 1</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Branch Office 2</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" />
                    <span class="ml-2 text-sm">Warehouse</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="users" class="w-4 h-4 text-slate-500"></i>
                  Department
                </label>
                <div class="relative">
                  <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary pl-3 pr-8 py-2.5 appearance-none bg-white">
                    <option>All Departments</option>
                    <option>IT</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>Operations</option>
                    <option>HR</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="activity" class="w-4 h-4 text-slate-500"></i>
                  Status
                </label>
                <div class="flex flex-wrap gap-2">
                  <label class="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary-50 cursor-pointer transition-colors duration-150">
                    <input type="radio" name="status" class="hidden" checked />
                    <span class="text-sm">All</span>
                  </label>
                  <label class="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary-50 cursor-pointer transition-colors duration-150">
                    <input type="radio" name="status" class="hidden" />
                    <span class="text-sm">Active</span>
                  </label>
                  <label class="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary-50 cursor-pointer transition-colors duration-150">
                    <input type="radio" name="status" class="hidden" />
                    <span class="text-sm">Maintenance</span>
                  </label>
                  <label class="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary-50 cursor-pointer transition-colors duration-150">
                    <input type="radio" name="status" class="hidden" />
                    <span class="text-sm">Disposed</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="thermometer" class="w-4 h-4 text-slate-500"></i>
                  Condition
                </label>
                <div class="relative">
                  <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary pl-3 pr-8 py-2.5 appearance-none bg-white">
                    <option>All Conditions</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Poor</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                  </div>
                </div>
              </div>
              
              <div class="pt-2 space-y-3">
                <button class="btn-primary w-full flex items-center justify-center gap-2">
                  <i data-lucide="filter" class="w-4 h-4"></i>
                  Apply Filters
                </button>
                <button class="btn w-full flex items-center justify-center gap-2">
                  <i data-lucide="x" class="w-4 h-4"></i>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:col-span-3">
          <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div class="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div class="font-medium">1,248 assets found</div>
              <div class="flex items-center gap-2">
                <div class="dropdown relative">
                  <button class="btn">
                    <i data-lucide="columns" class="w-4 h-4 mr-1"></i> Columns
                  </button>
                </div>
                <select class="rounded-lg border-slate-300 focus:border-primary focus:ring-primary text-sm">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                  <option>100 per page</option>
                </select>
              </div>
            </div>
            
            <div class="table-container">
              <table class="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th>
                      <div class="flex items-center">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                        <span>Asset Name</span>
                        <i data-lucide="arrow-up" class="w-4 h-4 ml-1 text-primary"></i>
                      </div>
                    </th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="transition-colors duration-150">
                    <td>
                      <div class="flex items-center">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                        <a href="#/assets/detail" class="text-primary hover:underline font-medium">Dell Latitude 7420</a>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                          <i data-lucide="monitor" class="w-3.5 h-3.5"></i>
                        </span>
                        <span>IT Equipment</span>
                      </div>
                    </td>
                    <td>Headquarters</td>
                    <td>IT Department</td>
                    <td>
                      <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                <tr class="transition-colors duration-150">
                    <td>
                      <div class="flex items-center">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                        <a href="#/assets/detail" class="text-primary hover:underline font-medium">iPhone 13 Pro</a>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                          <i data-lucide="smartphone" class="w-3.5 h-3.5"></i>
                        </span>
                        <span>IT Equipment</span>
                      </div>
                    </td>
                    <td>Branch Office 1</td>
                    <td>Marketing</td>
                    <td>
                      <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="transition-colors duration-150">
                    <td>
                      <div class="flex items-center">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                        <a href="#/assets/detail" class="text-primary hover:underline font-medium">Conference Table</a>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                          <i data-lucide="armchair" class="w-3.5 h-3.5"></i>
                        </span>
                        <span>Furniture</span>
                      </div>
                    </td>
                    <td>Headquarters</td>
                    <td>Operations</td>
                    <td>
                      <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
              </tbody>
            </table>
            
            <div class="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div class="text-sm text-slate-500">Showing 1-3 of 1,248 assets</div>
              <div class="flex items-center gap-1">
                <button class="p-2 rounded hover:bg-slate-200 disabled:opacity-50" disabled>
                  <i data-lucide="chevron-left" class="w-4 h-4"></i>
                </button>
                <button class="h-8 w-8 rounded bg-primary text-white flex items-center justify-center">1</button>
                <button class="h-8 w-8 rounded hover:bg-slate-200 flex items-center justify-center">2</button>
                <button class="h-8 w-8 rounded hover:bg-slate-200 flex items-center justify-center">3</button>
                <button class="p-2 rounded hover:bg-slate-200">
                  <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `),
  '#/assets/add': () => Page('Add Asset', `
    <form class="grid md:grid-cols-2 gap-4">
      <!-- 1. Core Identification -->
      <div class="md:col-span-2 mb-2 pb-2 border-b border-slate-200">
        <h3 class="font-semibold text-primary-700">1. Core Identification</h3>
      </div>
      ${textField('Asset ID')}
      ${textField('Asset Tag Number')}
      ${selectField('Asset Category', ['IT Equipment', 'Furniture', 'Vehicle', 'Building', 'Machinery', 'Other'])}
      ${textField('Asset Class / Type Code')}
      ${textField('Description')}
      ${textField('Brand / Manufacturer')}
      ${textField('Model')}
      ${textField('Serial Number')}
      ${selectField('Asset Condition', ['New', 'Good', 'Fair', 'Poor', 'Obsolete'])}
      ${selectField('Status', ['Active', 'In Use', 'In Store', 'Under Maintenance', 'Disposed'])}
      
      <!-- 2. Ownership & Responsibility -->
      <div class="md:col-span-2 mt-4 mb-2 pb-2 border-b border-slate-200">
        <h3 class="font-semibold text-primary-700">2. Ownership & Responsibility</h3>
      </div>
      ${selectField('Assigned Department', ['Finance', 'IT', 'Marketing', 'Operations', 'HR', 'Other'])}
      ${textField('Assigned To (Employee)')}
      ${textField('Cost Center / Project Code')}
      ${textField('Custodian Contact')}
      
      <!-- 3. Location Tracking -->
      <div class="md:col-span-2 mt-4 mb-2 pb-2 border-b border-slate-200">
        <h3 class="font-semibold text-primary-700">3. Location Tracking</h3>
      </div>
      ${selectField('Branch / Site', ['Kigali HQ', 'Regional Office', 'Warehouse', 'Other'])}
      ${textField('Building')}
      ${textField('Floor')}
      ${textField('Room / Office')}
      ${textField('GPS Coordinates')}
      
      <!-- 4. Procurement & Acquisition -->
      <div class="md:col-span-2 mt-4 mb-2 pb-2 border-b border-slate-200">
        <h3 class="font-semibold text-primary-700">4. Procurement & Acquisition</h3>
      </div>
      ${textField('Acquisition Date', 'date')}
      ${selectField('Acquisition Method', ['Purchase', 'Lease', 'Donation', 'Transfer'])}
      ${textField('Supplier / Vendor')}
      ${textField('Purchase Order No.')}
      ${textField('Invoice No.')}
      ${textField('Funding Source')}
      
      <!-- 5. Financial & Depreciation -->
      <div class="md:col-span-2 mt-4 mb-2 pb-2 border-b border-slate-200">
        <h3 class="font-semibold text-primary-700">5. Financial & Depreciation</h3>
      </div>
      ${textField('Acquisition Cost', 'number')}
      ${textField('Replacement Cost', 'number')}
      ${textField('Salvage Value', 'number')}
      ${textField('Useful Life (Years)', 'number')}
      ${selectField('Depreciation Method', ['Straight-line', 'Reducing balance'])}
      ${textField('Depreciation Rate (%)', 'number')}
      ${textField('Annual Depreciation', 'number')}
      ${textField('Accumulated Depreciation', 'number')}
      ${textField('Net Book Value', 'number')}
      ${textField('Revaluation History')}
      
      <!-- 6. Maintenance & Lifecycle -->
      <div class="md:col-span-2 mt-4 mb-2 pb-2 border-b border-slate-200">
        <h3 class="font-semibold text-primary-700">6. Maintenance & Lifecycle</h3>
      </div>
      ${textField('Warranty Expiry Date', 'date')}
      ${textField('Insurance Provider')}
      ${textField('Insurance Policy No.')}
      ${textField('Last Maintenance Date', 'date')}
      ${textField('Next Maintenance Due', 'date')}
      ${textField('Maintenance History')}
      ${textField('Disposal Date', 'date')}
      ${selectField('Disposal Method', ['Auction', 'Donation', 'Scrap', 'Other'])}
      ${textField('Disposal Value', 'number')}
      
      <!-- 7. System & Audit Trail -->
      <div class="md:col-span-2 mt-4 mb-2 pb-2 border-b border-slate-200">
        <h3 class="font-semibold text-primary-700">7. System & Audit Trail</h3>
      </div>
      ${textField('Created By')}
      ${textField('Created Date', 'date')}
      ${textField('Last Updated By')}
      ${textField('Last Updated Date', 'date')}
      ${selectField('Verification Status', ['Verified', 'Not Verified'])}
      <div class="md:col-span-2">
        <label class="block">
          <span class="text-sm text-slate-600">QR/Barcode Image</span>
          <div class="mt-1 border border-slate-300 rounded-xl p-4 text-center">
            <i data-lucide="qr-code" class="mx-auto h-24 w-24 text-slate-400"></i>
            <div class="mt-2 text-sm text-slate-500">QR code will be generated after saving</div>
          </div>
        </label>
      </div>
      
      <div class="md:col-span-2 mt-4">
        <button type="button" class="btn-primary">Save Asset</button>
        <button type="button" class="btn ml-2">Cancel</button>
      </div>
    </form>
  `),
  
  '#/assets/detail': () => Page('Asset Detail', `
    <div class="mb-6">
      <div class="flex flex-wrap items-center gap-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div class="flex items-center gap-3 bg-primary-50 px-4 py-3 rounded-xl shadow-sm flex-grow">
            <i data-lucide="box" class="text-primary w-6 h-6 flex-shrink-0"></i>
            <div>
              <div class="text-xs font-medium text-slate-500">Asset ID</div>
              <div class="text-lg font-bold">AST-2023-0042</div>
            </div>
          </div>
          <div class="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl shadow-sm flex-grow">
            <i data-lucide="scan" class="text-slate-500 w-6 h-6 flex-shrink-0"></i>
            <div>
              <div class="text-xs font-medium text-slate-500">QR Code</div>
              <div class="text-lg font-bold text-primary hover:underline cursor-pointer">View / Print</div>
            </div>
          </div>
        </div>
        <div class="flex-grow hidden sm:block"></div>
        <div class="flex gap-2 w-full sm:w-auto justify-end mt-3 sm:mt-0">
          <button class="btn flex items-center gap-2 flex-1 sm:flex-auto justify-center">
            <i data-lucide="printer" class="w-4 h-4"></i> <span>Print</span>
          </button>
          <button class="btn-primary flex items-center gap-2 flex-1 sm:flex-auto justify-center">
            <i data-lucide="edit" class="w-4 h-4"></i> <span>Edit</span>
          </button>
        </div>
      </div>
      
      <div class="border-b border-slate-200 mb-6 overflow-x-auto scrollbar-thin">
        <div class="flex -mb-px min-w-max">
          <button class="px-4 sm:px-5 py-3 border-b-2 border-primary font-medium text-primary flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <i data-lucide="layout-dashboard" class="w-4 h-4"></i> <span>Overview</span>
          </button>
          <button class="px-4 sm:px-5 py-3 border-b-2 border-transparent hover:text-primary hover:border-primary-100 transition-colors duration-150 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <i data-lucide="dollar-sign" class="w-4 h-4"></i> <span class="hidden sm:inline">Financials</span><span class="sm:hidden">Finance</span>
          </button>
          <button class="px-4 sm:px-5 py-3 border-b-2 border-transparent hover:text-primary hover:border-primary-100 transition-colors duration-150 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <i data-lucide="wrench" class="w-4 h-4"></i> <span class="hidden sm:inline">Maintenance</span><span class="sm:hidden">Maint.</span>
          </button>
          <button class="px-4 sm:px-5 py-3 border-b-2 border-transparent hover:text-primary hover:border-primary-100 transition-colors duration-150 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <i data-lucide="file-text" class="w-4 h-4"></i> <span>Docs</span>
          </button>
          <button class="px-4 sm:px-5 py-3 border-b-2 border-transparent hover:text-primary hover:border-primary-100 transition-colors duration-150 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <i data-lucide="history" class="w-4 h-4"></i> <span class="hidden sm:inline">Audit Trail</span><span class="sm:hidden">Audit</span>
          </button>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-semibold mb-4 text-primary-800 flex items-center gap-2">
            <i data-lucide="info" class="w-4 h-4"></i> Asset Information
          </h3>
          <div class="bg-white rounded-xl p-5 space-y-4 border border-slate-200 shadow-soft">
            <div class="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div class="h-16 w-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <i data-lucide="monitor" class="w-8 h-8"></i>
              </div>
              <div>
                <div class="text-sm text-slate-500">Asset Name</div>
                <div class="text-xl font-bold">Dell Latitude 7420</div>
                <div class="text-sm text-slate-500 mt-1">IT Equipment / Laptop</div>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-y-4">
              <div>
                <div class="text-sm font-medium text-slate-500">Serial Number</div>
                <div class="text-sm font-semibold">SN-4872-9281-4421</div>
              </div>
              
              <div>
                <div class="text-sm font-medium text-slate-500">Model</div>
                <div class="text-sm font-semibold">Latitude 7420</div>
              </div>
              
              <div>
                <div class="text-sm font-medium text-slate-500">Status</div>
                <div>
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Active
                  </span>
                </div>
              </div>
              
              <div>
                <div class="text-sm font-medium text-slate-500">Condition</div>
                <div>
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                    Good
                  </span>
                </div>
              </div>
              
              <div>
                <div class="text-sm font-medium text-slate-500">Purchase Date</div>
                <div class="text-sm font-semibold">Jan 15, 2023</div>
              </div>
              
              <div>
                <div class="text-sm font-medium text-slate-500">Warranty Until</div>
                <div class="text-sm font-semibold">Jan 15, 2026</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="font-semibold mb-4 text-primary-800 flex items-center gap-2">
            <i data-lucide="map-pin" class="w-4 h-4"></i> Location & Assignment
          </h3>
          <div class="bg-white rounded-xl p-5 space-y-4 border border-slate-200 shadow-soft">
            <div class="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div class="h-16 w-16 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <i data-lucide="building" class="w-8 h-8"></i>
              </div>
              <div>
                <div class="text-sm text-slate-500">Current Location</div>
                <div class="text-xl font-bold">Headquarters</div>
                <div class="text-sm text-slate-500 mt-1">Main Tower, 4th Floor</div>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-y-4">
              <div>
                <div class="text-sm font-medium text-slate-500">Room</div>
                <div class="text-sm font-semibold">Room 412</div>
              </div>
              
              <div>
                <div class="text-sm font-medium text-slate-500">Department</div>
                <div class="text-sm font-semibold">IT Department</div>
              </div>
              
              <div class="col-span-2 pt-2">
                <div class="text-sm font-medium text-slate-500 mb-2">Assigned To</div>
                <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold">
                    JS
                  </div>
                  <div>
                    <div class="font-semibold">John Smith</div>
                    <div class="text-sm text-slate-500">IT Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-6">
            <h3 class="font-semibold mb-4 text-primary-800 flex items-center gap-2">
              <i data-lucide="activity" class="w-4 h-4"></i> Recent Activity
            </h3>
            <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-soft">
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <div class="bg-blue-50 text-blue-700 p-2 rounded-lg">
                    <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="font-medium">Maintenance Completed</div>
                    <div class="text-xs text-slate-500 mt-1">Aug 10, 2023</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="bg-amber-50 text-amber-700 p-2 rounded-lg">
                    <i data-lucide="user-check" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="font-medium">Assigned to John Smith</div>
                    <div class="text-xs text-slate-500 mt-1">Jun 15, 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `),
  
  '#/assignments': () => Page('Assignments', `
    <div class="space-y-6">
      <p class="text-slate-600">Transfer assets between departments or employees and view assignment history.</p>
      
      <div class="bg-primary-50 rounded-xl p-4 border border-primary-100">
        <h3 class="font-semibold mb-3 text-primary-800">Transfer Wizard</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div>
            ${selectField('Asset', ['Select asset...', 'Dell Latitude 7420', 'iPhone 13 Pro', 'Projector Sony VPL'])}
          </div>
          <div>
            ${selectField('Transfer To', ['Select recipient...', 'IT Department', 'Marketing', 'John Smith', 'Sarah Johnson'])}
          </div>
          <div class="flex items-end">
            <button class="btn-primary">Start Transfer</button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="font-semibold mb-3">Recent Transfers</h3>
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Asset</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">From</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">To</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr>
                <td class="px-4 py-3 text-sm">Dell Latitude 7420</td>
                <td class="px-4 py-3 text-sm">IT Department</td>
                <td class="px-4 py-3 text-sm">John Smith</td>
                <td class="px-4 py-3 text-sm">2023-08-15</td>
                <td class="px-4 py-3 text-sm">
                  <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm">iPhone 13 Pro</td>
                <td class="px-4 py-3 text-sm">Sarah Johnson</td>
                <td class="px-4 py-3 text-sm">Marketing</td>
                <td class="px-4 py-3 text-sm">2023-08-10</td>
                <td class="px-4 py-3 text-sm">
                  <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `),

  '#/assets': () => Page('Assets Management', `
    <div class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <a href="#/assets/add" class="btn-primary">
            <i data-lucide="plus" class="w-4 h-4 mr-1"></i> Add Asset
          </a>
          <button class="btn" onclick="document.getElementById('importModal').classList.remove('hidden')">
            <i data-lucide="upload" class="w-4 h-4 mr-1"></i> Import
          </button>
          <button class="btn">
            <i data-lucide="download" class="w-4 h-4 mr-1"></i> Export
          </button>
          <div class="dropdown relative ml-1">
            <button class="btn">
              <i data-lucide="more-horizontal" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
        
        <div class="flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5">
          <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
          <input placeholder="Search assets..." class="outline-none text-sm w-56" />
        </div>
      </div>
      
      <!-- Status Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-slate-500">Total Assets</div>
              <div class="text-xl font-semibold">1,248</div>
            </div>
            <div class="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <i data-lucide="boxes"></i>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-slate-500">Active Assets</div>
              <div class="text-xl font-semibold">1,156</div>
            </div>
            <div class="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <i data-lucide="check-circle"></i>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-slate-500">In Maintenance</div>
              <div class="text-xl font-semibold">37</div>
            </div>
            <div class="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <i data-lucide="wrench"></i>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-slate-500">Disposed</div>
              <div class="text-xl font-semibold">55</div>
            </div>
            <div class="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <i data-lucide="trash-2"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid md:grid-cols-4 gap-4">
        <div class="md:col-span-1">
          <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-soft">
            <h3 class="font-semibold mb-4 text-primary-800 flex items-center gap-2">
              <i data-lucide="filter" class="w-4 h-4"></i>
              Smart Filters
            </h3>
            
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="layers" class="w-4 h-4 text-slate-500"></i>
                  Category
                </label>
                <div class="relative">
                  <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary pl-3 pr-8 py-2.5 appearance-none bg-white">
                    <option>All Categories</option>
                    <option>IT Equipment</option>
                    <option>Furniture</option>
                    <option>Vehicles</option>
                    <option>Buildings</option>
                    <option>Machinery</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-slate-500"></i>
                  Location
                </label>
                <div class="space-y-2 max-h-36 overflow-y-auto scrollbar-thin p-1 border border-slate-200 rounded-lg">
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Headquarters</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Branch Office 1</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Branch Office 2</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" />
                    <span class="ml-2 text-sm">Warehouse</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="users" class="w-4 h-4 text-slate-500"></i>
                  Department
                </label>
                <div class="relative">
                  <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary pl-3 pr-8 py-2.5 appearance-none bg-white">
                    <option>All Departments</option>
                    <option>IT</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>Operations</option>
                    <option>HR</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="activity" class="w-4 h-4 text-slate-500"></i>
                  Status
                </label>
                <div class="flex flex-wrap gap-2">
                  <label class="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary-50 cursor-pointer transition-colors duration-150">
                    <input type="radio" name="status" class="hidden" checked />
                    <span class="text-sm">All</span>
                  </label>
                  <label class="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary-50 cursor-pointer transition-colors duration-150">
                    <input type="radio" name="status" class="hidden" />
                    <span class="text-sm">Active</span>
                  </label>
                  <label class="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary-50 cursor-pointer transition-colors duration-150">
                    <input type="radio" name="status" class="hidden" />
                    <span class="text-sm">Maintenance</span>
                  </label>
                  <label class="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary-50 cursor-pointer transition-colors duration-150">
                    <input type="radio" name="status" class="hidden" />
                    <span class="text-sm">Disposed</span>
                  </label>
                </div>
              </div>
              
              <div class="pt-2 space-y-3">
                <button class="btn-primary w-full flex items-center justify-center gap-2">
                  <i data-lucide="filter" class="w-4 h-4"></i>
                  Apply Filters
                </button>
                <button class="btn w-full flex items-center justify-center gap-2">
                  <i data-lucide="x" class="w-4 h-4"></i>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:col-span-3">
          <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div class="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div class="font-medium">1,248 assets found</div>
              <div class="flex items-center gap-2">
                <div class="dropdown relative">
                  <button class="btn">
                    <i data-lucide="columns" class="w-4 h-4 mr-1"></i> Columns
                  </button>
                </div>
                <select class="rounded-lg border-slate-300 focus:border-primary focus:ring-primary text-sm">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                  <option>100 per page</option>
                </select>
              </div>
            </div>
            
            <div class="table-container">
              <table class="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th>
                      <div class="flex items-center">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                        <span>Asset Name</span>
                        <i data-lucide="arrow-up" class="w-4 h-4 ml-1 text-primary"></i>
                      </div>
                    </th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="transition-colors duration-150">
                    <td>
                      <div class="flex items-center">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                        <a href="#/assets/detail" class="text-primary hover:underline font-medium">Dell Latitude 7420</a>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                          <i data-lucide="monitor" class="w-3.5 h-3.5"></i>
                        </span>
                        <span>IT Equipment</span>
                      </div>
                    </td>
                    <td>Headquarters</td>
                    <td>IT Department</td>
                    <td>
                      <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="transition-colors duration-150">
                    <td>
                      <div class="flex items-center">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                        <a href="#/assets/detail" class="text-primary hover:underline font-medium">iPhone 13 Pro</a>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                          <i data-lucide="smartphone" class="w-3.5 h-3.5"></i>
                        </span>
                        <span>IT Equipment</span>
                      </div>
                    </td>
                    <td>Branch Office 1</td>
                    <td>Marketing</td>
                    <td>
                      <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="transition-colors duration-150">
                    <td>
                      <div class="flex items-center">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                        <a href="#/assets/detail" class="text-primary hover:underline font-medium">Conference Table</a>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                          <i data-lucide="armchair" class="w-3.5 h-3.5"></i>
                        </span>
                        <span>Furniture</span>
                      </div>
                    </td>
                    <td>Headquarters</td>
                    <td>Common Areas</td>
                    <td>
                      <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                          <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div class="text-sm text-slate-500">Showing 1-10 of 1,248 assets</div>
              <div class="flex items-center gap-1">
                <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-150 text-slate-400">
                  <i data-lucide="chevron-left" class="w-4 h-4"></i>
                </button>
                <button class="p-2 rounded-lg bg-primary-50 text-primary font-medium">1</button>
                <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-150">2</button>
                <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-150">3</button>
                <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-150">...</button>
                <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-150">125</button>
                <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                  <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Import Modal -->
      <div id="importModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-primary-800">Import Assets</h3>
              <button onclick="document.getElementById('importModal').classList.add('hidden')" class="p-2 rounded-lg hover:bg-slate-100">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>
            
            <div class="space-y-4">
              <div class="bg-primary-50 rounded-lg p-4 text-sm">
                <p class="font-medium text-primary-800 mb-2">Instructions:</p>
                <ol class="list-decimal ml-4 space-y-1 text-primary-700">
                  <li>Download the template CSV file</li>
                  <li>Fill in your asset data following the template format</li>
                  <li>Upload the completed file</li>
                  <li>Review and confirm the import</li>
                </ol>
              </div>
              
              <div class="border border-slate-200 rounded-lg p-4">
                <h4 class="font-medium mb-2">Step 1: Download Template</h4>
                <button class="btn">
                  <i data-lucide="download" class="w-4 h-4 mr-1"></i> Download CSV Template
                </button>
              </div>
              
              <div class="border border-slate-200 rounded-lg p-4">
                <h4 class="font-medium mb-2">Step 2: Upload Your File</h4>
                <div class="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <i data-lucide="upload-cloud" class="w-12 h-12 mx-auto text-slate-400 mb-2"></i>
                  <p class="text-sm text-slate-600 mb-3">Drag and drop your CSV file here, or click to browse</p>
                  <input type="file" id="fileUpload" class="hidden" accept=".csv" />
                  <button class="btn" onclick="document.getElementById('fileUpload').click()">
                    Browse Files
                  </button>
                </div>
                <div class="mt-3 hidden" id="uploadStatus">
                  <div class="flex items-center gap-2">
                    <i data-lucide="file-text" class="w-5 h-5 text-primary"></i>
                    <span class="text-sm font-medium">assets_import.csv</span>
                    <span class="text-xs text-slate-500">(245 KB)</span>
                    <button class="ml-auto p-1 rounded hover:bg-slate-100">
                      <i data-lucide="x" class="w-4 h-4 text-slate-500"></i>
                    </button>
                  </div>
                  <div class="mt-2">
                    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full bg-primary rounded-full" style="width: 100%"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="border border-slate-200 rounded-lg p-4">
                <h4 class="font-medium mb-2">Step 3: Validation Results</h4>
                <div class="text-sm text-slate-500 italic">
                  Upload a file to see validation results
                </div>
                <!-- This would be populated with validation results after upload -->
              </div>
              
              <div class="flex justify-end gap-2 mt-4">
                <button class="btn" onclick="document.getElementById('importModal').classList.add('hidden')">
                  Cancel
                </button>
                <button class="btn-primary" disabled>
                  Import Assets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Category Filter -->
      <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
        <h3 class="font-semibold mb-3 text-primary-800">Filter by Category</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <button class="p-3 rounded-lg border border-primary bg-primary-50 text-primary text-sm font-medium flex flex-col items-center gap-2">
            <i data-lucide="monitor"></i>
            <span>IT Equipment</span>
            <span class="text-xs text-primary-600">420</span>
          </button>
          <button class="p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-50 hover:text-primary text-sm font-medium flex flex-col items-center gap-2">
            <i data-lucide="armchair"></i>
            <span>Furniture</span>
            <span class="text-xs text-slate-500">310</span>
          </button>
          <button class="p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-50 hover:text-primary text-sm font-medium flex flex-col items-center gap-2">
            <i data-lucide="car"></i>
            <span>Vehicles</span>
            <span class="text-xs text-slate-500">70</span>
          </button>
          <button class="p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-50 hover:text-primary text-sm font-medium flex flex-col items-center gap-2">
            <i data-lucide="building"></i>
            <span>Buildings</span>
            <span class="text-xs text-slate-500">12</span>
          </button>
          <button class="p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-50 hover:text-primary text-sm font-medium flex flex-col items-center gap-2">
            <i data-lucide="cog"></i>
            <span>Machinery</span>
            <span class="text-xs text-slate-500">436</span>
          </button>
          <button class="p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-50 hover:text-primary text-sm font-medium flex flex-col items-center gap-2">
            <i data-lucide="plus"></i>
            <span>Other</span>
            <span class="text-xs text-slate-500">0</span>
          </button>
        </div>
      </div>
      
      <!-- Advanced Filters and Asset List -->
      <div class="grid md:grid-cols-4 gap-4">
        <div class="md:col-span-1">
          <div class="bg-white rounded-xl border border-slate-200 p-4 md:sticky md:top-20">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold mb-3 text-primary-800">Advanced Filters</h3>
              <button class="md:hidden p-2 rounded-lg hover:bg-slate-100 mb-3" id="toggleFilters">
                <i data-lucide="sliders"></i>
              </button>
            </div>
            <div id="filterContent" class="md:block">
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary">
                  <option>All Locations</option>
                  <option>Headquarters</option>
                  <option>Branch Office 1</option>
                  <option>Branch Office 2</option>
                  <option>Warehouse</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary">
                  <option>All Departments</option>
                  <option>IT</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Operations</option>
                  <option>HR</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>In Maintenance</option>
                  <option>In Storage</option>
                  <option>Disposed</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Condition</label>
                <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary">
                  <option>All Conditions</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Acquisition Date</label>
                <div class="grid grid-cols-2 gap-2">
                  <input type="date" placeholder="From" class="rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                  <input type="date" placeholder="To" class="rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                </div>
              </div>
              
              <div class="pt-2">
                <button class="btn-primary w-full">
                  Apply Filters
                </button>
                <button class="btn w-full mt-2">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:col-span-3">
          <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div class="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div class="font-medium">420 IT Equipment assets found</div>
              <div class="flex items-center gap-2">
                <div class="dropdown relative">
                  <button class="btn">
                    <i data-lucide="columns" class="w-4 h-4 mr-1"></i> Columns
                  </button>
                </div>
                <select class="rounded-lg border-slate-300 focus:border-primary focus:ring-primary text-sm">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                  <option>100 per page</option>
                </select>
              </div>
            </div>
            
            <table class="min-w-full divide-y divide-slate-200">
              <thead class="bg-slate-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div class="flex items-center">
                      <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                      Asset Name
                      <i data-lucide="arrow-up" class="w-4 h-4 ml-1"></i>
                    </div>
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tag/Serial</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-slate-200">
                <tr>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center">
                      <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                      <a href="#/assets/detail" class="text-primary hover:underline">Dell Latitude 7420</a>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="text-xs text-slate-500">Tag: AST-IT-0042</div>
                    <div>SN-4872-9281-4421</div>
                  </td>
                  <td class="px-4 py-3 text-sm">Headquarters</td>
                  <td class="px-4 py-3 text-sm">IT Department</td>
                  <td class="px-4 py-3 text-sm">
                    <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center gap-2">
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                      </button>
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                      </button>
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center">
                      <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                      <a href="#/assets/detail" class="text-primary hover:underline">HP EliteBook 840</a>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="text-xs text-slate-500">Tag: AST-IT-0043</div>
                    <div>SN-5872-1281-3421</div>
                  </td>
                  <td class="px-4 py-3 text-sm">Branch Office 1</td>
                  <td class="px-4 py-3 text-sm">Marketing</td>
                  <td class="px-4 py-3 text-sm">
                    <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center gap-2">
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                      </button>
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                      </button>
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center">
                      <input type="checkbox" class="rounded text-primary focus:ring-primary mr-2" />
                      <a href="#/assets/detail" class="text-primary hover:underline">MacBook Pro 16"</a>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="text-xs text-slate-500">Tag: AST-IT-0044</div>
                    <div>C02G42RKMD6M</div>
                  </td>
                  <td class="px-4 py-3 text-sm">Headquarters</td>
                  <td class="px-4 py-3 text-sm">Design</td>
                  <td class="px-4 py-3 text-sm">
                    <span class="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                      In Maintenance
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center gap-2">
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                      </button>
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="clipboard-check" class="w-4 h-4 text-slate-500"></i>
                      </button>
                      <button class="p-1 rounded hover:bg-slate-100">
                        <i data-lucide="more-vertical" class="w-4 h-4 text-slate-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div class="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div class="text-sm text-slate-500">Showing 1-3 of 420 assets</div>
              <div class="flex items-center gap-1">
                <button class="p-2 rounded hover:bg-slate-200 disabled:opacity-50" disabled>
                  <i data-lucide="chevron-left" class="w-4 h-4"></i>
                </button>
                <button class="h-8 w-8 rounded bg-primary text-white flex items-center justify-center">1</button>
                <button class="h-8 w-8 rounded hover:bg-slate-200 flex items-center justify-center">2</button>
                <button class="h-8 w-8 rounded hover:bg-slate-200 flex items-center justify-center">3</button>
                <button class="p-2 rounded hover:bg-slate-200">
                  <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `),
  
  '#/maintenance': () => Page('Maintenance Monitoring', `
      <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <button class="btn-primary">
              <i data-lucide="plus" class="w-4 h-4 mr-1"></i> Create Work Order
            </button>
            <button class="btn">
              <i data-lucide="calendar" class="w-4 h-4 mr-1"></i> Schedule Maintenance
            </button>
            <button class="btn">
              <i data-lucide="download" class="w-4 h-4 mr-1"></i> Export
            </button>
          </div>
        
          <div class="flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5">
            <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
            <input placeholder="Search maintenance..." class="outline-none text-sm w-56" />
          </div>
        </div>
      
        <!-- Status Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-slate-500">Scheduled</div>
                <div class="text-xl font-semibold">24</div>
              </div>
              <div class="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <i data-lucide="calendar"></i>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-slate-500">In Progress</div>
                <div class="text-xl font-semibold">8</div>
              </div>
              <div class="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <i data-lucide="loader"></i>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-slate-500">Completed</div>
                <div class="text-xl font-semibold">156</div>
              </div>
              <div class="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <i data-lucide="check-circle"></i>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-slate-500">Overdue</div>
                <div class="text-xl font-semibold">5</div>
              </div>
              <div class="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                <i data-lucide="alert-circle"></i>
              </div>
            </div>
          </div>
        </div>
      
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Upcoming Maintenance -->
          <div class="md:col-span-2">
            <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-soft">
              <div class="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div class="font-medium">Upcoming Maintenance</div>
                <div class="flex items-center gap-2">
                  <select class="rounded-lg border-slate-300 focus:border-primary focus:ring-primary text-sm">
                    <option>Next 7 Days</option>
                    <option>Next 30 Days</option>
                    <option>All Scheduled</option>
                  </select>
                </div>
              </div>
            
              <div class="table-container">
                <table class="min-w-full divide-y divide-slate-200">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Type</th>
                      <th>Due Date</th>
                      <th>Assigned To</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="transition-colors duration-150">
                      <td>
                        <div class="flex items-center">
                          <a href="#/assets/detail" class="text-primary hover:underline font-medium">HP LaserJet Printer</a>
                        </div>
                      </td>
                      <td>Preventive</td>
                      <td>Aug 20, 2025</td>
                      <td>John Smith</td>
                      <td>
                        <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                          <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                          Scheduled
                        </span>
                      </td>
                      <td>
                        <div class="flex items-center gap-2">
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                            <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                          </button>
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                            <i data-lucide="check-square" class="w-4 h-4 text-slate-500"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr class="transition-colors duration-150">
                      <td>
                        <div class="flex items-center">
                          <a href="#/assets/detail" class="text-primary hover:underline font-medium">HVAC System</a>
                        </div>
                      </td>
                      <td>Preventive</td>
                      <td>Aug 21, 2025</td>
                      <td>Tech Team</td>
                      <td>
                        <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                          <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                          Scheduled
                        </span>
                      </td>
                      <td>
                        <div class="flex items-center gap-2">
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                            <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                          </button>
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                            <i data-lucide="check-square" class="w-4 h-4 text-slate-500"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr class="transition-colors duration-150">
                      <td>
                        <div class="flex items-center">
                          <a href="#/assets/detail" class="text-primary hover:underline font-medium">Company Van</a>
                        </div>
                      </td>
                      <td>Service</td>
                      <td>Aug 22, 2025</td>
                      <td>Auto Shop</td>
                      <td>
                        <span class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                          <span class="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                          In Progress
                        </span>
                      </td>
                      <td>
                        <div class="flex items-center gap-2">
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                            <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                          </button>
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                            <i data-lucide="check-square" class="w-4 h-4 text-slate-500"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr class="transition-colors duration-150">
                      <td>
                        <div class="flex items-center">
                          <a href="#/assets/detail" class="text-primary hover:underline font-medium">Dell Server</a>
                        </div>
                      </td>
                      <td>Preventive</td>
                      <td>Aug 19, 2025</td>
                      <td>IT Support</td>
                      <td>
                        <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                          <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                          Overdue
                        </span>
                      </td>
                      <td>
                        <div class="flex items-center gap-2">
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                            <i data-lucide="edit" class="w-4 h-4 text-slate-500"></i>
                          </button>
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-150">
                            <i data-lucide="check-square" class="w-4 h-4 text-slate-500"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            
              <div class="p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div class="text-sm text-slate-500">Showing 4 of 24 scheduled maintenance tasks</div>
                <a href="#" class="text-sm text-primary hover:underline">View All</a>
              </div>
            </div>
          </div>
        
          <!-- Maintenance by Type -->
          <div class="md:col-span-1">
            <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-soft h-full">
              <h3 class="font-semibold mb-4 text-primary-800 flex items-center gap-2">
                <i data-lucide="pie-chart" class="w-4 h-4"></i>
                Maintenance by Type
              </h3>
            
              <div class="h-64">
                <canvas id="maintenanceTypeChart"></canvas>
              </div>
            
              <div class="mt-4 space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-2">
                    <span class="h-3 w-3 rounded-full bg-primary"></span>
                    <span>Preventive</span>
                  </div>
                  <span class="font-medium">65%</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-2">
                    <span class="h-3 w-3 rounded-full bg-amber-500"></span>
                    <span>Corrective</span>
                  </div>
                  <span class="font-medium">20%</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-2">
                    <span class="h-3 w-3 rounded-full bg-blue-500"></span>
                    <span>Service</span>
                  </div>
                  <span class="font-medium">15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <!-- Maintenance Calendar -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-soft">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-primary-800 flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4"></i>
              Maintenance Calendar
            </h3>
            <div class="flex items-center gap-2">
              <button class="btn">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </button>
              <span class="font-medium">August 2025</span>
              <button class="btn">
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        
          <div class="grid grid-cols-7 gap-2">
            <div class="text-center text-sm font-medium text-slate-500 py-2">Sun</div>
            <div class="text-center text-sm font-medium text-slate-500 py-2">Mon</div>
            <div class="text-center text-sm font-medium text-slate-500 py-2">Tue</div>
            <div class="text-center text-sm font-medium text-slate-500 py-2">Wed</div>
            <div class="text-center text-sm font-medium text-slate-500 py-2">Thu</div>
            <div class="text-center text-sm font-medium text-slate-500 py-2">Fri</div>
            <div class="text-center text-sm font-medium text-slate-500 py-2">Sat</div>
          
            <!-- Calendar days -->
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1 text-slate-400">
                <div class="text-xs">28</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1 text-slate-400">
                <div class="text-xs">29</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1 text-slate-400">
                <div class="text-xs">30</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1 text-slate-400">
                <div class="text-xs">31</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">1</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">2</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">3</div>
              </div>
            </div>
          
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">4</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">5</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">6</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">7</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">8</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">9</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">10</div>
              </div>
            </div>
          
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">11</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">12</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">13</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">14</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">15</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">16</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">17</div>
              </div>
            </div>
          
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">18</div>
                <div class="mt-1 h-1.5 w-full rounded-full bg-red-500" title="Overdue: Dell Server"></div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1 bg-primary-50 border-primary">
                <div class="text-xs font-medium">19</div>
                <div class="mt-1 h-1.5 w-full rounded-full bg-red-500" title="Overdue: Dell Server"></div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1 bg-primary-50 border-primary">
                <div class="text-xs font-medium">20</div>
                <div class="mt-1 h-1.5 w-full rounded-full bg-blue-500" title="Scheduled: HP LaserJet Printer"></div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1 bg-primary-50 border-primary">
                <div class="text-xs font-medium">21</div>
                <div class="mt-1 h-1.5 w-full rounded-full bg-blue-500" title="Scheduled: HVAC System"></div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1 bg-primary-50 border-primary">
                <div class="text-xs font-medium">22</div>
                <div class="mt-1 h-1.5 w-full rounded-full bg-amber-500" title="In Progress: Company Van"></div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">23</div>
              </div>
            </div>
            <div class="aspect-square p-1">
              <div class="h-full rounded-lg border border-slate-200 p-1">
                <div class="text-xs">24</div>
              </div>
            </div>
          </div>
        
          <div class="flex items-center justify-center gap-6 mt-4">
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-blue-500"></span>
              <span class="text-sm">Scheduled</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-amber-500"></span>
              <span class="text-sm">In Progress</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-green-500"></span>
              <span class="text-sm">Completed</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-red-500"></span>
              <span class="text-sm">Overdue</span>
            </div>
          </div>
        </div>
      </div>
    
      <script>
        // Initialize maintenance type chart
        const typeCtx = document.getElementById('maintenanceTypeChart');
        if (typeCtx) {
          new Chart(typeCtx, {
            type: 'doughnut',
            data: {
              labels: ['Preventive', 'Corrective', 'Service'],
              datasets: [{ 
                data: [65, 20, 15],
                backgroundColor: [
                  'rgba(182, 10, 28, 0.8)',
                  'rgba(245, 158, 11, 0.8)',
                  'rgba(59, 130, 246, 0.8)'
                ],
                borderWidth: 2,
                borderColor: 'white',
                hoverBackgroundColor: [
                  'rgba(182, 10, 28, 0.9)',
                  'rgba(245, 158, 11, 0.9)',
                  'rgba(59, 130, 246, 0.9)'
                ],
                hoverBorderWidth: 3,
                hoverOffset: 10
              }]
            },
            options: { 
              cutout: '65%',
              radius: '90%',
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  titleColor: '#334155',
                  bodyColor: '#334155',
                  bodyFont: {
                    size: 14
                  },
                  padding: 12,
                  boxWidth: 10,
                  boxHeight: 10,
                  boxPadding: 3,
                  usePointStyle: true,
                  borderColor: 'rgba(226, 232, 240, 1)',
                  borderWidth: 1,
                  cornerRadius: 8,
                  displayColors: true,
                  caretSize: 6,
                  callbacks: {
                    label: function(context) {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                      const percentage = Math.round((value / total) * 100);
                      return \`\${label}: \${percentage}%\`;
                    }
                  }
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1200,
                easing: 'easeOutQuart'
              }
            }
          });
        }
      </script>
    `),
  '#/depreciation': () => Page('Depreciation', placeholder('Configure methods and post runs.')),
  '#/verification': () => Page('Verification', placeholder('Run physical verification sessions.')),
  '#/disposals': () => Page('Disposals', placeholder('Record asset disposals.')),
  '#/procurement': () => Page('Procurement', placeholder('Link suppliers, POs, invoices.')),
  '#/reports': () => Page('Reports', `
    <div class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <button class="btn-primary">
            <i data-lucide="file-text" class="w-4 h-4 mr-1"></i> Generate Report
          </button>
          <div class="dropdown relative">
            <button class="btn">
              <i data-lucide="download" class="w-4 h-4 mr-1"></i> Export
              <i data-lucide="chevron-down" class="w-3 h-3 ml-1"></i>
            </button>
            <div class="dropdown-menu hidden absolute top-full left-0 mt-1 z-10 bg-white rounded-xl shadow-lg border border-slate-200 py-2 w-40">
              <a href="#" class="block px-4 py-2 text-sm hover:bg-slate-50">CSV</a>
              <a href="#" class="block px-4 py-2 text-sm hover:bg-slate-50">Excel (XLSX)</a>
              <a href="#" class="block px-4 py-2 text-sm hover:bg-slate-50">PDF</a>
            </div>
          </div>
          <button class="btn">
            <i data-lucide="save" class="w-4 h-4 mr-1"></i> Save Template
          </button>
        </div>
      
        <div class="flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5">
          <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
          <input placeholder="Search reports..." class="outline-none text-sm w-56" />
        </div>
      </div>
    
      <div class="grid md:grid-cols-4 gap-4">
        <div class="md:col-span-1">
          <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-soft">
            <h3 class="font-semibold mb-4 text-primary-800 flex items-center gap-2">
              <i data-lucide="sliders" class="w-4 h-4"></i>
              Report Options
            </h3>
          
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="file-bar-chart" class="w-4 h-4 text-slate-500"></i>
                  Report Type
                </label>
                <div class="relative">
                  <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary pl-3 pr-8 py-2.5 appearance-none bg-white">
                    <option>Asset Register</option>
                    <option>Net Book Value (NBV)</option>
                    <option>Asset Aging</option>
                    <option>Maintenance Cost</option>
                    <option>Verification Exceptions</option>
                    <option>Disposal Summary</option>
                    <option>Custom Report</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                  </div>
                </div>
              </div>
            
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="layers" class="w-4 h-4 text-slate-500"></i>
                  Category
                </label>
                <div class="relative">
                  <select class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary pl-3 pr-8 py-2.5 appearance-none bg-white">
                    <option>All Categories</option>
                    <option>IT Equipment</option>
                    <option>Furniture</option>
                    <option>Vehicles</option>
                    <option>Buildings</option>
                    <option>Machinery</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                  </div>
                </div>
              </div>
            
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-slate-500"></i>
                  Location
                </label>
                <div class="space-y-2 max-h-36 overflow-y-auto scrollbar-thin p-1 border border-slate-200 rounded-lg">
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Headquarters</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Branch Office 1</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Branch Office 2</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" />
                    <span class="ml-2 text-sm">Warehouse</span>
                  </label>
                </div>
              </div>
            
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="calendar" class="w-4 h-4 text-slate-500"></i>
                  Date Range
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="text-xs text-slate-500">From</label>
                    <input type="date" class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary py-1.5 text-sm" />
                  </div>
                  <div>
                    <label class="text-xs text-slate-500">To</label>
                    <input type="date" class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary py-1.5 text-sm" />
                  </div>
                </div>
              </div>
            
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <i data-lucide="columns-3" class="w-4 h-4 text-slate-500"></i>
                  Display Columns
                </label>
                <div class="space-y-2 max-h-36 overflow-y-auto scrollbar-thin p-1 border border-slate-200 rounded-lg">
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Asset ID</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Description</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Category</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Location</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Purchase Date</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">Cost</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                    <span class="ml-2 text-sm">NBV</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" />
                    <span class="ml-2 text-sm">Assigned To</span>
                  </label>
                  <label class="flex items-center p-2 hover:bg-slate-50 rounded-md transition-colors duration-150">
                    <input type="checkbox" class="rounded text-primary focus:ring-primary" />
                    <span class="ml-2 text-sm">Status</span>
                  </label>
                </div>
              </div>
            
              <div class="pt-2">
                <button class="w-full btn-primary">
                  <i data-lucide="refresh-cw" class="w-4 h-4 mr-1"></i> Update Report
                </button>
              </div>
            </div>
          </div>
        </div>
      
        <div class="md:col-span-3">
          <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-soft">
            <h3 class="font-semibold mb-4 text-primary-800 flex items-center justify-between">
              <span class="flex items-center gap-2">
                <i data-lucide="file-text" class="w-4 h-4"></i>
                Asset Register Report
              </span>
              <span class="text-sm font-normal text-slate-500">Showing 50 of 1,248 assets</span>
            </h3>
          
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th class="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Asset ID
                    </th>
                    <th class="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th class="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th class="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th class="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Purchase Date
                    </th>
                    <th class="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th class="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      NBV
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-100">
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">IT-001</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Dell Latitude 7420</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">IT Equipment</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Headquarters</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">2023-05-15</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$1,250.00</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$937.50</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">IT-002</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">HP LaserJet Pro</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">IT Equipment</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Branch Office 1</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">2022-11-20</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$450.00</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$315.00</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">FN-001</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Executive Desk</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Furniture</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Headquarters</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">2021-08-10</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$850.00</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$510.00</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">VH-001</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Toyota Camry</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Vehicles</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Headquarters</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">2022-03-25</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$28,500.00</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$22,800.00</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">IT-003</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">iPhone 13 Pro</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">IT Equipment</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">Branch Office 2</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700">2023-01-05</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$999.00</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-700 text-right">$799.20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          
            <div class="mt-4 flex items-center justify-between">
              <div class="text-sm text-slate-500">
                Showing 1-5 of 50 items
              </div>
              <div class="flex items-center gap-2">
                <button class="btn px-3 py-1.5 text-sm">
                  <i data-lucide="chevron-left" class="w-4 h-4"></i>
                </button>
                <button class="btn px-3 py-1.5 text-sm bg-primary-50 text-primary border-primary-100">1</button>
                <button class="btn px-3 py-1.5 text-sm">2</button>
                <button class="btn px-3 py-1.5 text-sm">3</button>
                <button class="btn px-3 py-1.5 text-sm">
                  <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `),
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

  // mobile sidebar toggle with backdrop and ARIA support
  const toggleBtn = document.getElementById('sidebarToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const sb = document.getElementById('sidebar');
      const body = document.body;
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      
      // Toggle sidebar
      sb.classList.toggle('hidden');
      sb.classList.toggle('absolute');
      sb.classList.toggle('z-50');
      sb.classList.toggle('top-16');
      sb.classList.toggle('left-0');
      sb.classList.toggle('right-0');
      
      // Update ARIA states
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      
      // Create or remove backdrop
      if (!sb.classList.contains('hidden')) {
        // Create backdrop if it doesn't exist
        if (!document.getElementById('sidebar-backdrop')) {
          const backdrop = document.createElement('div');
          backdrop.id = 'sidebar-backdrop';
          backdrop.className = 'fixed inset-0 bg-black/20 backdrop-blur-sm z-40';
          backdrop.setAttribute('aria-hidden', 'true');
          backdrop.addEventListener('click', () => {
            // Close sidebar when backdrop is clicked
            sb.classList.add('hidden');
            sb.classList.remove('absolute', 'z-50', 'top-16', 'left-0', 'right-0');
            toggleBtn.setAttribute('aria-expanded', 'false');
            backdrop.remove();
            body.classList.remove('overflow-hidden');
          });
          document.body.appendChild(backdrop);
          
          // Prevent body scrolling when sidebar is open
          body.classList.add('overflow-hidden');
          
          // Set focus to first focusable element in sidebar
          setTimeout(() => {
            const firstFocusable = sb.querySelector('a, button, [tabindex="0"]');
            if (firstFocusable) {
              firstFocusable.focus();
            }
          }, 100);
        }
      } else {
        // Remove backdrop
        const backdrop = document.getElementById('sidebar-backdrop');
        if (backdrop) {
          backdrop.remove();
          body.classList.remove('overflow-hidden');
          
          // Return focus to toggle button
          toggleBtn.focus();
        }
      }
    });
    
    // Handle Escape key to close sidebar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const sb = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        
        if (sb && !sb.classList.contains('hidden') && backdrop) {
          sb.classList.add('hidden');
          sb.classList.remove('absolute', 'z-50', 'top-16', 'left-0', 'right-0');
          toggleBtn.setAttribute('aria-expanded', 'false');
          backdrop.remove();
          document.body.classList.remove('overflow-hidden');
          toggleBtn.focus();
        }
      }
    });
  }
  
  // Toggle filters on mobile
  document.addEventListener('click', (e) => {
    if (e.target.closest('#toggleFilters')) {
      const filterContent = document.getElementById('filterContent');
      if (filterContent) {
        filterContent.classList.toggle('hidden');
        // Initialize as hidden on mobile when page loads
        if (!filterContent.classList.contains('md:block')) {
          filterContent.classList.add('md:block');
        }
      }
    }
  });
  
  // File upload handling for import modal
  document.addEventListener('click', (e) => {
    // Check if the fileUpload button was clicked
    if (e.target.closest('button') && e.target.closest('button').onclick && 
        e.target.closest('button').onclick.toString().includes('fileUpload')) {
      
      // Set up the file input change handler
      const fileInput = document.getElementById('fileUpload');
      if (fileInput) {
        fileInput.onchange = function() {
          if (this.files && this.files[0]) {
            const file = this.files[0];
            const uploadStatus = document.getElementById('uploadStatus');
            
            if (uploadStatus) {
              // Show the upload status
              uploadStatus.classList.remove('hidden');
              
              // Update file name and size
              const nameEl = uploadStatus.querySelector('span.text-sm');
              const sizeEl = uploadStatus.querySelector('span.text-xs');
              
              if (nameEl) nameEl.textContent = file.name;
              if (sizeEl) sizeEl.textContent = `(${Math.round(file.size / 1024)} KB)`;
              
              // Enable the import button
              const importBtn = document.querySelector('#importModal .btn-primary');
              if (importBtn) importBtn.disabled = false;
              
              // Add validation results (demo)
              const validationDiv = document.querySelector('#importModal .border-slate-200:nth-child(4)');
              if (validationDiv) {
                validationDiv.innerHTML = `
                  <h4 class="font-medium mb-2">Step 3: Validation Results</h4>
                  <div class="bg-green-50 text-green-700 p-3 rounded-lg mb-2">
                    <div class="flex items-center gap-2">
                      <i data-lucide="check-circle" class="w-5 h-5"></i>
                      <span class="font-medium">File validated successfully</span>
                    </div>
                  </div>
                  <div class="text-sm">
                    <div class="flex justify-between py-1 border-b border-slate-100">
                      <span>Total records:</span>
                      <span class="font-medium">42</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-100">
                      <span>Valid records:</span>
                      <span class="font-medium text-green-600">42</span>
                    </div>
                    <div class="flex justify-between py-1">
                      <span>Errors:</span>
                      <span class="font-medium text-green-600">0</span>
                    </div>
                  </div>
                `;
                refreshIcons();
              }
            }
          }
        };
      }
    }
  });

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
