class Order:
    def __init__(self, order_id, customer_name, items, total_amount):
        self.order_id = order_id
        self.customer_name = customer_name
        self.items = items  # List of items
        self.total_amount = total_amount
        self.status = 'Pending'

    def update_status(self, status):
        valid_statuses = ['Pending', 'Shipped', 'Delivered', 'Canceled']
        if status in valid_statuses:
            self.status = status
        else:
            raise ValueError(f"Invalid status: {status}")

    def get_order_details(self):
        return {
            'order_id': self.order_id,
            'customer_name': self.customer_name,
            'items': self.items,
            'total_amount': self.total_amount,
            'status': self.status
        }