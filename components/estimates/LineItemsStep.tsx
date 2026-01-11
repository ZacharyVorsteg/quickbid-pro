'use client';

import { useState } from 'react';
import { Plus, Trash2, Package, Clock, Search, ChevronDown } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { Trade, ItemType } from '@/lib/database.types';
import { getMaterialsByTrade, MaterialData, tradeLabels } from '@/lib/materials-data';

export interface LineItem {
  id: string;
  type: ItemType;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total: number;
}

interface LineItemsStepProps {
  items: LineItem[];
  trade: Trade | null;
  laborRate: number;
  markup: number;
  onItemsChange: (items: LineItem[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function LineItemsStep({
  items,
  trade,
  laborRate,
  markup,
  onItemsChange,
  onBack,
  onNext,
}: LineItemsStepProps) {
  const [showMaterialSearch, setShowMaterialSearch] = useState(false);
  const [materialSearch, setMaterialSearch] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<Trade | 'all'>(trade || 'all');

  const materials = selectedTrade === 'all'
    ? getMaterialsByTrade(trade || 'hvac')
    : getMaterialsByTrade(selectedTrade);

  const filteredMaterials = materials.filter((m) =>
    m.name.toLowerCase().includes(materialSearch.toLowerCase())
  );

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addMaterial = (material: MaterialData) => {
    const newItem: LineItem = {
      id: generateId(),
      type: 'material',
      description: material.name,
      quantity: 1,
      unit: material.unit,
      unit_price: material.default_price,
      total: material.default_price,
    };
    onItemsChange([...items, newItem]);
    setShowMaterialSearch(false);
    setMaterialSearch('');
  };

  const addLabor = () => {
    const newItem: LineItem = {
      id: generateId(),
      type: 'labor',
      description: 'Labor',
      quantity: 1,
      unit: 'hours',
      unit_price: laborRate,
      total: laborRate,
    };
    onItemsChange([...items, newItem]);
  };

  const addCustomItem = () => {
    const newItem: LineItem = {
      id: generateId(),
      type: 'material',
      description: '',
      quantity: 1,
      unit: 'each',
      unit_price: 0,
      total: 0,
    };
    onItemsChange([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<LineItem>) => {
    onItemsChange(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updates };
          updatedItem.total = updatedItem.quantity * updatedItem.unit_price;
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const markupAmount = subtotal * (markup / 100);
  const subtotalWithMarkup = subtotal + markupAmount;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Line Items</h2>
        <p className="text-sm text-gray-500">
          Add materials and labor to your estimate
        </p>
      </div>

      {/* Add buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => setShowMaterialSearch(!showMaterialSearch)}
        >
          <Package className="w-4 h-4 mr-2" />
          Add Material
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showMaterialSearch ? 'rotate-180' : ''}`} />
        </Button>
        <Button variant="outline" onClick={addLabor}>
          <Clock className="w-4 h-4 mr-2" />
          Add Labor
        </Button>
        <Button variant="ghost" onClick={addCustomItem}>
          <Plus className="w-4 h-4 mr-2" />
          Custom Item
        </Button>
      </div>

      {/* Material search dropdown */}
      {showMaterialSearch && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={materialSearch}
                onChange={(e) => setMaterialSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                autoFocus
              />
            </div>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value as Trade | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Trades</option>
              {Object.entries(tradeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="max-h-64 overflow-y-auto divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
            {filteredMaterials.slice(0, 20).map((material, index) => (
              <button
                key={index}
                onClick={() => addMaterial(material)}
                className="w-full p-3 text-left hover:bg-primary-50 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {material.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {tradeLabels[material.trade]} - {material.unit}
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(material.default_price)}
                </span>
              </button>
            ))}
            {filteredMaterials.length === 0 && (
              <p className="p-4 text-sm text-gray-500 text-center">
                No materials found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Line items table */}
      {items.length > 0 ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Unit Price</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>

          {/* Items */}
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 px-4 py-3 items-center"
              >
                <div className="col-span-5">
                  <div className="flex items-center gap-2">
                    {item.type === 'labor' ? (
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    ) : (
                      <Package className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    )}
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, { description: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Item description"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, { quantity: Number(e.target.value) })
                      }
                      className="w-16 px-2 py-1 border border-gray-200 rounded text-sm text-right focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      min="0"
                      step="0.01"
                    />
                    <span className="text-xs text-gray-500">{item.unit}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      value={item.unit_price}
                      onChange={(e) =>
                        updateItem(item.id, { unit_price: Number(e.target.value) })
                      }
                      className="w-full pl-6 pr-2 py-1 border border-gray-200 rounded text-sm text-right focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-medium text-gray-900">
                    {formatCurrency(item.total)}
                  </span>
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Markup ({markup}%)</span>
              <span className="text-gray-900">{formatCurrency(markupAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
              <span className="text-gray-900">Pre-tax Total</span>
              <span className="text-gray-900">
                {formatCurrency(subtotalWithMarkup)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-lg">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No items added yet</p>
          <p className="text-sm text-gray-400">
            Add materials and labor to build your estimate
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={items.length === 0}>
          Review Estimate
        </Button>
      </div>
    </div>
  );
}
