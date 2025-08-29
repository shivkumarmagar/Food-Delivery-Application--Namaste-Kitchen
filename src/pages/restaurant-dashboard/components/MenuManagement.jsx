import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const MenuManagement = ({ menuItems, categories, onUpdateItem, onToggleAvailability, onAddItem }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    available: true
  });

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat?.id, label: cat?.name }))
  ];

  const filteredItems = menuItems?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item?.categoryId === selectedCategory;
    const matchesSearch = item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEditItem = (item) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = () => {
    onUpdateItem(editingItem);
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleAddNewItem = () => {
    onAddItem(newItem);
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      available: true
    });
    setShowAddForm(false);
  };

  const getCategoryName = (categoryId) => {
    const category = categories?.find(cat => cat?.id === categoryId);
    return category ? category?.name : 'Unknown';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-xl text-foreground">
            Menu Management
          </h2>
          <Button
            variant="default"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Item
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-full sm:w-48"
          />
        </div>
      </div>
      {/* Add New Item Form */}
      {showAddForm && (
        <div className="p-4 border-b border-border bg-muted/20">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Add New Menu Item
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Item Name"
              value={newItem?.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e?.target?.value }))}
              required
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              value={newItem?.price}
              onChange={(e) => setNewItem(prev => ({ ...prev, price: e?.target?.value }))}
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Description"
                value={newItem?.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e?.target?.value }))}
              />
            </div>
            <Select
              label="Category"
              options={categories?.map(cat => ({ value: cat?.id, label: cat?.name }))}
              value={newItem?.category}
              onChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}
              required
            />
            <Input
              label="Image URL"
              value={newItem?.image}
              onChange={(e) => setNewItem(prev => ({ ...prev, image: e?.target?.value }))}
            />
          </div>
          <div className="flex items-center justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleAddNewItem}
              disabled={!newItem?.name || !newItem?.price || !newItem?.category}
            >
              Add Item
            </Button>
          </div>
        </div>
      )}
      {/* Menu Items */}
      <div className="p-4">
        {filteredItems?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredItems?.map(item => (
              <div key={item?.id} className="bg-background border border-border rounded-lg p-4">
                {editingItem && editingItem?.id === item?.id ? (
                  /* Edit Form */
                  (<div className="space-y-4">
                    <Input
                      label="Item Name"
                      value={editingItem?.name}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, name: e?.target?.value }))}
                    />
                    <Input
                      label="Description"
                      value={editingItem?.description}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, description: e?.target?.value }))}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Price"
                        type="number"
                        step="0.01"
                        value={editingItem?.price}
                        onChange={(e) => setEditingItem(prev => ({ ...prev, price: e?.target?.value }))}
                      />
                      <Select
                        label="Category"
                        options={categories?.map(cat => ({ value: cat?.id, label: cat?.name }))}
                        value={editingItem?.categoryId}
                        onChange={(value) => setEditingItem(prev => ({ ...prev, categoryId: value }))}
                      />
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button variant="default" onClick={handleSaveEdit}>
                        Save
                      </Button>
                    </div>
                  </div>)
                ) : (
                  /* Display Mode */
                  (<div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-body font-semibold text-foreground">
                            {item?.name}
                          </h3>
                          <p className="text-xs font-caption text-muted-foreground">
                            {getCategoryName(item?.categoryId)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-foreground">
                            ${item?.price?.toFixed(2)}
                          </span>
                          <div className={`w-2 h-2 rounded-full ${item?.available ? 'bg-success' : 'bg-error'}`} />
                        </div>
                      </div>
                      <p className="text-sm font-body text-muted-foreground mb-3 line-clamp-2">
                        {item?.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onToggleAvailability(item?.id)}
                            className={item?.available ? 'text-error' : 'text-success'}
                          >
                            {item?.available ? 'Disable' : 'Enable'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditItem(item)}
                            iconName="Edit"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={14} className="text-warning" />
                          <span className="text-xs font-mono text-muted-foreground">
                            {item?.rating?.toFixed(1) || 'N/A'}
                          </span>
                          <span className="text-xs font-caption text-muted-foreground">
                            ({item?.reviewCount || 0})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>)
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="UtensilsCrossed" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              No Menu Items Found
            </h3>
            <p className="font-body text-muted-foreground">
              {searchTerm || selectedCategory !== 'all' ?'Try adjusting your search or filter criteria.' :'Start by adding your first menu item.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;