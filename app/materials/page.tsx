'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout';
import { Button, Input, Badge, Modal, ModalFooter } from '@/components/ui';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Material, Trade } from '@/lib/database.types';
import {
  allMaterials,
  tradeLabels,
  MaterialData,
} from '@/lib/materials-data';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

export default function MaterialsPage() {
  const supabase = createClient();
  const toast = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [search, setSearch] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<Trade | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    unit: 'each',
    default_price: 0,
    trade: 'hvac' as Trade,
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data } = await supabase
      .from('materials')
      .select('*')
      .order('name', { ascending: true });
    setMaterials(data || []);
    setIsLoading(false);
  };

  const handleAddMaterial = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('materials').insert({
      user_id: user.id,
      name: newMaterial.name,
      unit: newMaterial.unit,
      default_price: newMaterial.default_price,
      trade: newMaterial.trade,
      is_custom: true,
    } as any);

    if (!error) {
      toast.success('Material added');
      fetchMaterials();
      setShowAddModal(false);
      setNewMaterial({ name: '', unit: 'each', default_price: 0, trade: 'hvac' });
    } else {
      toast.error('Failed to add material');
    }
  };

  // Combine custom materials with pre-loaded ones
  const combinedMaterials: (Material | MaterialData)[] = [
    ...materials,
    ...allMaterials.filter(
      (m) => !materials.some((cm) => cm.name === m.name && cm.trade === m.trade)
    ),
  ];

  const filteredMaterials = combinedMaterials.filter((m) => {
    const matchesSearch = m.name?.toLowerCase().includes(search.toLowerCase());
    const matchesTrade = selectedTrade === 'all' || m.trade === selectedTrade;
    return matchesSearch && matchesTrade;
  });

  const getTradeColor = (trade: Trade | null) => {
    switch (trade) {
      case 'hvac':
        return 'bg-blue-100 text-blue-800';
      case 'plumbing':
        return 'bg-emerald-100 text-emerald-800';
      case 'electrical':
        return 'bg-amber-100 text-amber-800';
      case 'roofing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout title="Materials Database">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Materials Database
            </h1>
            <p className="text-gray-500">
              {filteredMaterials.length} materials available
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Material
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedTrade('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTrade === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Trades
            </button>
            {Object.entries(tradeLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSelectedTrade(value as Trade)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTrade === value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Materials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((material, index) => {
            const isCustom = 'is_custom' in material && material.is_custom;
            return (
              <div
                key={`${material.name}-${index}`}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1">
                        {material.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        per {material.unit}
                      </p>
                    </div>
                  </div>
                  {isCustom && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                      Custom
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getTradeColor(
                      material.trade
                    )}`}
                  >
                    {material.trade ? tradeLabels[material.trade] : 'General'}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(material.default_price || 0)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No materials found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Add Material Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Custom Material"
      >
        <div className="space-y-4">
          <Input
            label="Material Name"
            value={newMaterial.name}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, name: e.target.value })
            }
            placeholder="e.g., Custom HVAC Filter"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={newMaterial.unit}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, unit: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="each">each</option>
                <option value="ft">ft</option>
                <option value="sqft">sqft</option>
                <option value="lb">lb</option>
                <option value="gallon">gallon</option>
                <option value="roll">roll</option>
                <option value="box">box</option>
                <option value="bundle">bundle</option>
                <option value="square">square</option>
                <option value="hours">hours</option>
              </select>
            </div>
            <Input
              label="Default Price"
              type="number"
              value={newMaterial.default_price}
              onChange={(e) =>
                setNewMaterial({
                  ...newMaterial,
                  default_price: Number(e.target.value),
                })
              }
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trade
            </label>
            <select
              value={newMaterial.trade}
              onChange={(e) =>
                setNewMaterial({
                  ...newMaterial,
                  trade: e.target.value as Trade,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Object.entries(tradeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddMaterial} disabled={!newMaterial.name}>
            Add Material
          </Button>
        </ModalFooter>
      </Modal>
    </AppLayout>
  );
}
