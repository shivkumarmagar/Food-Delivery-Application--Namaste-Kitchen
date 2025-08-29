import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderHistoryTab = ({ orders, onReorder, onViewReceipt }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const statusColors = {
    'delivered': 'text-success bg-success/10',
    'cancelled': 'text-error bg-error/10',
    'refunded': 'text-warning bg-warning/10'
  };

  const filteredOrders = orders?.filter(order => {
    if (filter === 'all') return true;
    return order?.status === filter;
  });

  const sortedOrders = [...filteredOrders]?.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'amount-high') {
      return b?.total - a?.total;
    } else if (sortBy === 'amount-low') {
      return a?.total - b?.total;
    }
    return 0;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Order History ({orders?.length} orders)
        </h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-body text-muted-foreground">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e?.target?.value)}
              className="px-3 py-1 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          
          {/* Sort */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-body text-muted-foreground">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-1 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Amount: High to Low</option>
              <option value="amount-low">Amount: Low to High</option>
            </select>
          </div>
        </div>
      </div>
      {/* Orders List */}
      <div className="space-y-4">
        {sortedOrders?.map((order) => (
          <div key={order?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Order Info */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={order?.restaurant?.image}
                    alt={order?.restaurant?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-body font-semibold text-foreground">
                      {order?.restaurant?.name}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-caption rounded-md ${statusColors?.[order?.status]}`}>
                      {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="text-muted-foreground font-body text-sm mb-2">
                    Order #{order?.id} • {formatDate(order?.date)}
                  </div>
                  
                  <div className="text-muted-foreground font-caption text-sm">
                    {order?.items?.length} item{order?.items?.length !== 1 ? 's' : ''} • ${order?.total?.toFixed(2)}
                  </div>
                  
                  {/* Items Preview */}
                  <div className="mt-2">
                    <div className="text-foreground font-body text-sm">
                      {order?.items?.slice(0, 2)?.map((item, index) => (
                        <span key={index}>
                          {item?.quantity}x {item?.name}
                          {index < Math.min(order?.items?.length, 2) - 1 && ', '}
                        </span>
                      ))}
                      {order?.items?.length > 2 && (
                        <span className="text-muted-foreground">
                          {' '}and {order?.items?.length - 2} more item{order?.items?.length - 2 !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-3 lg:flex-col lg:space-x-0 lg:space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewReceipt(order?.id)}
                  iconName="Receipt"
                  iconPosition="left"
                  className="flex-1 lg:flex-none lg:w-full"
                >
                  View Receipt
                </Button>
                
                {order?.status === 'delivered' && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onReorder(order)}
                    iconName="RotateCcw"
                    iconPosition="left"
                    className="flex-1 lg:flex-none lg:w-full"
                  >
                    Reorder
                  </Button>
                )}
              </div>
            </div>
            
            {/* Expandable Order Details */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground font-caption">Delivery Address:</span>
                  <div className="text-foreground font-body mt-1">
                    {order?.deliveryAddress?.street}<br />
                    {order?.deliveryAddress?.city}, {order?.deliveryAddress?.state} {order?.deliveryAddress?.zipCode}
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground font-caption">Payment Method:</span>
                  <div className="text-foreground font-body mt-1">
                    {order?.paymentMethod?.type} •••• {order?.paymentMethod?.lastFour}
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground font-caption">Order Total:</span>
                  <div className="text-foreground font-body mt-1">
                    <div>Subtotal: ${order?.subtotal?.toFixed(2)}</div>
                    <div>Delivery: ${order?.deliveryFee?.toFixed(2)}</div>
                    <div>Tax: ${order?.tax?.toFixed(2)}</div>
                    <div className="font-semibold">Total: ${order?.total?.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {sortedOrders?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
              {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
            </h4>
            <p className="text-muted-foreground font-body mb-4">
              {filter === 'all' 
                ? "When you place your first order, it will appear here"
                : `You don't have any ${filter} orders`
              }
            </p>
            {filter !== 'all' && (
              <Button
                variant="outline"
                onClick={() => setFilter('all')}
              >
                View All Orders
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryTab;