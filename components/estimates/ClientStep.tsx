'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, User, MapPin, Phone, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Client, ClientInsert } from '@/lib/database.types';
import { Input, Button } from '@/components/ui';

interface ClientStepProps {
  selectedClient: Client | null;
  jobAddress: string;
  onClientSelect: (client: Client | null) => void;
  onJobAddressChange: (address: string) => void;
  onNext: () => void;
}

export function ClientStep({
  selectedClient,
  jobAddress,
  onClientSelect,
  onJobAddressChange,
  onNext,
}: ClientStepProps) {
  const supabase = createClient();
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('name', { ascending: true });
    setClients(data || []);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email?.toLowerCase().includes(search.toLowerCase()) ||
      client.phone?.includes(search)
  );

  const handleCreateClient = async () => {
    if (!newClient.name) return;
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const clientData: ClientInsert = {
      user_id: user.id,
      name: newClient.name,
      email: newClient.email || null,
      phone: newClient.phone || null,
      address: newClient.address || null,
    };
    // Type assertion needed due to Supabase client generic inference
    const { data, error } = await supabase
      .from('clients')
      .insert(clientData as never)
      .select()
      .single();

    if (!error && data) {
      setClients([...clients, data]);
      onClientSelect(data);
      if (!jobAddress && newClient.address) {
        onJobAddressChange(newClient.address);
      }
      setIsCreatingNew(false);
      setNewClient({ name: '', email: '', phone: '', address: '' });
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Client Information
        </h2>
        <p className="text-sm text-gray-500">
          Select an existing client or create a new one
        </p>
      </div>

      {/* Selected client display */}
      {selectedClient && !isCreatingNew && (
        <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedClient.name}</p>
                {selectedClient.email && (
                  <p className="text-sm text-gray-600">{selectedClient.email}</p>
                )}
                {selectedClient.phone && (
                  <p className="text-sm text-gray-600">{selectedClient.phone}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => onClientSelect(null)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Client search/selection */}
      {!selectedClient && !isCreatingNew && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {filteredClients.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">No clients found</p>
                <Button
                  variant="outline"
                  onClick={() => setIsCreatingNew(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Client
                </Button>
              </div>
            ) : (
              <>
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => {
                      onClientSelect(client);
                      if (!jobAddress && client.address) {
                        onJobAddressChange(client.address);
                      }
                    }}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500">
                          {client.email || client.phone || 'No contact info'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>

          {filteredClients.length > 0 && (
            <button
              onClick={() => setIsCreatingNew(true)}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add New Client
            </button>
          )}
        </>
      )}

      {/* New client form */}
      {isCreatingNew && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">New Client</h3>
            <button
              onClick={() => setIsCreatingNew(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Client Name *"
              value={newClient.name}
              onChange={(e) =>
                setNewClient({ ...newClient, name: e.target.value })
              }
              placeholder="John Smith"
            />
            <Input
              label="Email"
              type="email"
              value={newClient.email}
              onChange={(e) =>
                setNewClient({ ...newClient, email: e.target.value })
              }
              placeholder="john@example.com"
            />
            <Input
              label="Phone"
              type="tel"
              value={newClient.phone}
              onChange={(e) =>
                setNewClient({ ...newClient, phone: e.target.value })
              }
              placeholder="(555) 123-4567"
            />
            <Input
              label="Address"
              value={newClient.address}
              onChange={(e) =>
                setNewClient({ ...newClient, address: e.target.value })
              }
              placeholder="123 Main St, City, State"
            />
          </div>

          <Button
            onClick={handleCreateClient}
            isLoading={isLoading}
            disabled={!newClient.name}
          >
            Create Client
          </Button>
        </div>
      )}

      {/* Job site address */}
      {selectedClient && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h3 className="font-medium text-gray-900">Job Site Address</h3>
          </div>
          <Input
            value={jobAddress}
            onChange={(e) => onJobAddressChange(e.target.value)}
            placeholder="Enter job site address (if different from client address)"
            helperText="Leave blank if same as client address"
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button onClick={onNext} disabled={!selectedClient}>
          Continue to Line Items
        </Button>
      </div>
    </div>
  );
}
