
// // frappe.pages['product-analytics'].on_page_load = function(wrapper) {
// //     const REFRESH_INTERVAL_MS = 10000; 
// //     let autoRefreshInterval;

// //     // Create Page
// //     const page = frappe.ui.make_app_page({
// //         parent: wrapper,
// //         title: __('Product Order Analysis'),
// //         single_column: true 
// //     });

// //     // Page content container
// //     let $container = $(`
// //         <div class="page-content-wrapper">
// //             <div class="page-header text-center mb-4">
// //                 <h1 class="page-title">🍽️ Product Order Analysis</h1>
// //             </div>
// //             <!-- Statistics Bar -->
// //             <div id="stats_container" class="stats-bar" style="display: none;">
// //                 <div class="stat-item">
// //                     <div class="stat-value" id="total_orders">0</div>
// //                     <div class="stat-label">Total Orders</div>
// //                 </div>
// //                 <div class="stat-item">
// //                     <div class="stat-value" id="total_items">0</div>
// //                     <div class="stat-label">Total Items</div>
// //                 </div>
// //                 <div class="stat-item">
// //                     <div class="stat-value" id="unique_customers">0</div>
// //                     <div class="stat-label">Unique Customers</div>
// //                 </div>
// //                 <div class="stat-item">
// //                     <div class="stat-value" id="pending_orders">0</div>
// //                     <div class="stat-label">Pending Orders</div>
// //                 </div>
// //             </div>
// //             <div id="analytics_output" class="orders-grid-container">
// //                 <div class="empty-state text-center">
// //                     <i class="fa fa-shopping-cart fa-3x text-muted mb-3"></i>
// //                     <p class="text-muted">Start the refresh to load live data.</p>
// //                 </div>
// //             </div>
// //         </div>
// //     `);

// //     // Add custom CSS
// //     $('<style>')
// //         .text(`
// //             .page-content-wrapper {
// //                 padding: 20px;
// //                 max-width: 1400px;
// //                 margin: 0 auto;
// //             }
            
// //             .page-header {
// //                 border-bottom: 2px solid #e0e6ed;
// //                 padding-bottom: 15px;
// //             }
            
// //             .page-title {
// //                 font-size: 28px;
// //                 font-weight: 700;
// //                 color: #8b8d96;
// //                 margin: 0;
// //             }
            
// //             .refresh-controls {
// //                 background: #f8f9fa;
// //                 padding: 20px;
// //                 border-radius: 10px;
// //                 border: 1px solid #e0e6ed;
// //                 margin-bottom: 20px;
// //             }
            
// //             .orders-grid-container {
// //                 display: grid;
// //                 grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
// //                 gap: 20px;
// //                 margin-top: 20px;
// //             }
            
// //             .order-card {
// //                 background: white;
// //                 border-radius: 12px;
// //                 padding: 20px;
// //                 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
// //                 border: 1px solid #e0e6ed;
// //                 transition: all 0.3s ease;
// //                 position: relative;
// //             }
            
// //             .order-card:hover {
// //                 box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
// //                 transform: translateY(-2px);
// //             }
            
// //             .order-header {
// //                 display: flex;
// //                 justify-content: space-between;
// //                 align-items: flex-start;
// //                 margin-bottom: 15px;
// //                 padding-bottom: 15px;
// //                 border-bottom: 2px solid #f0f4f8;
// //             }
            
// //             .customer-name {
// //                 font-size: 20px;
// //                 font-weight: 700;
// //                 color: #2c3e50;
// //                 margin: 0;
// //             }
            
// //             .order-number {
// //                 background: #8b8c92;
// //                 color: white;
// //                 padding: 4px 12px;
// //                 border-radius: 20px;
// //                 font-size: 12px;
// //                 font-weight: 600;
// //             }
            
// //             .order-items {
// //                 margin-bottom: 15px;
// //             }
            
// //             .order-item {
// //                 display: flex;
// //                 justify-content: space-between;
// //                 align-items: flex-start;
// //                 padding: 8px 0;
// //                 border-bottom: 1px dashed #dee0e2;
// //             }
            
// //             .order-item:last-child {
// //                 border-bottom: none;
// //             }
            
// //             .item-details {
// //                 flex: 1;
// //             }
            
// //             .item-name {
// //                 font-weight: 600;
// //                 color: #2c3e50;
// //                 font-size: 14px;
// //                 margin-bottom: 2px;
// //             }
            
// //             .item-notes {
// //                 color: #7f8c8d;
// //                 font-size: 12px;
// //                 font-style: italic;
// //                 margin: 0;
// //             }
            
// //             .item-quantity {
// //                 background: #f8f9fa;
// //                 color: #2c3e50;
// //                 padding: 4px 10px;
// //                 border-radius: 12px;
// //                 font-weight: 700;
// //                 font-size: 14px;
// //                 min-width: 40px;
// //                 text-align: center;
// //                 border: 1px solid #e0e6ed;
// //             }
            
// //             .order-actions {
// //                 text-align: center;
// //                 padding-top: 15px;
// //                 border-top: 1px solid #f0f4f8;
// //             }
            
// //             .btn-completed {
// //                 background: #27ae60;
// //                 color: white;
// //                 border: none;
// //                 padding: 8px 20px;
// //                 border-radius: 6px;
// //                 font-weight: 600;
// //                 cursor: not-allowed;
// //                 opacity: 0.7;
// //             }
            
// //             .btn-done {
// //                 background: #3498db;
// //                 color: white;
// //                 border: none;
// //                 padding: 8px 20px;
// //                 border-radius: 6px;
// //                 font-weight: 600;
// //                 cursor: pointer;
// //                 transition: all 0.3s ease;
// //             }
            
// //             .btn-done:hover {
// //                 background: #2980b9;
// //                 transform: translateY(-1px);
// //             }
            
// //             .empty-state {
// //                 grid-column: 1 / -1;
// //                 padding: 60px 20px;
// //                 background: #f8f9fa;
// //                 border-radius: 10px;
// //                 border: 2px dashed #e0e6ed;
// //             }
            
// //             .loading-state {
// //                 grid-column: 1 / -1;
// //                 text-align: center;
// //                 padding: 40px 20px;
// //                 color: #2e5bff;
// //             }
            
// //             .last-refreshed {
// //                 font-weight: 600;
// //                 color: #27ae60;
// //             }
            
// //             .demo-notice {
// //                 background: #fff3cd;
// //                 border: 1px solid #ffeaa7;
// //                 color: #856404;
// //                 padding: 10px;
// //                 border-radius: 5px;
// //                 margin-bottom: 15px;
// //                 text-align: center;
// //                 grid-column: 1 / -1;
// //             }
            
// //             .stats-bar {
// //                 display: flex;
// //                 justify-content: space-around;
// //                 background: #f8f9fa;
// //                 padding: 20px;
// //                 border-radius: 10px;
// //                 margin-bottom: 20px;
// //                 border: 1px solid #e0e6ed;
// //                 grid-column: 1 / -1;
// //             }
            
// //             .stat-item {
// //                 text-align: center;
// //             }
            
// //             .stat-value {
// //                 font-size: 24px;
// //                 font-weight: 700;
// //                 color: #2c3e50;
// //             }
            
// //             .stat-label {
// //                 font-size: 12px;
// //                 color: #7f8c8d;
// //                 text-transform: uppercase;
// //             }
            
// //             @media (max-width: 768px) {
// //                 .orders-grid-container {
// //                     grid-template-columns: 1fr;
// //                 }
                
// //                 .page-content-wrapper {
// //                     padding: 10px;
// //                 }
                
// //                 .order-card {
// //                     padding: 15px;
// //                 }
                
// //                 .stats-bar {
// //                     flex-direction: column;
// //                     gap: 15px;
// //                 }
// //             }
// //         `)
// //         .appendTo('head');

// //     // Add to page body
// //     page.main.append($container);
    
// //     // Store completed orders
// //     let completedOrders = new Set();
    
// //     // --- Fetch Sales Order Data ---
// //     const fetchSalesOrders = () => {
// //         return new Promise((resolve, reject) => {
// //             frappe.call({
// //                 method: 'frappe.client.get_list',
// //                 args: {
// //                     doctype: 'Sales Order',
// //                     fields: [
// //                         'name',
// //                         'customer_name',
// //                         'status',
// //                         'delivery_status',
// //                         'grand_total',
// //                         'transaction_date',
// //                         'items.item_code',
// //                         'items.item_name',
// //                         'items.qty',
// //                         'items.amount',
// //                         'items.description'
// //                     ],
// //                     filters: [
// //                         ['status', '!=', 'Completed'],
// //                         ['status', '!=', 'Cancelled'],
// //                         ['docstatus', '=', 1]
// //                     ],
// //                     limit_page_length: 50,
// //                     order_by: 'transaction_date desc'
// //                 },
// //                 callback: function(response) {
// //                     if (response.message) {
// //                         resolve(response.message);
// //                     } else {
// //                         reject(new Error('No data received'));
// //                     }
// //                 },
// //                 error: function(err) {
// //                     reject(err);
// //                 }
// //             });
// //         });
// //     };

// //     // --- Process Sales Order Data ---
// //     const processSalesOrderData = (salesOrders) => {
// //         if (!salesOrders || !salesOrders.length) return [];

// //         return salesOrders.map(order => {
// //             // Skip if order is already completed in our local state
// //             if (completedOrders.has(order.name)) return null;

// //             // Process items
// //             const items = [];
// //             if (order.items && order.items.length) {
// //                 order.items.forEach(item => {
// //                     items.push({
// //                         item_name: item.item_name || item.item_code || 'Unnamed Item',
// //                         qty: item.qty || 1,
// //                         notes: item.description || '',
// //                         amount: item.amount || 0
// //                     });
// //                 });
// //             }

// //             return {
// //                 name: order.name,
// //                 customer_name: order.customer_name || 'Walk-in Customer',
// //                 status: order.status || 'Pending',
// //                 delivery_status: order.delivery_status || 'Not Delivered',
// //                 grand_total: order.grand_total || 0,
// //                 transaction_date: order.transaction_date,
// //                 items: items
// //             };
// //         }).filter(order => order !== null); // Remove null entries
// //     };

// //     // --- Update Statistics ---
// //     const updateStatistics = (orders) => {
// //         if (!orders || orders.length === 0) {
// //             $('#stats_container').hide();
// //             return;
// //         }
// //         const totalOrders = orders.length;
// //         const totalItems = orders.reduce((sum, order) => 
// //             sum + order.items.reduce((itemSum, item) => itemSum + (item.qty || 1), 0), 0);
// //         const uniqueCustomers = new Set(orders.map(order => order.customer_name)).size;
// //         const pendingOrders = orders.filter(order => !completedOrders.has(order.name)).length;
        
// //         $('#total_orders').text(totalOrders);
// //         $('#total_items').text(totalItems);
// //         $('#unique_customers').text(uniqueCustomers);
// //         $('#pending_orders').text(pendingOrders);
// //         $('#order_count').text(totalOrders);
// //         $('#stats_container').show();
// //         $('#demo_notice').show();
// //     };

// //     // --- Rendering Function ---
// //     const renderOrderCards = (orders) => {
// //         let html = '';
// //         if (!orders || orders.length === 0) {
// //             html = `
// //                 <div class="empty-state">
// //                     <i class="fa fa-shopping-cart fa-3x text-muted mb-3"></i>
// //                     <h3 class="text-muted">No Active Orders</h3>
// //                     <p class="text-muted">There are no pending Sales Orders at the moment.</p>
// //                 </div>
// //             `;
// //             $('#stats_container').hide();
// //             $('#demo_notice').hide();
// //         } else {
// //             updateStatistics(orders);
// //             orders.forEach(order => {
// //                 // Check if the order has been completed
// //                 const isCompleted = completedOrders.has(order.name);
// //                 const actionButton = isCompleted ? 
// //                     `<button class="btn-completed" disabled>
// //                         <i class="fa fa-check"></i> Completed
// //                     </button>` : 
// //                     `<button class="btn-done" data-name="${order.name}">
// //                         <i class="fa fa-check-circle"></i> Mark as Done
// //                     </button>`;
                
// //                 let itemsHtml = '';
// //                 if (order.items && order.items.length) {
// //                     itemsHtml = order.items.map(item => {
// //                         const notesHtml = item.notes ? 
// //                             `<div class="item-notes"><i class="fa fa-sticky-note"></i> ${item.notes}</div>` : '';
                        
// //                         return `
// //                             <div class="order-item">
// //                                 <div class="item-details">
// //                                     <div class="item-name">${item.item_name}</div>
// //                                     ${notesHtml}
// //                                 </div>
// //                                 <div class="item-quantity">${item.qty}x</div>
// //                             </div>
// //                         `;
// //                     }).join('');
// //                 }
// //                 // Format date
// //                 const orderDate = order.transaction_date ? 
// //                     frappe.datetime.str_to_user(order.transaction_date) : 'Not specified';
// //                 html += `
// //                     <div class="order-card">
// //                         <div class="order-header">
// //                             <div>
// //                                 <h3 class="customer-name">${order.customer_name}</h3>
// //                                 <small class="text-muted">${orderDate} • ${frappe.format(order.grand_total, { fieldtype: 'Currency' })}</small>
// //                             </div>
// //                             <div class="order-number">${order.name}</div>
// //                         </div>
                        
// //                         <div class="order-items">
// //                             ${itemsHtml}
// //                         </div>
// //                         <div class="order-footer">
// //                             <div class="order-status mb-2">
// //                                 <span class="badge ${order.status === 'To Deliver' ? 'badge-warning' : 'badge-info'}">
// //                                     ${order.status}
// //                                 </span>
// //                                 ${order.delivery_status ? `<span class="badge badge-secondary ml-1">${order.delivery_status}</span>` : ''}
// //                             </div>
// //                         </div>
                        
// //                         <div class="order-actions">
// //                             ${actionButton}
// //                         </div>
// //                     </div>
// //                 `;
// //             });
// //         }
        
// //         // Update the list content
// //         $container.find('#analytics_output').html(html);
// //     };

// //     // --- Data Fetching Function ---
// //     const fetchAndRenderOrders = () => {
// //         // Show loading state
// //         $('#analytics_output').html(`
// //             <div class="loading-state">
// //                 <i class="fa fa-spinner fa-spin fa-2x mb-3"></i>
// //                 <p>Loading Sales Order data...</p>
// //             </div>
// //         `);
        
// //         // Update refresh status with current time
// //         const currentTime = frappe.datetime.now_time();
// //         $('#refresh_status').html(`
// //             <i class="fa fa-clock-o"></i> Last refreshed: <span class="last-refreshed">${currentTime}</span>
// //         `);

// //         // Fetch actual Sales Order data
// //         fetchSalesOrders()
// //             .then(salesOrders => {
// //                 const processedOrders = processSalesOrderData(salesOrders);
// //                 renderOrderCards(processedOrders);
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching Sales Orders:', error);
// //                 $('#analytics_output').html(`
// //                     <div class="empty-state">
// //                         <i class="fa fa-exclamation-triangle fa-3x text-danger mb-3"></i>
// //                         <h3 class="text-danger">Error Loading Data</h3>
// //                         <p class="text-muted">Failed to fetch Sales Order data. Please try again.</p>
// //                         <button class="btn btn-secondary btn-sm mt-2" onclick="fetchAndRenderOrders()">
// //                             <i class="fa fa-refresh"></i> Retry
// //                         </button>
// //                     </div>
// //                 `);
// //                 $('#demo_notice').hide();
// //                 $('#stats_container').hide();
// //             });
// //     };

// //     // --- Control Functions ---
// //     const startRefresh = () => {
// //         if (autoRefreshInterval) clearInterval(autoRefreshInterval); 
// //         fetchAndRenderOrders(); 
// //         autoRefreshInterval = setInterval(fetchAndRenderOrders, REFRESH_INTERVAL_MS);
        
// //         // Update button visibility and status text
// //         $('#start_refresh').hide();
// //         $('#stop_refresh').show();
// //         $('#refresh_status').html(`
// //             <i class="fa fa-play-circle text-success"></i> 
// //             Auto-refresh started. Updating every ${REFRESH_INTERVAL_MS / 1000} seconds.
// //         `);
// //     };

// //     const stopRefresh = () => {
// //         clearInterval(autoRefreshInterval);
// //         autoRefreshInterval = null;
        
// //         // Update button visibility and status text
// //         $('#start_refresh').show();
// //         $('#stop_refresh').hide();
// //         $('#refresh_status').html(`
// //             <i class="fa fa-stop-circle text-danger"></i> Auto-refresh is currently stopped.
// //         `);
// //     };

// //     // --- Event Handlers ---
// //     $container.find('#start_refresh').on('click', startRefresh);
// //     $container.find('#stop_refresh').on('click', stopRefresh);
// //     $container.find('#manual_refresh').on('click', fetchAndRenderOrders);
    
// //     // Add event handler for the 'Done' button
// //     $container.on('click', '.btn-done', function() {
// //         const orderName = $(this).data('name');
// //         const $button = $(this);
        
// //         frappe.confirm(
// //             __('Mark Sales Order <b>{0}</b> as Completed?', [orderName]),
// //             () => {
// //                 // Show loading on button
// //                 $button.html('<i class="fa fa-spinner fa-spin"></i> Processing...');
// //                 $button.prop('disabled', true);
                
// //                 // Update Sales Order status in ERPNext
// //                 frappe.call({
// //                     method: 'frappe.client.set_value',
// //                     args: {
// //                         doctype: 'Sales Order',
// //                         name: orderName,
// //                         fieldname: {
// //                             status: 'Completed'
// //                         }
// //                     },
// //                     callback: function(response) {
// //                         if (response.message) {
// //                             // Mark as completed in local storage
// //                             completedOrders.add(orderName);
                            
// //                             frappe.show_alert({
// //                                 message: __('Sales Order {0} marked as completed!', [orderName]),
// //                                 indicator: 'green'
// //                             });
                            
// //                             // Refresh the orders list
// //                             fetchAndRenderOrders();
// //                         } else {
// //                             frappe.show_alert({
// //                                 message: __('Failed to update Sales Order {0}', [orderName]),
// //                                 indicator: 'red'
// //                             });
// //                             $button.html('<i class="fa fa-check-circle"></i> Mark as Done');
// //                             $button.prop('disabled', false);
// //                         }
// //                     },
// //                     error: function(err) {
// //                         console.error('Error updating Sales Order:', err);
// //                         frappe.show_alert({
// //                             message: __('Error updating Sales Order {0}', [orderName]),
// //                             indicator: 'red'
// //                         });
// //                         $button.html('<i class="fa fa-check-circle"></i> Mark as Done');
// //                         $button.prop('disabled', false);
// //                     }
// //                 });
// //             }
// //         );
// //     });

// //     // Auto-start refresh when page loads
// //     startRefresh();

// //     // Stop refresh when the page is destroyed (cleanup)
// //     page.on_close = () => {
// //         if (autoRefreshInterval) {
// //             clearInterval(autoRefreshInterval);
// //         }
// //     };
// // };


// // frappe.pages['product-analytics'].on_page_load = function(wrapper) {
// //     const REFRESH_INTERVAL_MS = 10000;
// //     let autoRefreshInterval;

// //     // Create Page
// //     const page = frappe.ui.make_app_page({
// //         parent: wrapper,
// //         title: __('Product Analytics'),
// //         single_column: true
// //     });

// //     // Page content container
// //     let $container = $(`
// //         <div class="product-analytics-container">
// //             <!-- Header Section -->
// //             <div class="analytics-header">
// //                 <div class="header-main">
// //                     <h1 class="page-title">📊 Product Analytics</h1>
// //                     <p class="page-subtitle">Real-time order tracking and analytics</p>
// //                 </div>
// //                 <div class="header-controls">
// //                     <button class="btn btn-primary btn-sm" id="start_auto_refresh">
// //                         <i class="fa fa-play"></i> Start Auto Refresh
// //                     </button>
// //                     <button class="btn btn-danger btn-sm" id="stop_auto_refresh" style="display: none;">
// //                         <i class="fa fa-stop"></i> Stop Auto Refresh
// //                     </button>
// //                     <button class="btn btn-default btn-sm" id="manual_refresh">
// //                         <i class="fa fa-refresh"></i> Refresh Now
// //                     </button>
// //                 </div>
// //             </div>

// //             <!-- Statistics Cards -->
// //             <div class="stats-cards-grid">
// //                 <div class="stat-card">
// //                     <div class="stat-icon total-orders">📦</div>
// //                     <div class="stat-info">
// //                         <div class="stat-value" id="stat_total_orders">0</div>
// //                         <div class="stat-label">Total Orders</div>
// //                     </div>
// //                 </div>
// //                 <div class="stat-card">
// //                     <div class="stat-icon total-items">🛍️</div>
// //                     <div class="stat-info">
// //                         <div class="stat-value" id="stat_total_items">0</div>
// //                         <div class="stat-label">Total Items</div>
// //                     </div>
// //                 </div>
// //                 <div class="stat-card">
// //                     <div class="stat-icon unique-customers">👥</div>
// //                     <div class="stat-info">
// //                         <div class="stat-value" id="stat_unique_customers">0</div>
// //                         <div class="stat-label">Unique Customers</div>
// //                     </div>
// //                 </div>
// //                 <div class="stat-card">
// //                     <div class="stat-icon pending-orders">⏳</div>
// //                     <div class="stat-info">
// //                         <div class="stat-value" id="stat_pending_orders">0</div>
// //                         <div class="stat-label">Pending Orders</div>
// //                     </div>
// //                 </div>
// //             </div>

// //             <!-- Status Bar -->
// //             <div class="status-bar">
// //                 <div class="status-info">
// //                     <i class="fa fa-info-circle"></i>
// //                     <span id="status_message">Ready to load data</span>
// //                 </div>
// //                 <div class="last-updated">
// //                     <i class="fa fa-clock-o"></i>
// //                     Last updated: <span id="last_updated_time">Never</span>
// //                 </div>
// //             </div>

// //             <!-- Orders Grid -->
// //             <div class="orders-grid-section">
// //                 <div class="section-header">
// //                     <h3>Active Orders</h3>
// //                     <div class="order-count">
// //                         <span class="count-badge" id="active_orders_count">0</span> orders
// //                     </div>
// //                 </div>
// //                 <div class="orders-grid" id="orders_grid_container">
// //                     <div class="empty-state">
// //                         <i class="fa fa-shopping-cart fa-3x"></i>
// //                         <h4>No Orders Found</h4>
// //                         <p>Start auto-refresh to load orders data</p>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     `);

// //     // Add CSS Styles
// //     $('<style>')
// //         .text(`
// //             .product-analytics-container {
// //                 padding: 20px;
// //                 max-width: 1400px;
// //                 margin: 0 auto;
// //                 background: #f8f9fa;
// //                 min-height: 100vh;
// //             }

// //             /* Header Styles */
// //             .analytics-header {
// //                 background: white;
// //                 padding: 25px 30px;
// //                 border-radius: 12px;
// //                 box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //                 margin-bottom: 25px;
// //                 display: flex;
// //                 justify-content: space-between;
// //                 align-items: center;
// //             }

// //             .page-title {
// //                 font-size: 28px;
// //                 font-weight: 700;
// //                 color: #2c3e50;
// //                 margin: 0 0 5px 0;
// //             }

// //             .page-subtitle {
// //                 color: #7f8c8d;
// //                 margin: 0;
// //                 font-size: 14px;
// //             }

// //             .header-controls {
// //                 display: flex;
// //                 gap: 10px;
// //             }

// //             /* Stats Cards */
// //             .stats-cards-grid {
// //                 display: grid;
// //                 grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //                 gap: 20px;
// //                 margin-bottom: 25px;
// //             }

// //             .stat-card {
// //                 background: white;
// //                 padding: 25px;
// //                 border-radius: 12px;
// //                 box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //                 display: flex;
// //                 align-items: center;
// //                 gap: 20px;
// //                 transition: transform 0.2s ease, box-shadow 0.2s ease;
// //             }

// //             .stat-card:hover {
// //                 transform: translateY(-2px);
// //                 box-shadow: 0 4px 15px rgba(0,0,0,0.15);
// //             }

// //             .stat-icon {
// //                 width: 60px;
// //                 height: 60px;
// //                 border-radius: 12px;
// //                 display: flex;
// //                 align-items: center;
// //                 justify-content: center;
// //                 font-size: 24px;
// //             }

// //             .stat-icon.total-orders { background: #e3f2fd; color: #1976d2; }
// //             .stat-icon.total-items { background: #e8f5e8; color: #2e7d32; }
// //             .stat-icon.unique-customers { background: #fff3e0; color: #f57c00; }
// //             .stat-icon.pending-orders { background: #ffebee; color: #d32f2f; }

// //             .stat-value {
// //                 font-size: 32px;
// //                 font-weight: 700;
// //                 color: #2c3e50;
// //                 line-height: 1;
// //                 margin-bottom: 5px;
// //             }

// //             .stat-label {
// //                 color: #7f8c8d;
// //                 font-size: 14px;
// //                 font-weight: 500;
// //             }

// //             /* Status Bar */
// //             .status-bar {
// //                 background: white;
// //                 padding: 15px 20px;
// //                 border-radius: 8px;
// //                 box-shadow: 0 1px 4px rgba(0,0,0,0.1);
// //                 margin-bottom: 25px;
// //                 display: flex;
// //                 justify-content: space-between;
// //                 align-items: center;
// //                 font-size: 13px;
// //             }

// //             .status-info {
// //                 display: flex;
// //                 align-items: center;
// //                 gap: 8px;
// //                 color: #5e6d77;
// //             }

// //             .last-updated {
// //                 color: #7f8c8d;
// //             }

// //             /* Orders Grid Section */
// //             .orders-grid-section {
// //                 background: white;
// //                 border-radius: 12px;
// //                 box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //                 overflow: hidden;
// //             }

// //             .section-header {
// //                 padding: 20px 25px;
// //                 border-bottom: 1px solid #e9ecef;
// //                 display: flex;
// //                 justify-content: space-between;
// //                 align-items: center;
// //             }

// //             .section-header h3 {
// //                 margin: 0;
// //                 color: #2c3e50;
// //                 font-size: 18px;
// //                 font-weight: 600;
// //             }

// //             .order-count {
// //                 color: #7f8c8d;
// //                 font-size: 14px;
// //             }

// //             .count-badge {
// //                 background: #3498db;
// //                 color: white;
// //                 padding: 4px 12px;
// //                 border-radius: 20px;
// //                 font-weight: 600;
// //                 font-size: 12px;
// //             }

// //             /* Orders Grid */
// //             .orders-grid {
// //                 padding: 0;
// //                 min-height: 400px;
// //             }

// //             .orders-list {
// //                 display: grid;
// //                 gap: 0;
// //             }

// //             .order-item {
// //                 padding: 20px 25px;
// //                 border-bottom: 1px solid #f8f9fa;
// //                 transition: background-color 0.2s ease;
// //             }

// //             .order-item:hover {
// //                 background: #f8f9fa;
// //             }

// //             .order-item:last-child {
// //                 border-bottom: none;
// //             }

// //             .order-header {
// //                 display: flex;
// //                 justify-content: space-between;
// //                 align-items: flex-start;
// //                 margin-bottom: 15px;
// //             }

// //             .order-customer {
// //                 font-size: 18px;
// //                 font-weight: 600;
// //                 color: #2c3e50;
// //                 margin: 0;
// //             }

// //             .order-meta {
// //                 display: flex;
// //                 gap: 15px;
// //                 align-items: center;
// //             }

// //             .order-number {
// //                 background: #6c757d;
// //                 color: white;
// //                 padding: 4px 12px;
// //                 border-radius: 20px;
// //                 font-size: 12px;
// //                 font-weight: 600;
// //             }

// //             .order-status {
// //                 padding: 4px 12px;
// //                 border-radius: 20px;
// //                 font-size: 12px;
// //                 font-weight: 600;
// //             }

// //             .status-pending { background: #fff3cd; color: #856404; }
// //             .status-completed { background: #d1edff; color: #004085; }

// //             .order-items {
// //                 margin-bottom: 15px;
// //             }

// //             .item-row {
// //                 display: flex;
// //                 justify-content: space-between;
// //                 align-items: center;
// //                 padding: 8px 0;
// //                 border-bottom: 1px dashed #e9ecef;
// //             }

// //             .item-row:last-child {
// //                 border-bottom: none;
// //             }

// //             .item-name {
// //                 font-weight: 500;
// //                 color: #2c3e50;
// //                 flex: 1;
// //             }

// //             .item-quantity {
// //                 background: #f8f9fa;
// //                 color: #495057;
// //                 padding: 4px 12px;
// //                 border-radius: 15px;
// //                 font-weight: 600;
// //                 font-size: 12px;
// //                 min-width: 50px;
// //                 text-align: center;
// //             }

// //             .order-actions {
// //                 text-align: right;
// //             }

// //             .btn-mark-done {
// //                 background: #28a745;
// //                 color: white;
// //                 border: none;
// //                 padding: 8px 20px;
// //                 border-radius: 6px;
// //                 font-weight: 500;
// //                 cursor: pointer;
// //                 transition: all 0.2s ease;
// //             }

// //             .btn-mark-done:hover {
// //                 background: #218838;
// //                 transform: translateY(-1px);
// //             }

// //             .btn-mark-done:disabled {
// //                 background: #6c757d;
// //                 cursor: not-allowed;
// //                 transform: none;
// //             }

// //             /* Empty State */
// //             .empty-state {
// //                 text-align: center;
// //                 padding: 60px 20px;
// //                 color: #6c757d;
// //             }

// //             .empty-state i {
// //                 margin-bottom: 20px;
// //                 opacity: 0.5;
// //             }

// //             .empty-state h4 {
// //                 margin: 0 0 10px 0;
// //                 color: #495057;
// //             }

// //             .empty-state p {
// //                 margin: 0;
// //                 font-size: 14px;
// //             }

// //             /* Loading State */
// //             .loading-state {
// //                 text-align: center;
// //                 padding: 60px 20px;
// //                 color: #007bff;
// //             }

// //             .loading-state i {
// //                 margin-bottom: 15px;
// //             }

// //             /* Responsive */
// //             @media (max-width: 768px) {
// //                 .product-analytics-container {
// //                     padding: 15px;
// //                 }

// //                 .analytics-header {
// //                     flex-direction: column;
// //                     gap: 15px;
// //                     text-align: center;
// //                 }

// //                 .stats-cards-grid {
// //                     grid-template-columns: 1fr;
// //                 }

// //                 .stat-card {
// //                     padding: 20px;
// //                 }

// //                 .status-bar {
// //                     flex-direction: column;
// //                     gap: 10px;
// //                     text-align: center;
// //                 }

// //                 .order-header {
// //                     flex-direction: column;
// //                     gap: 10px;
// //                     align-items: flex-start;
// //                 }

// //                 .order-meta {
// //                     flex-wrap: wrap;
// //                 }
// //             }
// //         `)
// //         .appendTo('head');

// //     // Add to page body
// //     page.main.append($container);

// //     // Store completed orders
// //     let completedOrders = new Set();

// //     // Fetch Sales Orders Data
// //     const fetchSalesOrders = () => {
// //         return new Promise((resolve, reject) => {
// //             frappe.call({
// //                 method: 'frappe.client.get_list',
// //                 args: {
// //                     doctype: 'Sales Order',
// //                     fields: [
// //                         'name',
// //                         'customer_name',
// //                         'status',
// //                         'grand_total',
// //                         'transaction_date',
// //                         'modified',
// //                         'items.item_name',
// //                         'items.qty',
// //                         'items.rate',
// //                         'items.amount'
// //                     ],
// //                     filters: [
// //                         ['docstatus', '=', 1],
// //                         ['status', '!=', 'Completed'],
// //                         ['status', '!=', 'Cancelled']
// //                     ],
// //                     limit_page_length: 50,
// //                     order_by: 'modified desc'
// //                 },
// //                 callback: function(response) {
// //                     if (response.message) {
// //                         resolve(response.message);
// //                     } else {
// //                         reject(new Error('No data received from server'));
// //                     }
// //                 },
// //                 error: function(err) {
// //                     reject(err);
// //                 }
// //             });
// //         });
// //     };

// //     // Process Orders Data
// //     const processOrdersData = (orders) => {
// //         if (!orders || orders.length === 0) return [];
// //         return orders
// //             .filter(order => !completedOrders.has(order.name))
// //             .map(order => ({
// //                 name: order.name,
// //                 customer_name: order.customer_name || 'Walk-in Customer',
// //                 status: order.status || 'Draft',
// //                 grand_total: order.grand_total || 0,
// //                 transaction_date: order.transaction_date,
// //                 modified: order.modified,
// //                 items: (order.items || []).map(item => ({
// //                     item_name: item.item_name || 'Unnamed Item',
// //                     qty: item.qty || 0,
// //                     rate: item.rate || 0,
// //                     amount: item.amount || 0
// //                 }))
// //             }));
// //     };
// //     // Update Statistics
// //     const updateStatistics = (orders) => {
// //         if (!orders || orders.length === 0) {
// //             $('#stat_total_orders').text('0');
// //             $('#stat_total_items').text('0');
// //             $('#stat_unique_customers').text('0');
// //             $('#stat_pending_orders').text('0');
// //             return;
// //         }

// //         const totalOrders = orders.length;
// //         const totalItems = orders.reduce((sum, order) => 
// //             sum + order.items.reduce((itemSum, item) => itemSum + (item.qty || 0), 0), 0);
// //         const uniqueCustomers = new Set(orders.map(order => order.customer_name)).size;
// //         const pendingOrders = orders.filter(order => order.status === 'To Deliver' || order.status === 'To Bill').length;

// //         $('#stat_total_orders').text(totalOrders);
// //         $('#stat_total_items').text(totalItems);
// //         $('#stat_unique_customers').text(uniqueCustomers);
// //         $('#stat_pending_orders').text(pendingOrders);
// //     };

// //     // Render Orders List
// //     const renderOrdersList = (orders) => {
// //         const $container = $('#orders_grid_container');

// //         if (!orders || orders.length === 0) {
// //             $container.html(`
// //                 <div class="empty-state">
// //                     <i class="fa fa-shopping-cart fa-3x"></i>
// //                     <h4>No Active Orders</h4>
// //                     <p>All orders are completed or no orders found</p>
// //                 </div>
// //             `);
// //             $('#active_orders_count').text('0');
// //             return;
// //         }

// //         $('#active_orders_count').text(orders.length);
// //         const ordersHtml = orders.map(order => {
// //             const itemsHtml = order.items.map(item => `
// //                 <div class="item-row">
// //                     <div class="item-name">${item.item_name}</div>
// //                     <div class="item-quantity">${item.qty} x ₹${item.rate}</div>
// //                 </div>
// //             `).join('');

// //             const orderDate = order.transaction_date ? 
// //                 frappe.datetime.str_to_user(order.transaction_date) : 'Not specified';

// //             return `
// //                 <div class="order-item">
// //                     <div class="order-header">
// //                         <h3 class="order-customer">${order.customer_name}</h3>
// //                         <div class="order-meta">
// //                             <span class="order-number">${order.name}</span>
// //                             <span class="order-status status-${order.status.toLowerCase().replace(' ', '-')}">
// //                                 ${order.status}
// //                             </span>
// //                         </div>
// //                     </div>
                    
// //                     <div class="order-items">
// //                         ${itemsHtml}
// //                     </div>
                    
// //                     <div class="order-footer">
// //                         <div class="order-details">
// //                             <small class="text-muted">Order Date: ${orderDate} | Total: ₹${order.grand_total}</small>
// //                         </div>
// //                         <div class="order-actions">
// //                             <button class="btn-mark-done" data-order-name="${order.name}">
// //                                 <i class="fa fa-check"></i> Mark as Completed
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             `;
// //         }).join('');

// //         $container.html(`<div class="orders-list">${ordersHtml}</div>`);
// //     };

// //     // Update Status Message
// //     const updateStatusMessage = (message, type = 'info') => {
// //         const icon = type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle';
// //         const color = type === 'error' ? '#dc3545' : '#5e6d77';
        
// //         $('#status_message').html(`
// //             <i class="fa ${icon}" style="color: ${color}"></i>
// //             ${message}
// //         `);
// //     };

// //     // Update Last Refreshed Time
// //     const updateLastRefreshedTime = () => {
// //         const now = frappe.datetime.now_datetime();
// //         $('#last_updated_time').text(now);
// //     };

// //     // Main Data Fetch Function
// //     const fetchAndRenderData = () => {
// //         // Show loading state
// //         $('#orders_grid_container').html(`
// //             <div class="loading-state">
// //                 <i class="fa fa-spinner fa-spin fa-2x"></i>
// //                 <p>Loading orders data...</p>
// //             </div>
// //         `);

// //         updateStatusMessage('Fetching latest orders data...');

// //         fetchSalesOrders()
// //             .then(orders => {
// //                 const processedOrders = processOrdersData(orders);
// //                 updateStatistics(processedOrders);
// //                 renderOrdersList(processedOrders);
// //                 updateLastRefreshedTime();
// //                 updateStatusMessage(`Loaded ${processedOrders.length} active orders successfully`);
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching orders:', error);
// //                 $('#orders_grid_container').html(`
// //                     <div class="empty-state">
// //                         <i class="fa fa-exclamation-triangle fa-3x text-danger"></i>
// //                         <h4 class="text-danger">Error Loading Data</h4>
// //                         <p>Failed to fetch orders data. Please try again.</p>
// //                         <button class="btn btn-secondary btn-sm mt-2" onclick="fetchAndRenderData()">
// //                             <i class="fa fa-refresh"></i> Retry
// //                         </button>
// //                     </div>
// //                 `);
// //                 updateStatusMessage('Error loading orders data', 'error');
// //             });
// //     };

// //     // Auto Refresh Controls
// //     const startAutoRefresh = () => {
// //         if (autoRefreshInterval) {
// //             clearInterval(autoRefreshInterval);
// //         }
        
// //         fetchAndRenderData(); // Initial fetch
// //         autoRefreshInterval = setInterval(fetchAndRenderData, REFRESH_INTERVAL_MS);
        
// //         $('#start_auto_refresh').hide();
// //         $('#stop_auto_refresh').show();
// //         updateStatusMessage(`Auto-refresh enabled (every ${REFRESH_INTERVAL_MS/1000}s)`);
// //     };

// //     const stopAutoRefresh = () => {
// //         if (autoRefreshInterval) {
// //             clearInterval(autoRefreshInterval);
// //             autoRefreshInterval = null;
// //         }
        
// //         $('#start_auto_refresh').show();
// //         $('#stop_auto_refresh').hide();
// //         updateStatusMessage('Auto-refresh disabled');
// //     };

// //     // Mark Order as Completed
// //     const markOrderAsCompleted = (orderName) => {
// //         frappe.confirm(
// //             `Are you sure you want to mark order <b>${orderName}</b> as completed?`,
// //             () => {
// //                 frappe.call({
// //                     method: 'frappe.client.set_value',
// //                     args: {
// //                         doctype: 'Sales Order',
// //                         name: orderName,
// //                         fieldname: {
// //                             status: 'Completed'
// //                         }
// //                     },
// //                     callback: function(response) {
// //                         if (response.message) {
// //                             completedOrders.add(orderName);
// //                             frappe.show_alert({
// //                                 message: `Order ${orderName} marked as completed successfully!`,
// //                                 indicator: 'green'
// //                             });
// //                             fetchAndRenderData(); // Refresh the list
// //                         } else {
// //                             frappe.show_alert({
// //                                 message: `Failed to update order ${orderName}`,
// //                                 indicator: 'red'
// //                             });
// //                         }
// //                     },
// //                     error: function(err) {
// //                         console.error('Error updating order:', err);
// //                         frappe.show_alert({
// //                             message: `Error updating order ${orderName}`,
// //                             indicator: 'red'
// //                         });
// //                     }
// //                 });
// //             }
// //         );
// //     };

// //     // Event Handlers
// //     $('#start_auto_refresh').on('click', startAutoRefresh);
// //     $('#stop_auto_refresh').on('click', stopAutoRefresh);
// //     $('#manual_refresh').on('click', fetchAndRenderData);

// //     // Delegate event for mark as done buttons
// //     $container.on('click', '.btn-mark-done', function() {
// //         const orderName = $(this).data('order-name');
// //         markOrderAsCompleted(orderName);
// //     });

// //     // Initialize the page
// //     startAutoRefresh();

// //     // Cleanup on page close
// //     page.on_close = () => {
// //         if (autoRefreshInterval) {
// //             clearInterval(autoRefreshInterval);
// //         }
// //     };
// // };




frappe.pages['product-analytics'].on_page_load = function(wrapper) {
    const REFRESH_INTERVAL_MS = 10000;
    let autoRefreshInterval;

    // Create Page
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: __('🍽️ Product Order Analysis'),
        single_column: true
    });

    // Page content container
    let $container = $(`
        <div class="product-analytics-container">
            <!-- Header Section -->
            <div class="analytics-header">
                <div class="header-main">
                    <h1 class="page-title">🍽️ Product Order Analysis
                    </h1>
                    <p class="page-subtitle">Real-time order tracking and analytics</p>
                </div>
                <div class="header-controls">
                    <button class="btn btn-primary btn-sm" id="start_auto_refresh">
                        <i class="fa fa-play"></i> Start Auto Refresh
                    </button>
                    <button class="btn btn-danger btn-sm" id="stop_auto_refresh" style="display: none;">
                        <i class="fa fa-stop"></i> Stop Auto Refresh
                    </button>
                    <button class="btn btn-default btn-sm" id="manual_refresh">
                        <i class="fa fa-refresh"></i> Refresh Now
                    </button>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="stats-cards-grid">
                <div class="stat-card">
                    <div class="stat-icon total-orders">📦</div>
                    <div class="stat-info">
                        <div class="stat-value" id="stat_total_orders">0</div>
                        <div class="stat-label">Total Orders</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon total-items">🛍️</div>
                    <div class="stat-info">
                        <div class="stat-value" id="stat_total_items">0</div>
                        <div class="stat-label">Total Items</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon unique-customers">👥</div>
                    <div class="stat-info">
                        <div class="stat-value" id="stat_unique_customers">0</div>
                        <div class="stat-label">Unique Customers</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon pending-orders">⏳</div>
                    <div class="stat-info">
                        <div class="stat-value" id="stat_pending_orders">0</div>
                        <div class="stat-label">Pending Orders</div>
                    </div>
                </div>
            </div>

            <!-- Status Bar -->
            <div class="status-bar">
                <div class="status-info">
                    <span id="status_message">Ready to load data</span>
                </div>
                <div class="last-updated">
                    <i class="fa fa-clock-o"></i>
                    Last updated: <span id="last_updated_time">Never</span>
                </div>
            </div>

            <!-- Orders Grid -->
            <div class="orders-grid-section">
                <div class="section-header">
                    <h3>All Sales Orders</h3>
                    <div class="order-count">
                        <span class="count-badge" id="active_orders_count">0</span> orders
                    </div>
                </div>
                <div class="orders-grid" id="orders_grid_container">
                    <div class="empty-state">
                        <i class="fa fa-shopping-cart fa-3x"></i>
                        <h4>No Orders Found</h4>
                        <p>Start auto-refresh to load orders data</p>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Add CSS Styles (same as before)
    $('<style>')
        .text(`
            .product-analytics-container {
                padding: 20px;
                max-width: 1400px;
                margin: 0 auto;
                background: #D5C7FF;
                min-height: 100vh;
            }

            .analytics-header {
                background: white;
                padding: 25px 30px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                margin-bottom: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .page-title {
                font-size: 28px;
                font-weight: 700;
                color: #2c3e50;
                margin: 0 0 5px 0;
            }

            .page-subtitle {
                color: #7f8c8d;
                margin: 0;
                font-size: 14px;
            }

            .header-controls {
                display: flex;
                gap: 10px;
            }

            .stats-cards-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 25px;
            }

            .stat-card {
                background: white;
                padding: 25px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 20px;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }

            .stat-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }

            .stat-icon {
                width: 60px;
                height: 60px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
            }

            .stat-icon.total-orders { background: #e3f2fd; color: #1976d2; }
            .stat-icon.total-items { background: #e8f5e8; color: #2e7d32; }
            .stat-icon.unique-customers { background: #fff3e0; color: #f57c00; }
            .stat-icon.pending-orders { background: #ffebee; color: #d32f2f; }

            .stat-value {
                font-size: 32px;
                font-weight: 700;
                color: #2c3e50;
                line-height: 1;
                margin-bottom: 5px;
            }

            .stat-label {
                color: #7f8c8d;
                font-size: 14px;
                font-weight: 500;
            }

            .status-bar {
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                margin-bottom: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 13px;
            }

            .status-info {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #5e6d77;
            }

            .last-updated {
                color: #7f8c8d;
            }

            .orders-grid-section {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                overflow: hidden;
            }

            .section-header {
                padding: 20px 25px;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .section-header h3 {
                margin: 0;
                color: #2c3e50;
                font-size: 18px;
                font-weight: 600;
            }

            .order-count {
                color: #7f8c8d;
                font-size: 14px;
            }

            .count-badge {
                background: #3498db;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 12px;
            }

            .orders-grid {
                padding: 0;
                min-height: 400px;
            }

            .orders-list {
                display: grid;
                gap: 0;
            }

            .order-item {
                padding: 20px 25px;
                border-bottom: 1px solid #f8f9fa;
                transition: background-color 0.2s ease;
            }

            .order-item:hover {
                background: #f8f9fa;
            }

            .order-item:last-child {
                border-bottom: none;
            }

            .order-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
            }

            .order-customer {
                font-size: 18px;
                font-weight: 600;
                color: #2c3e50;
                margin: 0;
            }

            .order-meta {
                display: flex;
                gap: 15px;
                align-items: center;
            }

            .order-number {
                background: #6c757d;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }

            .order-status {
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }

            .status-draft { background: #f8f9fa; color: #6c757d; }
            .status-submitted { background: #d1edff; color: #004085; }
            .status-pending { background: #fff3cd; color: #856404; }
            .status-completed { background: #d4edda; color: #155724; }
            .status-cancelled { background: #f8d7da; color: #721c24; }

            .order-items {
                margin-bottom: 15px;
            }

            .item-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px dashed #e9ecef;
            }

            .item-row:last-child {
                border-bottom: none;
            }

            .item-name {
                font-weight: 500;
                color: #2c3e50;
                flex: 1;
            }

            .item-quantity {
                background: #f8f9fa;
                color: #495057;
                padding: 4px 12px;
                border-radius: 15px;
                font-weight: 600;
                font-size: 12px;
                min-width: 50px;
                text-align: center;
            }

            .order-actions {
                text-align: right;
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            }

            .btn-mark-done {
                background: #28a745;
                color: white;
                border: none;
                padding: 8px 20px;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .btn-mark-done:hover {
                background: #218838;
                transform: translateY(-1px);
            }

            .btn-mark-done:disabled {
                background: #6c757d;
                cursor: not-allowed;
                transform: none;
            }

            .btn-submit {
                background: #007bff;
                color: white;
                border: none;
                padding: 8px 20px;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .btn-submit:hover {
                background: #0056b3;
                transform: translateY(-1px);
            }

            .empty-state {
                text-align: center;
                padding: 60px 20px;
                color: #6c757d;
            }

            .empty-state i {
                margin-bottom: 20px;
                opacity: 0.5;
            }

            .empty-state h4 {
                margin: 0 0 10px 0;
                color: #495057;
            }

            .empty-state p {
                margin: 0;
                font-size: 14px;
            }

            .loading-state {
                text-align: center;
                padding: 60px 20px;
                color: #007bff;
            }

            .loading-state i {
                margin-bottom: 15px;
            }

            @media (max-width: 768px) {
                .product-analytics-container {
                    padding: 15px;
                }

                .analytics-header {
                    flex-direction: column;
                    gap: 15px;
                    text-align: center;
                }

                .stats-cards-grid {
                    grid-template-columns: 1fr;
                }

                .stat-card {
                    padding: 20px;
                }

                .status-bar {
                    flex-direction: column;
                    gap: 10px;
                    text-align: center;
                }

                .order-header {
                    flex-direction: column;
                    gap: 10px;
                    align-items: flex-start;
                }

                .order-meta {
                    flex-wrap: wrap;
                }

                .order-actions {
                    flex-direction: column;
                    width: 100%;
                }
            }
        `)
        .appendTo('head');

    // Add to page body
    page.main.append($container);

    // Store completed orders
    let completedOrders = new Set();
    let submittedOrders = new Set();

    // Fetch ALL Sales Orders Data
    const fetchSalesOrders = () => {
        return new Promise((resolve, reject) => {
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Sales Order',
                    fields: [
                        'name',
                        'customer_name',
                        'status',
                        'grand_total',
                        'transaction_date',
                        'modified',
                        'docstatus'
                    ],
                    filters: [
                        ['status', '!=', 'Cancelled']
                    ],
                    limit_page_length: 100,
                    order_by: 'modified desc'
                },
                callback: function(response) {
                    if (response.message) {
                        resolve(response.message);
                    } else {
                        reject(new Error('No data received from server'));
                    }
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    };

    // Get items for a specific order
    const getOrderItems = (orderName) => {
        return new Promise((resolve) => {
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Sales Order Item',
                    fields: [
                        'item_code',
                        'item_name',
                        'qty',
                        'rate',
                        'amount',
                        'warehouse'
                    ],
                    filters: [
                        ['parent', '=', orderName]
                    ],
                    limit_page_length: 100
                },
                callback: function(response) {
                    resolve(response.message || []);
                },
                error: function() {
                    resolve([]);
                }
            });
        });
    };

    // Process Orders Data
    const processOrdersData = (orders) => {
        if (!orders || orders.length === 0) return [];
        
        return orders
            .filter(order => !completedOrders.has(order.name))
            .map(order => ({
                name: order.name,
                customer_name: order.customer_name || 'Walk-in Customer',
                status: order.status || 'Draft',
                docstatus: order.docstatus || 0,
                grand_total: order.grand_total || 0,
                transaction_date: order.transaction_date,
                modified: order.modified,
                items: [] 
            }));
    };

    // Update Statistics
    const updateStatistics = (orders) => {
        if (!orders || orders.length === 0) {
            $('#stat_total_orders').text('0');
            $('#stat_total_items').text('0');
            $('#stat_unique_customers').text('0');
            $('#stat_pending_orders').text('0');
            return;
        }

        const totalOrders = orders.length;
        const totalItems = orders.reduce((sum, order) => 
            sum + order.items.reduce((itemSum, item) => itemSum + (item.qty || 0), 0), 0);
        const uniqueCustomers = new Set(orders.map(order => order.customer_name)).size;
        const pendingOrders = orders.filter(order => 
            order.status === 'Draft' || order.status === 'To Deliver' || order.status === 'To Bill'
        ).length;

        $('#stat_total_orders').text(totalOrders);
        $('#stat_total_items').text(totalItems);
        $('#stat_unique_customers').text(uniqueCustomers);
        $('#stat_pending_orders').text(pendingOrders);
    };

    // Render Orders List
    const renderOrdersList = (orders) => {
        const $container = $('#orders_grid_container');

        if (!orders || orders.length === 0) {
            $container.html(`
                <div class="empty-state">
                    <i class="fa fa-shopping-cart fa-3x"></i>
                    <h4>No Orders Found</h4>
                    <p>No sales orders found in the system</p>
                </div>
            `);
            $('#active_orders_count').text('0');
            return;
        }

        $('#active_orders_count').text(orders.length);
        
        const ordersHtml = orders.map(order => {
            const itemsHtml = order.items.map(item => `
                <div class="item-row">
                    <div class="item-name">${frappe.utils.escape_html(item.item_name)} (${frappe.utils.escape_html(item.item_code)})</div>
                    <div class="item-quantity">${item.qty} x ₹${item.rate}</div>
                </div>
            `).join('');

            const orderDate = order.transaction_date ? 
                frappe.datetime.str_to_user(order.transaction_date) : 'Not specified';

            // Show appropriate buttons based on order status
            let actionButtons = '';
            
            if (order.docstatus === 0) { 
                actionButtons = `
                    <button class="btn-submit" data-order-name="${order.name}">
                        <i class="fa fa-check-circle"></i> Submit Order
                    </button>
                    <button class="btn-mark-done" data-order-name="${order.name}">
                        <i class="fa fa-check"></i> Mark Completed
                    </button>
                `;
            } else if (order.docstatus === 1 && order.status !== 'Completed') { 
                actionButtons = `
                    <button class="btn-mark-done" data-order-name="${order.name}">
                        <i class="fa fa-check"></i> Mark Completed
                    </button>
                `;
            } else if (order.status === 'Completed') { 
                actionButtons = `
                    <button class="btn-mark-done" disabled style="background: #6c757d;">
                        <i class="fa fa-check"></i> Already Completed
                    </button>
                `;
            }
            return `
                <div class="order-item">
                    <div class="order-header">
                        <h3 class="order-customer">${frappe.utils.escape_html(order.customer_name)}</h3>
                        <div class="order-meta">
                            <span class="order-number">${order.name}</span>
                            <span class="order-status status-${order.status.toLowerCase().replace(' ', '-')}">
                                ${order.status} ${order.docstatus === 0 ? '(Draft)' : '(Submitted)'}
                            </span>
                        </div>
                    </div>
                    
                    <div class="order-items">
                        ${itemsHtml}
                    </div>
                    
                    <div class="order-footer">
                        <div class="order-details">
                            <small class="text-muted">Order Date: ${orderDate} | Total: ₹${order.grand_total} | Modified: ${frappe.datetime.str_to_user(order.modified)}</small>
                        </div>
                        <div class="order-actions">
                            ${actionButtons}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        $container.html(`<div class="orders-list">${ordersHtml}</div>`);
    };

    // Update Status Message
    const updateStatusMessage = (message, type = 'info') => {
        const icon = type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle';
        const color = type === 'error' ? '#dc3545' : '#5e6d77';
        
        $('#status_message').html(`
            <i class="fa ${icon}" style="color: ${color}"></i>
            ${message}
        `);
    };

    // Update Last Refreshed Time
    const updateLastRefreshedTime = () => {
        const now = frappe.datetime.now_datetime();
        $('#last_updated_time').text(now);
    };

    // Main Data Fetch Function
    const fetchAndRenderData = () => {
        // Show loading state
        $('#orders_grid_container').html(`
            <div class="loading-state">
                <i class="fa fa-spinner fa-spin fa-2x"></i>
                <p>Loading orders data...</p>
            </div>
        `);

        updateStatusMessage('Fetching latest orders data...');

        fetchSalesOrders()
            .then(orders => {
                const processedOrders = processOrdersData(orders);
                
                // Get items for each order sequentially to avoid permission issues
                const getItemsForAllOrders = async () => {
                    for (let order of processedOrders) {
                        order.items = await getOrderItems(order.name);
                    }
                    return processedOrders;
                };

                return getItemsForAllOrders();
            })
            .then(ordersWithItems => {
                updateStatistics(ordersWithItems);
                renderOrdersList(ordersWithItems);
                updateLastRefreshedTime();
                updateStatusMessage(`Loaded ${ordersWithItems.length} orders successfully`);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                $('#orders_grid_container').html(`
                    <div class="empty-state">
                        <i class="fa fa-exclamation-triangle fa-3x text-danger"></i>
                        <h4 class="text-danger">Error Loading Data</h4>
                        <p>Failed to fetch orders data. Please try again.</p>
                        <button class="btn btn-secondary btn-sm mt-2" onclick="fetchAndRenderData()">
                            <i class="fa fa-refresh"></i> Retry
                        </button>
                    </div>
                `);
                updateStatusMessage('Error loading orders data', 'error');
            });
    };

    // Auto Refresh Controls
    const startAutoRefresh = () => {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
        }
        
        fetchAndRenderData();
        autoRefreshInterval = setInterval(fetchAndRenderData, REFRESH_INTERVAL_MS);
        
        $('#start_auto_refresh').hide();
        $('#stop_auto_refresh').show();
        updateStatusMessage(`Auto-refresh enabled (every ${REFRESH_INTERVAL_MS/1000}s)`);
    };

    const stopAutoRefresh = () => {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
        
        $('#start_auto_refresh').show();
        $('#stop_auto_refresh').hide();
        updateStatusMessage('Auto-refresh disabled');
    };

    // PERFECTED: Submit Draft Order - FIXED VERSION
   const submitOrder = (orderName) => {
    frappe.confirm(
        `Are you sure you want to submit order <b>${orderName}</b>?`,
        () => {
            const $btn = $(`.btn-submit[data-order-name="${orderName}"]`);
            $btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Submitting...');

            // Step 1: Fetch the latest Sales Order
            frappe.call({
                method: 'frappe.client.get',
                args: {
                    doctype: 'Sales Order',
                    name: orderName
                },
                callback: function(res) {
                    if (!res.message) {
                        frappe.show_alert({
                            message: `Failed to load latest version of order ${orderName}.`,
                            indicator: 'red'
                        });
                        $btn.prop('disabled', false).html('<i class="fa fa-check-circle"></i> Submit Order');
                        return;
                    }
                    let doc = res.message;
                    // Step 2: Submit the fetched document
                    frappe.call({
                        method: 'frappe.client.submit',
                        args: {
                            doc: doc
                        },
                        callback: function(response) {
                            if (response.message) {
                                frappe.show_alert({
                                    message: `Order ${orderName} submitted successfully!`,
                                    indicator: 'green'
                                });
                                submittedOrders.add(orderName);
                                setTimeout(() => fetchAndRenderData(), 1000);
                            } else {
                                frappe.show_alert({
                                    message: `Failed to submit order ${orderName}.`,
                                    indicator: 'red'
                                });
                            }
                            $btn.prop('disabled', false).html('<i class="fa fa-check-circle"></i> Submit Order');
                        },
                        error: function(err) {
                            console.error('Error submitting order:', err);
                            frappe.show_alert({
                                message: `Error submitting order ${orderName}. Please try again.`,
                                indicator: 'red'
                            });
                            $btn.prop('disabled', false).html('<i class="fa fa-check-circle"></i> Submit Order');
                        }
                    });
                },
                error: function(err) {
                    console.error('Error fetching document:', err);
                    frappe.show_alert({
                        message: `Could not fetch latest order ${orderName}.`,
                        indicator: 'red'
                    });
                    $btn.prop('disabled', false).html('<i class="fa fa-check-circle"></i> Submit Order');
                }
            });
        }
    );
};
    // Mark Order as Completed
    const markOrderAsCompleted = (orderName) => {
        frappe.confirm(
            `Are you sure you want to mark order <b>${orderName}</b> as completed?`,
            () => {
                // Show loading on button
                $(`.btn-mark-done[data-order-name="${orderName}"]`)
                    .prop('disabled', true)
                    .html('<i class="fa fa-spinner fa-spin"></i> Processing...');
                // Use Frappe's built-in set_value method
                frappe.call({
                    method: 'frappe.client.set_value',
                    args: {
                        doctype: 'Sales Order',
                        name: orderName,
                        fieldname: 'status',
                        value: 'Completed'
                    },
                    callback: function(response) {
                        if (response.message) {
                            completedOrders.add(orderName);
                            frappe.show_alert({
                                message: `Order ${orderName} marked as completed successfully!`,
                                indicator: 'green'
                            });
                            // Refresh the data to get latest document state
                            setTimeout(() => {
                                fetchAndRenderData();
                            }, 1000);
                        } else {
                            frappe.show_alert({
                                message: `Failed to update order ${orderName}. Please try again.`,
                                indicator: 'red'
                            });
                            // Re-enable button on error
                            $(`.btn-mark-done[data-order-name="${orderName}"]`)
                                .prop('disabled', false)
                                .html('<i class="fa fa-check"></i> Mark Completed');
                        }
                    },
                    error: function(err) {
                        console.error('Error updating order:', err);
                        
                        let errorMessage = `Error updating order ${orderName}. Please try again.`;
                        
                        frappe.show_alert({
                            message: errorMessage,
                            indicator: 'red'
                        });
                        
                        // Re-enable button on error
                        $(`.btn-mark-done[data-order-name="${orderName}"]`)
                            .prop('disabled', false)
                            .html('<i class="fa fa-check"></i> Mark Completed');
                    }
                });
            },
            () => {
            }
        );
    };

    // Event Handlers
    $('#start_auto_refresh').on('click', startAutoRefresh);
    $('#stop_auto_refresh').on('click', stopAutoRefresh);
    $('#manual_refresh').on('click', fetchAndRenderData);

    // Delegate events for buttons
    $container.on('click', '.btn-mark-done', function() {
        const orderName = $(this).data('order-name');
        if (!$(this).prop('disabled')) {
            markOrderAsCompleted(orderName);
        }
    });

    $container.on('click', '.btn-submit', function() {
        const orderName = $(this).data('order-name');
        submitOrder(orderName);
    });

    // Initialize the page
    startAutoRefresh();

    // Cleanup on page close
    page.on_close = () => {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
        }
    };
};