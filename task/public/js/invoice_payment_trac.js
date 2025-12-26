// frappe.pages['invoice-payment-trac'].on_page_load = function(wrapper) {
//     var page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Invoice Payment Tracker',
//         single_column: true
//     });

//     // Initialize the page
//     $(wrapper).find('.layout-main-section').empty();
//     new InvoicePaymentTracker(page, wrapper);
// }

// class InvoicePaymentTracker {
//     constructor(page, wrapper) {
//         this.page = page;
//         this.wrapper = wrapper;
//         this.filters = {};
//         this.init();
//     }

//     init() {
//         this.setup_filters();
//         this.setup_grid();
//         this.load_data();
//         this.setup_events();
//     }

//     setup_filters() {
//         let me = this;
        
//         // Filter section
//         this.filter_section = $(`
//             <div class="row filter-section" style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="payment_type">Payment Type</label>
//                         <select class="form-control" id="payment_type">
//                             <option value="">All</option>
//                             <option value="Receive">Receive</option>
//                             <option value="Pay">Pay</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="party_type">Party Type</label>
//                         <select class="form-control" id="party_type">
//                             <option value="">All</option>
//                             <option value="Customer">Customer</option>
//                             <option value="Supplier">Supplier</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="party">Party</label>
//                         <input type="text" class="form-control" id="party" placeholder="Party Name">
//                     </div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="from_date">From Date</label>
//                         <input type="date" class="form-control" id="from_date">
//                     </div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="to_date">To Date</label>
//                         <input type="date" class="form-control" id="to_date">
//                     </div>
//                 </div>
//                 <div class="col-sm-2" style="padding-top: 25px;">
//                     <button class="btn btn-primary btn-sm" id="apply-filters">Apply Filters</button>
//                     <button class="btn btn-default btn-sm" id="reset-filters">Reset</button>
//                     <button class="btn btn-default btn-sm" id="refresh-data">
//                         <i class="fa fa-refresh"></i> Refresh
//                     </button>
//                 </div>
//             </div>
//         `).appendTo($(this.wrapper).find('.layout-main-section'));

//         // Summary cards
//         this.summary_section = $(`
//             <div class="row summary-section" style="margin-bottom: 20px;">
//                 <div class="col-sm-3">
//                     <div class="widget-counter" style="background: #e8f5e8; padding: 15px; border-radius: 5px; text-align: center;">
//                         <h4 style="margin: 0; color: #2e7d32;" id="total-payments">0</h4>
//                         <small>Total Payments</small>
//                     </div>
//                 </div>
//                 <div class="col-sm-3">
//                     <div class="widget-counter" style="background: #e3f2fd; padding: 15px; border-radius: 5px; text-align: center;">
//                         <h4 style="margin: 0; color: #1565c0;" id="total-received">₹0</h4>
//                         <small>Total Received</small>
//                     </div>
//                 </div>
//                 <div class="col-sm-3">
//                     <div class="widget-counter" style="background: #ffebee; padding: 15px; border-radius: 5px; text-align: center;">
//                         <h4 style="margin: 0; color: #c62828;" id="total-paid">₹0</h4>
//                         <small>Total Paid</small>
//                     </div>
//                 </div>
//                 <div class="col-sm-3">
//                     <div class="widget-counter" style="background: #f3e5f5; padding: 15px; border-radius: 5px; text-align: center;">
//                         <h4 style="margin: 0; color: #7b1fa2;" id="total-amount">₹0</h4>
//                         <small>Total Amount</small>
//                     </div>
//                 </div>
//             </div>
//         `).appendTo($(this.wrapper).find('.layout-main-section'));
//     }

//     setup_grid() {
//         let me = this;
        
//         this.grid_section = $(`
//             <div class="grid-section">
//                 <div class="row">
//                     <div class="col-sm-12">
//                         <div class="table-responsive">
//                             <table class="table table-bordered table-hover" id="payment-tracker-table">
//                                 <thead style="background: #f0f0f0;">
//                                     <tr>
//                                         <th>Payment ID</th>
//                                         <th>Posting Date</th>
//                                         <th>Payment Type</th>
//                                         <th>Party Type</th>
//                                         <th>Party</th>
//                                         <th>Paid Amount</th>
//                                         <th>Received Amount</th>
//                                         <th>Mode of Payment</th>
//                                         <th>Status</th>
//                                         <th>References</th>
//                                         <th>Company</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody id="payment-tracker-body">
//                                     <!-- Data will be loaded here -->
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `).appendTo($(this.wrapper).find('.layout-main-section'));

//         // Loading indicator
//         this.loading_indicator = $(`
//             <div class="text-center" id="loading-indicator" style="display: none;">
//                 <i class="fa fa-spinner fa-spin fa-2x"></i>
//                 <p>Loading payment data...</p>
//             </div>
//         `).appendTo($(this.wrapper).find('.layout-main-section'));
//     }

//     setup_events() {
//         let me = this;

//         // Apply filters
//         $('#apply-filters').on('click', function() {
//             me.apply_filters();
//         });

//         // Reset filters
//         $('#reset-filters').on('click', function() {
//             me.reset_filters();
//         });

//         // Refresh data
//         $('#refresh-data').on('click', function() {
//             me.load_data();
//         });

//         // Enter key in filter fields
//         $('#party, #from_date, #to_date').on('keypress', function(e) {
//             if (e.which == 13) {
//                 me.apply_filters();
//             }
//         });
//     }

//     apply_filters() {
//         this.filters = {
//             payment_type: $('#payment_type').val(),
//             party_type: $('#party_type').val(),
//             party: $('#party').val(),
//             from_date: $('#from_date').val(),
//             to_date: $('#to_date').val()
//         };
//         this.load_data();
//     }

//     reset_filters() {
//         $('#payment_type').val('');
//         $('#party_type').val('');
//         $('#party').val('');
//         $('#from_date').val('');
//         $('#to_date').val('');
//         this.filters = {};
//         this.load_data();
//     }

//     load_data() {
//         let me = this;
        
//         // Show loading
//         $('#loading-indicator').show();
//         $('#payment-tracker-body').html('');

//         // Get Payment Entry data directly
//         this.get_payment_data().then(function(payments) {
//             me.process_payment_data(payments);
//         }).catch(function(error) {
//             $('#loading-indicator').hide();
//             console.error('Error loading payment data:', error);
//             me.show_error_message('Failed to load payment data. Please check your permissions.');
//         });
//     }

//     get_payment_data() {
//         let me = this;
        
//         return new Promise(function(resolve, reject) {
//             try {
//                 // Build filters for Payment Entry
//                 let filters = {};
                
//                 if (me.filters.payment_type) {
//                     filters.payment_type = me.filters.payment_type;
//                 }
//                 if (me.filters.party_type) {
//                     filters.party_type = me.filters.party_type;
//                 }
//                 if (me.filters.party) {
//                     filters.party = ['like', `%${me.filters.party}%`];
//                 }
//                 if (me.filters.from_date) {
//                     filters.posting_date = ['>=', me.filters.from_date];
//                 }
//                 if (me.filters.to_date) {
//                     if (filters.posting_date) {
//                         filters.posting_date = ['between', [me.filters.from_date, me.filters.to_date]];
//                     } else {
//                         filters.posting_date = ['<=', me.filters.to_date];
//                     }
//                 }

//                 // Get Payment Entries using direct database method
//                 frappe.db.get_list('Payment Entry', {
//                     fields: [
//                         'name', 'posting_date', 'payment_type', 'party_type', 'party', 'party_name',
//                         'paid_amount', 'received_amount', 'total_allocated_amount', 'mode_of_payment',
//                         'docstatus', 'company', 'paid_from', 'paid_to', 'reference_no', 'reference_date'
//                     ],
//                     filters: filters,
//                     limit: 200,
//                     order_by: 'posting_date desc'
//                 }).then(function(payments) {
//                     resolve(payments);
//                 }).catch(function(error) {
//                     reject(error);
//                 });
//             } catch (error) {
//                 reject(error);
//             }
//         });
//     }

//     process_payment_data(payments) {
//         let me = this;
//         let processed_data = [];
//         let total_payments = 0;
//         let total_received = 0;
//         let total_paid = 0;
//         let total_amount = 0;

//         if (!payments || payments.length === 0) {
//             me.render_data({data: [], total_payments: 0, total_received: 0, total_paid: 0, total_amount: 0});
//             return;
//         }

//         let processed_count = 0;
        
//         payments.forEach(function(payment) {
//             let row = {
//                 payment_id: payment.name,
//                 posting_date: payment.posting_date,
//                 payment_type: payment.payment_type,
//                 party_type: payment.party_type,
//                 party: payment.party,
//                 party_name: payment.party_name,
//                 paid_amount: payment.paid_amount || 0,
//                 received_amount: payment.received_amount || 0,
//                 total_allocated_amount: payment.total_allocated_amount || 0,
//                 mode_of_payment: payment.mode_of_payment || 'Not Specified',
//                 status: payment.docstatus === 1 ? 'Submitted' : payment.docstatus === 2 ? 'Cancelled' : 'Draft',
//                 company: payment.company,
//                 reference_no: payment.reference_no,
//                 reference_date: payment.reference_date
//             };

//             // Get payment references
//             frappe.db.get_list('Payment Entry Reference', {
//                 fields: ['reference_doctype', 'reference_name', 'allocated_amount'],
//                 filters: {
//                     parent: payment.name
//                 },
//                 limit: 10
//             }).then(function(references) {
//                 row.references = references || [];
                
//                 processed_data.push(row);
                
//                 // Calculate totals
//                 total_payments++;
//                 if (row.payment_type === 'Receive') {
//                     total_received += row.paid_amount || 0;
//                 } else {
//                     total_paid += row.paid_amount || 0;
//                 }
//                 total_amount += row.paid_amount || 0;

//                 processed_count++;
                
//                 if (processed_count === payments.length) {
//                     me.render_data({
//                         data: processed_data,
//                         total_payments: total_payments,
//                         total_received: total_received,
//                         total_paid: total_paid,
//                         total_amount: total_amount
//                     });
//                 }
//             }).catch(function(error) {
//                 console.error('Error getting references:', error);
//                 row.references = [];
                
//                 processed_data.push(row);
//                 total_payments++;
//                 if (row.payment_type === 'Receive') {
//                     total_received += row.paid_amount || 0;
//                 } else {
//                     total_paid += row.paid_amount || 0;
//                 }
//                 total_amount += row.paid_amount || 0;

//                 processed_count++;
                
//                 if (processed_count === payments.length) {
//                     me.render_data({
//                         data: processed_data,
//                         total_payments: total_payments,
//                         total_received: total_received,
//                         total_paid: total_paid,
//                         total_amount: total_amount
//                     });
//                 }
//             });
//         });
//     }

//     render_data(data) {
//         let me = this;
//         let tbody = $('#payment-tracker-body');
//         tbody.empty();
//         $('#loading-indicator').hide();

//         // Update summary cards
//         $('#total-payments').text(data.total_payments || 0);
//         $('#total-received').text('₹' + (data.total_received || 0).toLocaleString('en-IN'));
//         $('#total-paid').text('₹' + (data.total_paid || 0).toLocaleString('en-IN'));
//         $('#total-amount').text('₹' + (data.total_amount || 0).toLocaleString('en-IN'));

//         if (!data.data || data.data.length === 0) {
//             tbody.html(`
//                 <tr>
//                     <td colspan="12" class="text-center text-muted" style="padding: 40px;">
//                         <i class="fa fa-credit-card fa-3x" style="margin-bottom: 15px; opacity: 0.5;"></i>
//                         <br>
//                         <h4>No Payment Entries Found</h4>
//                         <p>Try adjusting your filters or check if there are any Payment Entries in your system.</p>
//                         <small class="text-info">
//                             <i class="fa fa-info-circle"></i>
//                             This tracker shows data from Payment Entry documents.
//                         </small>
//                     </td>
//                 </tr>
//             `);
//             return;
//         }

//         // Render table rows
//         data.data.forEach(function(row) {
//             let status_class = row.status === 'Submitted' ? 'success' : 
//                              row.status === 'Cancelled' ? 'danger' : 'warning';
            
//             let payment_type_class = row.payment_type === 'Receive' ? 'success' : 'danger';
            
//             let references_html = '';
//             if (row.references && row.references.length > 0) {
//                 row.references.forEach(function(ref) {
//                     references_html += `
//                         <div class="reference-detail" style="margin-bottom: 3px; padding: 2px;">
//                             <small>
//                                 <span class="label label-default" style="font-size: 9px;">${ref.reference_doctype}</span>
//                                 <a href="/app/${ref.reference_doctype.toLowerCase().replace(' ', '-')}/${ref.reference_name}" target="_blank">
//                                     ${ref.reference_name}
//                                 </a>
//                                 - ₹${(ref.allocated_amount || 0).toLocaleString('en-IN')}
//                             </small>
//                         </div>
//                     `;
//                 });
//             } else {
//                 references_html = '<small class="text-muted">No references</small>';
//             }

//             let row_html = `
//                 <tr>
//                     <td>
//                         <a href="/app/payment-entry/${row.payment_id}" target="_blank" class="text-bold" style="color: #1565c0;">
//                             <i class="fa fa-file-invoice-dollar"></i> ${row.payment_id}
//                         </a>
//                     </td>
//                     <td>${row.posting_date}</td>
//                     <td>
//                         <span class="label label-${payment_type_class}" style="font-size: 11px;">
//                             <i class="fa fa-${row.payment_type === 'Receive' ? 'download' : 'upload'}"></i>
//                             ${row.payment_type}
//                         </span>
//                     </td>
//                     <td>${row.party_type}</td>
//                     <td>
//                         <strong>${row.party_name || row.party}</strong>
//                         <br>
//                         <small class="text-muted">${row.party}</small>
//                     </td>
//                     <td class="text-right">
//                         <strong style="color: ${row.payment_type === 'Receive' ? '#2e7d32' : '#d32f2f'};">
//                             ₹${(row.paid_amount || 0).toLocaleString('en-IN')}
//                         </strong>
//                     </td>
//                     <td class="text-right">
//                         <strong style="color: #2e7d32;">
//                             ₹${(row.received_amount || 0).toLocaleString('en-IN')}
//                         </strong>
//                     </td>
//                     <td>
//                         <small>${row.mode_of_payment}</small>
//                     </td>
//                     <td>
//                         <span class="label label-${status_class}" style="font-size: 11px;">
//                             <i class="fa fa-${status_class === 'success' ? 'check' : status_class === 'warning' ? 'pencil' : 'ban'}"></i>
//                             ${row.status}
//                         </span>
//                     </td>
//                     <td style="max-width: 250px; min-width: 200px;">
//                         ${references_html}
//                     </td>
//                     <td>
//                         <small>${row.company}</small>
//                     </td>
//                     <td>
//                         <div class="btn-group">
//                             <a href="/app/payment-entry/${row.payment_id}" target="_blank" class="btn btn-xs btn-default" title="View Payment">
//                                 <i class="fa fa-eye"></i>
//                             </a>
//                             ${row.status === 'Draft' ? `
//                                 <button class="btn btn-xs btn-success submit-payment" data-payment="${row.payment_id}" title="Submit Payment">
//                                     <i class="fa fa-check"></i>
//                                 </button>
//                             ` : ''}
//                         </div>
//                     </td>
//                 </tr>
//             `;
            
//             tbody.append(row_html);
//         });

//         // Bind submit payment events
//         $('.submit-payment').off('click').on('click', function() {
//             let payment_id = $(this).data('payment');
//             me.submit_payment_entry(payment_id);
//         });
//     }

//     submit_payment_entry(payment_id) {
//         frappe.call({
//             method: 'frappe.client.submit',
//             args: {
//                 doc: {
//                     doctype: 'Payment Entry',
//                     name: payment_id
//                 }
//             },
//             callback: function(response) {
//                 if (response.message) {
//                     frappe.show_alert({
//                         message: __('Payment Entry submitted successfully'),
//                         indicator: 'green'
//                     });
//                     // Refresh data
//                     setTimeout(function() {
//                         window.location.reload();
//                     }, 1500);
//                 }
//             }
//         });
//     }

//     show_error_message(message) {
//         $('#payment-tracker-body').html(`
//             <tr>
//                 <td colspan="12" class="text-center text-danger" style="padding: 40px;">
//                     <i class="fa fa-exclamation-triangle fa-3x" style="margin-bottom: 15px;"></i>
//                     <br>
//                     <h4>Error Loading Payment Data</h4>
//                     <p>${message}</p>
//                     <small class="text-info">
//                         <i class="fa fa-lightbulb-o"></i>
//                         Make sure you have proper permissions to access Payment Entries.
//                     </small>
//                     <br><br>
//                     <button class="btn btn-default btn-sm" onclick="location.reload()">
//                         <i class="fa fa-refresh"></i> Try Again
//                     </button>
//                 </td>
//             </tr>
//         `);
//     }
// }





// frappe.pages['invoice-payment-trac'].on_page_load = function(wrapper) {
//     var page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Invoice Payment Tracker',
//         single_column: true
//     });

//     // Initialize the page
//     $(wrapper).find('.layout-main-section').empty();
//     new InvoicePaymentTracker(page, wrapper);
// }

// class InvoicePaymentTracker {
//     constructor(page, wrapper) {
//         this.page = page;
//         this.wrapper = wrapper;
//         this.filters = {};
//         this.init();
//     }

//     init() {
//         this.setup_filters();
//         this.setup_grid();
//         this.load_data();
//         this.setup_events();
//     }

//     setup_filters() {
//         let me = this;
        
//         // Filter section
//         this.filter_section = $(`
//             <div class="row filter-section" style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="payment_type">Payment Type</label>
//                         <select class="form-control" id="payment_type">
//                             <option value="">All Types</option>
//                             <option value="Receive">Receive</option>
//                             <option value="Pay">Pay</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="party_type">Party Type</label>
//                         <select class="form-control" id="party_type">
//                             <option value="">All Parties</option>
//                             <option value="Customer">Customer</option>
//                             <option value="Supplier">Supplier</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="party">Party Name</label>
//                         <input type="text" class="form-control" id="party" placeholder="Enter party name" data-fieldtype="Data">
//                     </div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="from_date">From Date</label>
//                         <input type="date" class="form-control" id="from_date">
//                     </div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div class="form-group">
//                         <label for="to_date">To Date</label>
//                         <input type="date" class="form-control" id="to_date">
//                     </div>
//                 </div>
//                 <div class="col-sm-2" style="padding-top: 25px;">
//                     <button class="btn btn-primary btn-sm" id="apply-filters">
//                         <i class="fa fa-filter"></i> Apply
//                     </button>
//                     <button class="btn btn-default btn-sm" id="reset-filters">
//                         <i class="fa fa-refresh"></i> Reset
//                     </button>
//                 </div>
//             </div>
//         `).appendTo($(this.wrapper).find('.layout-main-section'));

//         // Summary cards
//         this.summary_section = $(`
//             <div class="row summary-section" style="margin-bottom: 20px;">
//                 <div class="col-sm-3">
//                     <div class="widget-counter" style="background: #e8f5e8; padding: 15px; border-radius: 5px; text-align: center;">
//                         <h4 style="margin: 0; color: #2e7d32;" id="total-payments">0</h4>
//                         <small>Total Payments</small>
//                     </div>
//                 </div>
//                 <div class="col-sm-3">
//                     <div class="widget-counter" style="background: #e3f2fd; padding: 15px; border-radius: 5px; text-align: center;">
//                         <h4 style="margin: 0; color: #1565c0;" id="total-received">₹0</h4>
//                         <small>Total Received</small>
//                     </div>
//                 </div>
//                 <div class="col-sm-3">
//                     <div class="widget-counter" style="background: #ffebee; padding: 15px; border-radius: 5px; text-align: center;">
//                         <h4 style="margin: 0; color: #c62828;" id="total-paid">₹0</h4>
//                         <small>Total Paid</small>
//                     </div>
//                 </div>
//                 <div class="col-sm-3">
//                     <div class="widget-counter" style="background: #f3e5f5; padding: 15px; border-radius: 5px; text-align: center;">
//                         <h4 style="margin: 0; color: #7b1fa2;" id="total-amount">₹0</h4>
//                         <small>Total Amount</small>
//                     </div>
//                 </div>
//             </div>
//         `).appendTo($(this.wrapper).find('.layout-main-section'));
//     }

//     setup_grid() {
//         let me = this;
        
//         this.grid_section = $(`
//             <div class="grid-section">
//                 <div class="row">
//                     <div class="col-sm-12">
//                         <div class="text-right" style="margin-bottom: 10px;">
//                             <button class="btn btn-default btn-sm" id="refresh-data">
//                                 <i class="fa fa-refresh"></i> Refresh Data
//                             </button>
//                         </div>
//                         <div class="table-responsive">
//                             <table class="table table-bordered table-hover" id="payment-tracker-table">
//                                 <thead style="background: #f0f0f0;">
//                                     <tr>
//                                         <th>Payment ID</th>
//                                         <th>Posting Date</th>
//                                         <th>Payment Type</th>
//                                         <th>Party Type</th>
//                                         <th>Party</th>
//                                         <th>Paid Amount</th>
//                                         <th>Received Amount</th>
//                                         <th>Mode of Payment</th>
//                                         <th>Status</th>
//                                         <th>References</th>
//                                         <th>Company</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody id="payment-tracker-body">
//                                     <tr>
//                                         <td colspan="12" class="text-center text-muted">
//                                             <div id="loading-indicator">
//                                                 <i class="fa fa-spinner fa-spin fa-2x"></i>
//                                                 <p>Loading payment data...</p>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `).appendTo($(this.wrapper).find('.layout-main-section'));
//     }

//     setup_events() {
//         let me = this;

//         // Apply filters
//         $('#apply-filters').on('click', function() {
//             me.apply_filters();
//         });

//         // Reset filters
//         $('#reset-filters').on('click', function() {
//             me.reset_filters();
//         });

//         // Refresh data
//         $('#refresh-data').on('click', function() {
//             me.load_data();
//         });

//         // Enter key in filter fields
//         $('#party').on('keypress', function(e) {
//             if (e.which == 13) {
//                 me.apply_filters();
//             }
//         });

//         // Setup party name suggestions
//         this.setup_party_suggestions();
//     }

//     setup_party_suggestions() {
//         let me = this;
        
//         // Make party field a search field with suggestions
//         let party_field = $('#party');
        
//         party_field.on('focus', function() {
//             // Get unique party names from existing payments
//             frappe.db.get_list('Payment Entry', {
//                 fields: ['party', 'party_name'],
//                 filters: {
//                     'party': ['is', 'set']
//                 },
//                 limit: 50,
//                 distinct: true
//             }).then(function(parties) {
//                 let party_list = [];
//                 parties.forEach(function(party) {
//                     if (party.party_name) {
//                         party_list.push(party.party_name);
//                     }
//                     if (party.party) {
//                         party_list.push(party.party);
//                     }
//                 });
                
//                 // Remove duplicates and create datalist
//                 party_list = [...new Set(party_list)];
                
//                 // Create datalist for suggestions
//                 let datalist = $('#party-datalist');
//                 if (datalist.length === 0) {
//                     datalist = $('<datalist id="party-datalist"></datalist>').appendTo('body');
//                     party_field.attr('list', 'party-datalist');
//                 }
                
//                 datalist.empty();
//                 party_list.forEach(function(party) {
//                     if (party) {
//                         datalist.append('<option value="' + party + '">');
//                     }
//                 });
//             });
//         });
//     }

//     apply_filters() {
//         this.filters = {
//             payment_type: $('#payment_type').val(),
//             party_type: $('#party_type').val(),
//             party: $('#party').val(),
//             from_date: $('#from_date').val(),
//             to_date: $('#to_date').val()
//         };
        
//         frappe.show_alert({
//             message: __('Filters applied successfully'),
//             indicator: 'green'
//         });
        
//         this.load_data();
//     }

//     reset_filters() {
//         $('#payment_type').val('');
//         $('#party_type').val('');
//         $('#party').val('');
//         $('#from_date').val('');
//         $('#to_date').val('');
//         this.filters = {};
        
//         frappe.show_alert({
//             message: __('Filters reset successfully'),
//             indicator: 'blue'
//         });
        
//         this.load_data();
//     }

//     load_data() {
//         let me = this;
        
//         // Show loading
//         $('#payment-tracker-body').html(`
//             <tr>
//                 <td colspan="12" class="text-center text-muted">
//                     <div id="loading-indicator">
//                         <i class="fa fa-spinner fa-spin fa-2x"></i>
//                         <p>Loading payment data...</p>
//                     </div>
//                 </td>
//             </tr>
//         `);

//         // Get all payment entries first
//         frappe.db.get_list('Payment Entry', {
//             fields: ['name'],
//             limit: 1000
//         }).then(function(payments) {
//             if (payments && payments.length > 0) {
//                 me.process_payments_with_details(payments);
//             } else {
//                 me.render_empty_state();
//             }
//         }).catch(function(error) {
//             console.error('Error loading payments:', error);
//             me.render_error_state('Failed to load payment data: ' + error.message);
//         });
//     }

//     process_payments_with_details(payment_list) {
//         let me = this;
//         let processed_data = [];
//         let total_payments = 0;
//         let total_received = 0;
//         let total_paid = 0;
//         let total_amount = 0;

//         let processed_count = 0;

//         payment_list.forEach(function(payment) {
//             // Get full payment entry details
//             frappe.db.get_doc('Payment Entry', payment.name)
//                 .then(function(payment_doc) {
//                     // Apply filters
//                     if (me.filters.payment_type && payment_doc.payment_type !== me.filters.payment_type) {
//                         processed_count++;
//                         check_completion();
//                         return;
//                     }
                    
//                     if (me.filters.party_type && payment_doc.party_type !== me.filters.party_type) {
//                         processed_count++;
//                         check_completion();
//                         return;
//                     }
                    
//                     if (me.filters.party && !payment_doc.party_name?.toLowerCase().includes(me.filters.party.toLowerCase()) && 
//                         !payment_doc.party?.toLowerCase().includes(me.filters.party.toLowerCase())) {
//                         processed_count++;
//                         check_completion();
//                         return;
//                     }
                    
//                     if (me.filters.from_date && payment_doc.posting_date < me.filters.from_date) {
//                         processed_count++;
//                         check_completion();
//                         return;
//                     }
                    
//                     if (me.filters.to_date && payment_doc.posting_date > me.filters.to_date) {
//                         processed_count++;
//                         check_completion();
//                         return;
//                     }

//                     let row = {
//                         payment_id: payment_doc.name,
//                         posting_date: payment_doc.posting_date,
//                         payment_type: payment_doc.payment_type,
//                         party_type: payment_doc.party_type,
//                         party: payment_doc.party,
//                         party_name: payment_doc.party_name,
//                         paid_amount: payment_doc.paid_amount || 0,
//                         received_amount: payment_doc.received_amount || 0,
//                         total_allocated_amount: payment_doc.total_allocated_amount || 0,
//                         mode_of_payment: payment_doc.mode_of_payment || 'Not Specified',
//                         status: payment_doc.docstatus === 1 ? 'Submitted' : payment_doc.docstatus === 2 ? 'Cancelled' : 'Draft',
//                         company: payment_doc.company,
//                         references: payment_doc.references || []
//                     };

//                     processed_data.push(row);
                    
//                     // Calculate totals
//                     total_payments++;
//                     if (row.payment_type === 'Receive') {
//                         total_received += row.paid_amount || 0;
//                     } else {
//                         total_paid += row.paid_amount || 0;
//                     }
//                     total_amount += row.paid_amount || 0;

//                     processed_count++;
//                     check_completion();
//                 })
//                 .catch(function(error) {
//                     console.error('Error getting payment details:', error);
//                     processed_count++;
//                     check_completion();
//                 });

//             function check_completion() {
//                 if (processed_count === payment_list.length) {
//                     me.render_data({
//                         data: processed_data,
//                         total_payments: total_payments,
//                         total_received: total_received,
//                         total_paid: total_paid,
//                         total_amount: total_amount
//                     });
//                 }
//             }
//         });
//     }

//     render_data(data) {
//         let me = this;
//         let tbody = $('#payment-tracker-body');
//         tbody.empty();

//         // Update summary cards
//         $('#total-payments').text(data.total_payments || 0);
//         $('#total-received').text('₹' + (data.total_received || 0).toLocaleString('en-IN'));
//         $('#total-paid').text('₹' + (data.total_paid || 0).toLocaleString('en-IN'));
//         $('#total-amount').text('₹' + (data.total_amount || 0).toLocaleString('en-IN'));

//         if (!data.data || data.data.length === 0) {
//             me.render_empty_state();
//             return;
//         }

//         // Render table rows
//         data.data.forEach(function(row) {
//             let status_class = row.status === 'Submitted' ? 'success' : 
//                             row.status === 'Cancelled' ? 'danger' : 'warning';
            
//             let payment_type_class = row.payment_type === 'Receive' ? 'success' : 'danger';
            
//             let references_html = '';
//             if (row.references && row.references.length > 0) {
//                 row.references.forEach(function(ref) {
//                     let doctype_url = ref.reference_doctype ? ref.reference_doctype.toLowerCase().replace(/ /g, '-') : '';
//                     references_html += `
//                         <div class="reference-detail" style="margin-bottom: 3px; padding: 2px; border-left: 2px solid #007bff;">
//                             <small>
//                                 <span class="label label-default" style="font-size: 9px; background: #6c757d;">${ref.reference_doctype || 'N/A'}</span>
//                                 ${ref.reference_name ? `
//                                     <a href="/app/${doctype_url}/${ref.reference_name}" target="_blank" style="color: #007bff;">
//                                         ${ref.reference_name}
//                                     </a>
//                                 ` : '<span class="text-muted">No reference</span>'}
//                                 ${ref.allocated_amount ? ` - ₹${(ref.allocated_amount || 0).toLocaleString('en-IN')}` : ''}
//                             </small>
//                         </div>
//                     `;
//                 });
//             } else {
//                 references_html = '<small class="text-muted"><i>No references</i></small>';
//             }

//             let row_html = `
//                 <tr>
//                     <td>
//                         <a href="/app/payment-entry/${row.payment_id}" target="_blank" class="text-bold" style="color: #1565c0;">
//                             <i class="fa fa-file-invoice-dollar"></i> ${row.payment_id}
//                         </a>
//                     </td>
//                     <td><strong>${row.posting_date}</strong></td>
//                     <td>
//                         <span class="label label-${payment_type_class}" style="font-size: 11px; padding: 4px 8px;">
//                             <i class="fa fa-${row.payment_type === 'Receive' ? 'download' : 'upload'}"></i>
//                             ${row.payment_type}
//                         </span>
//                     </td>
//                     <td>${row.party_type}</td>
//                     <td>
//                         <div>
//                             <strong>${row.party_name || row.party}</strong>
//                             <br>
//                             <small class="text-muted">${row.party}</small>
//                         </div>
//                     </td>
//                     <td class="text-right">
//                         <strong style="color: ${row.payment_type === 'Receive' ? '#2e7d32' : '#d32f2f'}; font-size: 13px;">
//                             ₹${(row.paid_amount || 0).toLocaleString('en-IN')}
//                         </strong>
//                     </td>
//                     <td class="text-right">
//                         <strong style="color: #2e7d32; font-size: 13px;">
//                             ₹${(row.received_amount || 0).toLocaleString('en-IN')}
//                         </strong>
//                     </td>
//                     <td>
//                         <span class="badge" style="background: #e9ecef; color: #495057; padding: 4px 8px;">
//                             ${row.mode_of_payment}
//                         </span>
//                     </td>
//                     <td>
//                         <span class="label label-${status_class}" style="font-size: 11px; padding: 4px 8px;">
//                             <i class="fa fa-${status_class === 'success' ? 'check' : status_class === 'warning' ? 'pencil' : 'ban'}"></i>
//                             ${row.status}
//                         </span>
//                     </td>
//                     <td style="max-width: 250px; min-width: 200px;">
//                         ${references_html}
//                     </td>
//                     <td>
//                         <small class="text-muted">${row.company}</small>
//                     </td>
//                     <td>
//                         <div class="btn-group">
//                             <a href="/app/payment-entry/${row.payment_id}" target="_blank" class="btn btn-xs btn-default" title="View Payment Entry">
//                                 <i class="fa fa-eye"></i>
//                             </a>
//                             ${row.status === 'Draft' ? `
//                                 <button class="btn btn-xs btn-success submit-payment" data-payment="${row.payment_id}" title="Submit Payment Entry">
//                                     <i class="fa fa-check"></i>
//                                 </button>
//                             ` : ''}
//                         </div>
//                     </td>
//                 </tr>
//             `;
            
//             tbody.append(row_html);
//         });

//         // Bind submit payment events
//         $('.submit-payment').off('click').on('click', function() {
//             let payment_id = $(this).data('payment');
//             me.submit_payment_entry(payment_id);
//         });
//     }

//     submit_payment_entry(payment_id) {
//         frappe.confirm(
//             __('Are you sure you want to submit Payment Entry {0}?', [payment_id]),
//             function() {
//                 // First, get the latest version of the document
//                 frappe.call({
//                     method: 'frappe.client.get',
//                     args: {
//                         doctype: 'Payment Entry',
//                         name: payment_id
//                     },
//                     callback: function(response) {
//                         if (response.message) {
//                             let latest_doc = response.message;
                            
//                             // Now submit the latest document
//                             frappe.call({
//                                 method: 'frappe.client.submit',
//                                 args: {
//                                     doc: latest_doc
//                                 },
//                                 callback: function(submit_response) {
//                                     if (submit_response.message) {
//                                         frappe.show_alert({
//                                             message: __('Payment Entry {0} submitted successfully!', [payment_id]),
//                                             indicator: 'green'
//                                         });
//                                         // Refresh data after 2 seconds
//                                         setTimeout(function() {
//                                             window.location.reload();
//                                         }, 2000);
//                                     } else {
//                                         frappe.show_alert({
//                                             message: __('Failed to submit Payment Entry. Please try again.'),
//                                             indicator: 'red'
//                                         });
//                                     }
//                                 },
//                                 error: function(error) {
//                                     console.error('Error submitting payment:', error);
//                                     let error_msg = __('Error submitting Payment Entry.');
//                                     if (error.message && error.message.includes('modified')) {
//                                         error_msg = __('Payment Entry has been modified. Please refresh the page and try again.');
//                                     }
//                                     frappe.show_alert({
//                                         message: error_msg,
//                                         indicator: 'red'
//                                     });
//                                 }
//                             });
//                         }
//                     },
//                     error: function(error) {
//                         console.error('Error getting latest document:', error);
//                         frappe.show_alert({
//                             message: __('Error getting latest Payment Entry. Please try again.'),
//                             indicator: 'red'
//                         });
//                     }
//                 });
//             },
//             function() {
//                 // Cancel action - do nothing
//             }
//         );
//     }

//     render_empty_state() {
//         $('#payment-tracker-body').html(`
//             <tr>
//                 <td colspan="12" class="text-center text-muted" style="padding: 50px;">
//                     <i class="fa fa-search fa-4x" style="margin-bottom: 20px; opacity: 0.3;"></i>
//                     <br>
//                     <h4 style="color: #6c757d;">No Payment Entries Found</h4>
//                     <p class="text-muted">No payment entries match your current filters.</p>
//                     <button class="btn btn-primary btn-sm" onclick="location.reload()">
//                         <i class="fa fa-refresh"></i> Reload Page
//                     </button>
//                 </td>
//             </tr>
//         `);
//     }

//     render_error_state(message) {
//         $('#payment-tracker-body').html(`
//             <tr>
//                 <td colspan="12" class="text-center text-danger" style="padding: 50px;">
//                     <i class="fa fa-exclamation-triangle fa-4x" style="margin-bottom: 20px;"></i>
//                     <br>
//                     <h4>Error Loading Data</h4>
//                     <p>${message}</p>
//                     <button class="btn btn-danger btn-sm" onclick="location.reload()">
//                         <i class="fa fa-refresh"></i> Try Again
//                     </button>
//                 </td>
//             </tr>
//         `);
//     }
// }