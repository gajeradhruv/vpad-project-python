# backend.py - Python Flask backend for CNC Machining
from flask import Flask, request, jsonify
from datetime import datetime
import json

app = Flask(__name__)

class CNCQuoteSystem:
    def __init__(self):
        self.quote_requests = []
        self.products = {
            "cnc_machining": {
                "name": "CNC Machining",
                "base_price": 100.00,
                "min_order": 50,
                "lead_time": "2-3 weeks"
            }
        }
    
    def create_quote_request(self, product_type, contact_info=None):
        """Create a new quote request"""
        quote_data = {
            "id": len(self.quote_requests) + 1,
            "product": product_type,
            "timestamp": datetime.now().isoformat(),
            "status": "pending",
            "contact_info": contact_info or {}
        }
        
        self.quote_requests.append(quote_data)
        return quote_data
    
    def calculate_quote(self, product_type, quantity, specifications=None):
        """Calculate quote based on quantity and specifications"""
        product = self.products.get(product_type)
        if not product:
            return None
        
        base_price = product["base_price"]
        
        # Simple pricing logic
        if quantity >= 1000:
            unit_price = base_price * 0.8  # 20% discount for large orders
        elif quantity >= 500:
            unit_price = base_price * 0.9  # 10% discount
        elif quantity >= 100:
            unit_price = base_price * 0.95  # 5% discount
        else:
            unit_price = base_price
        
        total_price = unit_price * quantity
        
        return {
            "product": product["name"],
            "quantity": quantity,
            "unit_price": round(unit_price, 2),
            "total_price": round(total_price, 2),
            "lead_time": product["lead_time"],
            "min_order": product["min_order"]
        }
    
    def get_pending_quotes(self):
        """Get all pending quote requests"""
        return [q for q in self.quote_requests if q["status"] == "pending"]

# Initialize the quote system
quote_system = CNCQuoteSystem()

@app.route('/api/quote-request', methods=['POST'])
def handle_quote_request():
    """Handle incoming quote requests from the website"""
    try:
        data = request.get_json()
        
        # Create new quote request
        quote_request = quote_system.create_quote_request(
            product_type=data.get('product', 'cnc_machining'),
            contact_info=data.get('contact_info')
        )
        
        # Log the request
        print(f"New quote request received: {quote_request}")
        
        return jsonify({
            "success": True,
            "message": "Quote request received successfully",
            "request_id": quote_request["id"],
            "status": "Our team will contact you within 24 hours"
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

@app.route('/api/calculate-quote', methods=['POST'])
def calculate_quote():
    """Calculate detailed quote based on specifications"""
    try:
        data = request.get_json()
        
        quote = quote_system.calculate_quote(
            product_type=data.get('product_type', 'cnc_machining'),
            quantity=data.get('quantity', 100),
            specifications=data.get('specifications')
        )
        
        if quote:
            return jsonify({
                "success": True,
                "quote": quote
            })
        else:
            return jsonify({
                "success": False,
                "error": "Product not found"
            }), 404
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

@app.route('/api/pending-quotes', methods=['GET'])
def get_pending_quotes():
    """Get all pending quotes (admin function)"""
    pending_quotes = quote_system.get_pending_quotes()
    return jsonify({
        "success": True,
        "pending_quotes": pending_quotes,
        "count": len(pending_quotes)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)