import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import OrderCard from './OrderCard';

const OrderQueue = ({ orders, onStatusUpdate, onViewDetails, onBulkUpdate }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'timestamp', label: 'Order Time' },
    { value: 'priority', label: 'Priority' },
    { value: 'total', label: 'Order Value' },
    { value: 'estimatedTime', label: 'Prep Time' }
  ];

  const filteredOrders = orders?.filter(order => 
    filterStatus === 'all' || order?.status === filterStatus
  );

  const sortedOrders = [...filteredOrders]?.sort((a, b) => {
    switch (sortBy) {
      case 'timestamp':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      case 'total':
        return b?.total - a?.total;
      case 'estimatedTime':
        return a?.estimatedTime - b?.estimatedTime;
      default:
        return 0;
    }
  });

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev?.includes(orderId) 
        ? prev?.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders?.length === sortedOrders?.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(sortedOrders?.map(order => order?.id));
    }
  };

  const handleBulkStatusUpdate = (newStatus) => {
    onBulkUpdate(selectedOrders, newStatus);
    setSelectedOrders([]);
  };

  const getStatusCounts = () => {
    const counts = orders?.reduce((acc, order) => {
      acc[order.status] = (acc?.[order?.status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-xl text-foreground">
            Order Queue
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location?.reload()}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {statusOptions?.slice(1)?.map(status => (
            <div key={status?.value} className="text-center p-2 bg-muted/50 rounded-md">
              <p className="text-xs font-caption text-muted-foreground">
                {status?.label}
              </p>
              <p className="font-mono font-bold text-lg text-foreground">
                {statusCounts?.[status?.value] || 0}
              </p>
            </div>
          ))}
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              className="w-32"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="w-32"
            />
          </div>

          {selectedOrders?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-body text-muted-foreground">
                {selectedOrders?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('accepted')}
              >
                Accept All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('preparing')}
              >
                Start Prep
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Order List */}
      <div className="p-4">
        {sortedOrders?.length > 0 ? (
          <div className="space-y-4">
            {/* Select All */}
            <div className="flex items-center space-x-2 pb-2 border-b border-border">
              <input
                type="checkbox"
                checked={selectedOrders?.length === sortedOrders?.length && sortedOrders?.length > 0}
                onChange={handleSelectAll}
                className="rounded border-border"
              />
              <span className="text-sm font-body text-muted-foreground">
                Select all ({sortedOrders?.length} orders)
              </span>
            </div>

            {/* Orders */}
            {sortedOrders?.map(order => (
              <div key={order?.id} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedOrders?.includes(order?.id)}
                  onChange={() => handleSelectOrder(order?.id)}
                  className="mt-4 rounded border-border"
                />
                <div className="flex-1">
                  <OrderCard
                    order={order}
                    onStatusUpdate={onStatusUpdate}
                    onViewDetails={onViewDetails}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              No Orders Found
            </h3>
            <p className="font-body text-muted-foreground">
              {filterStatus === 'all' ?'No orders available at the moment.'
                : `No ${filterStatus} orders found.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderQueue;