import { Trade } from './database.types';

export interface MaterialData {
  name: string;
  unit: string;
  default_price: number;
  trade: Trade;
}

export const hvacMaterials: MaterialData[] = [
  { name: 'Copper Tubing 3/8"', unit: 'ft', default_price: 3.25, trade: 'hvac' },
  { name: 'Copper Tubing 1/2"', unit: 'ft', default_price: 4.50, trade: 'hvac' },
  { name: 'Copper Tubing 3/4"', unit: 'ft', default_price: 6.75, trade: 'hvac' },
  { name: 'Copper Tubing 1"', unit: 'ft', default_price: 9.00, trade: 'hvac' },
  { name: 'Refrigerant R410A', unit: 'lb', default_price: 45.00, trade: 'hvac' },
  { name: 'Refrigerant R22', unit: 'lb', default_price: 85.00, trade: 'hvac' },
  { name: 'Condensing Unit 2 Ton', unit: 'each', default_price: 2200.00, trade: 'hvac' },
  { name: 'Condensing Unit 3 Ton', unit: 'each', default_price: 2800.00, trade: 'hvac' },
  { name: 'Condensing Unit 4 Ton', unit: 'each', default_price: 3400.00, trade: 'hvac' },
  { name: 'Condensing Unit 5 Ton', unit: 'each', default_price: 4200.00, trade: 'hvac' },
  { name: 'Air Handler 2 Ton', unit: 'each', default_price: 1800.00, trade: 'hvac' },
  { name: 'Air Handler 3 Ton', unit: 'each', default_price: 2200.00, trade: 'hvac' },
  { name: 'Air Handler 4 Ton', unit: 'each', default_price: 2600.00, trade: 'hvac' },
  { name: 'Air Handler 5 Ton', unit: 'each', default_price: 3200.00, trade: 'hvac' },
  { name: 'Programmable Thermostat', unit: 'each', default_price: 125.00, trade: 'hvac' },
  { name: 'Smart Thermostat', unit: 'each', default_price: 275.00, trade: 'hvac' },
  { name: 'Ductwork - Flex 6"', unit: 'ft', default_price: 4.50, trade: 'hvac' },
  { name: 'Ductwork - Flex 8"', unit: 'ft', default_price: 6.00, trade: 'hvac' },
  { name: 'Ductwork - Flex 10"', unit: 'ft', default_price: 7.50, trade: 'hvac' },
  { name: 'Ductwork - Sheet Metal', unit: 'ft', default_price: 12.00, trade: 'hvac' },
  { name: 'Supply Register 6x10', unit: 'each', default_price: 18.00, trade: 'hvac' },
  { name: 'Return Grille 20x20', unit: 'each', default_price: 35.00, trade: 'hvac' },
  { name: 'Air Filter 20x20x1', unit: 'each', default_price: 8.00, trade: 'hvac' },
  { name: 'Condensate Pump', unit: 'each', default_price: 85.00, trade: 'hvac' },
  { name: 'Drain Pan', unit: 'each', default_price: 45.00, trade: 'hvac' },
  { name: 'Line Set 25ft', unit: 'each', default_price: 175.00, trade: 'hvac' },
  { name: 'Line Set 50ft', unit: 'each', default_price: 325.00, trade: 'hvac' },
  { name: 'Disconnect Box', unit: 'each', default_price: 65.00, trade: 'hvac' },
  { name: 'Condenser Pad', unit: 'each', default_price: 45.00, trade: 'hvac' },
  { name: 'Mini Split 12000 BTU', unit: 'each', default_price: 1200.00, trade: 'hvac' },
  { name: 'Mini Split 18000 BTU', unit: 'each', default_price: 1600.00, trade: 'hvac' },
  { name: 'Mini Split 24000 BTU', unit: 'each', default_price: 2000.00, trade: 'hvac' },
];

export const plumbingMaterials: MaterialData[] = [
  { name: 'PVC Pipe 1/2"', unit: 'ft', default_price: 0.75, trade: 'plumbing' },
  { name: 'PVC Pipe 3/4"', unit: 'ft', default_price: 1.00, trade: 'plumbing' },
  { name: 'PVC Pipe 1"', unit: 'ft', default_price: 1.50, trade: 'plumbing' },
  { name: 'PVC Pipe 2"', unit: 'ft', default_price: 2.50, trade: 'plumbing' },
  { name: 'PVC Pipe 3"', unit: 'ft', default_price: 4.00, trade: 'plumbing' },
  { name: 'PVC Pipe 4"', unit: 'ft', default_price: 6.00, trade: 'plumbing' },
  { name: 'Copper Pipe 1/2"', unit: 'ft', default_price: 4.50, trade: 'plumbing' },
  { name: 'Copper Pipe 3/4"', unit: 'ft', default_price: 6.75, trade: 'plumbing' },
  { name: 'Copper Pipe 1"', unit: 'ft', default_price: 9.50, trade: 'plumbing' },
  { name: 'PEX Pipe 1/2"', unit: 'ft', default_price: 0.85, trade: 'plumbing' },
  { name: 'PEX Pipe 3/4"', unit: 'ft', default_price: 1.25, trade: 'plumbing' },
  { name: 'PEX Pipe 1"', unit: 'ft', default_price: 2.00, trade: 'plumbing' },
  { name: 'Water Heater 40 Gal Gas', unit: 'each', default_price: 850.00, trade: 'plumbing' },
  { name: 'Water Heater 50 Gal Gas', unit: 'each', default_price: 950.00, trade: 'plumbing' },
  { name: 'Water Heater 40 Gal Electric', unit: 'each', default_price: 650.00, trade: 'plumbing' },
  { name: 'Water Heater 50 Gal Electric', unit: 'each', default_price: 750.00, trade: 'plumbing' },
  { name: 'Tankless Water Heater Gas', unit: 'each', default_price: 1800.00, trade: 'plumbing' },
  { name: 'Tankless Water Heater Electric', unit: 'each', default_price: 1200.00, trade: 'plumbing' },
  { name: 'Toilet Standard', unit: 'each', default_price: 225.00, trade: 'plumbing' },
  { name: 'Toilet High Efficiency', unit: 'each', default_price: 375.00, trade: 'plumbing' },
  { name: 'Kitchen Faucet Standard', unit: 'each', default_price: 125.00, trade: 'plumbing' },
  { name: 'Kitchen Faucet Premium', unit: 'each', default_price: 275.00, trade: 'plumbing' },
  { name: 'Bathroom Faucet', unit: 'each', default_price: 85.00, trade: 'plumbing' },
  { name: 'Shut-off Valve 1/2"', unit: 'each', default_price: 12.00, trade: 'plumbing' },
  { name: 'Shut-off Valve 3/4"', unit: 'each', default_price: 18.00, trade: 'plumbing' },
  { name: 'Ball Valve 1/2"', unit: 'each', default_price: 15.00, trade: 'plumbing' },
  { name: 'Ball Valve 3/4"', unit: 'each', default_price: 22.00, trade: 'plumbing' },
  { name: 'Garbage Disposal 1/2 HP', unit: 'each', default_price: 175.00, trade: 'plumbing' },
  { name: 'Garbage Disposal 3/4 HP', unit: 'each', default_price: 275.00, trade: 'plumbing' },
  { name: 'Sump Pump 1/3 HP', unit: 'each', default_price: 185.00, trade: 'plumbing' },
  { name: 'Sump Pump 1/2 HP', unit: 'each', default_price: 275.00, trade: 'plumbing' },
  { name: 'Kitchen Sink Stainless', unit: 'each', default_price: 225.00, trade: 'plumbing' },
  { name: 'Bathroom Sink', unit: 'each', default_price: 125.00, trade: 'plumbing' },
  { name: 'Shower Valve', unit: 'each', default_price: 185.00, trade: 'plumbing' },
  { name: 'Bathtub Drain Assembly', unit: 'each', default_price: 65.00, trade: 'plumbing' },
  { name: 'P-Trap', unit: 'each', default_price: 12.00, trade: 'plumbing' },
  { name: 'Wax Ring', unit: 'each', default_price: 8.00, trade: 'plumbing' },
  { name: 'Supply Line Braided', unit: 'each', default_price: 12.00, trade: 'plumbing' },
];

export const electricalMaterials: MaterialData[] = [
  { name: 'Romex 14/2', unit: 'ft', default_price: 0.65, trade: 'electrical' },
  { name: 'Romex 12/2', unit: 'ft', default_price: 0.85, trade: 'electrical' },
  { name: 'Romex 10/2', unit: 'ft', default_price: 1.25, trade: 'electrical' },
  { name: 'Romex 10/3', unit: 'ft', default_price: 1.75, trade: 'electrical' },
  { name: 'Romex 8/3', unit: 'ft', default_price: 2.50, trade: 'electrical' },
  { name: 'Romex 6/3', unit: 'ft', default_price: 3.50, trade: 'electrical' },
  { name: 'THHN Wire 12 AWG', unit: 'ft', default_price: 0.35, trade: 'electrical' },
  { name: 'THHN Wire 10 AWG', unit: 'ft', default_price: 0.55, trade: 'electrical' },
  { name: 'THHN Wire 8 AWG', unit: 'ft', default_price: 0.85, trade: 'electrical' },
  { name: 'EMT Conduit 1/2"', unit: 'ft', default_price: 1.25, trade: 'electrical' },
  { name: 'EMT Conduit 3/4"', unit: 'ft', default_price: 1.75, trade: 'electrical' },
  { name: 'EMT Conduit 1"', unit: 'ft', default_price: 2.50, trade: 'electrical' },
  { name: 'Duplex Outlet 15A', unit: 'each', default_price: 3.50, trade: 'electrical' },
  { name: 'Duplex Outlet 20A', unit: 'each', default_price: 5.00, trade: 'electrical' },
  { name: 'GFCI Outlet 15A', unit: 'each', default_price: 18.00, trade: 'electrical' },
  { name: 'GFCI Outlet 20A', unit: 'each', default_price: 22.00, trade: 'electrical' },
  { name: 'USB Outlet', unit: 'each', default_price: 25.00, trade: 'electrical' },
  { name: 'Single Pole Switch', unit: 'each', default_price: 3.00, trade: 'electrical' },
  { name: '3-Way Switch', unit: 'each', default_price: 5.50, trade: 'electrical' },
  { name: 'Dimmer Switch', unit: 'each', default_price: 18.00, trade: 'electrical' },
  { name: 'Smart Switch', unit: 'each', default_price: 45.00, trade: 'electrical' },
  { name: 'Breaker 15A', unit: 'each', default_price: 8.00, trade: 'electrical' },
  { name: 'Breaker 20A', unit: 'each', default_price: 10.00, trade: 'electrical' },
  { name: 'Breaker 30A', unit: 'each', default_price: 15.00, trade: 'electrical' },
  { name: 'Breaker 50A', unit: 'each', default_price: 25.00, trade: 'electrical' },
  { name: 'GFCI Breaker 15A', unit: 'each', default_price: 45.00, trade: 'electrical' },
  { name: 'AFCI Breaker 15A', unit: 'each', default_price: 48.00, trade: 'electrical' },
  { name: 'Panel 100A', unit: 'each', default_price: 275.00, trade: 'electrical' },
  { name: 'Panel 200A', unit: 'each', default_price: 450.00, trade: 'electrical' },
  { name: 'Panel Upgrade 200A', unit: 'each', default_price: 850.00, trade: 'electrical' },
  { name: 'Ceiling Light Fixture', unit: 'each', default_price: 45.00, trade: 'electrical' },
  { name: 'Recessed Light 6"', unit: 'each', default_price: 35.00, trade: 'electrical' },
  { name: 'Recessed Light 4"', unit: 'each', default_price: 28.00, trade: 'electrical' },
  { name: 'Ceiling Fan Standard', unit: 'each', default_price: 125.00, trade: 'electrical' },
  { name: 'Ceiling Fan w/ Light', unit: 'each', default_price: 185.00, trade: 'electrical' },
  { name: 'Junction Box', unit: 'each', default_price: 3.50, trade: 'electrical' },
  { name: 'Outlet Box', unit: 'each', default_price: 2.00, trade: 'electrical' },
  { name: 'Wire Nuts (bag)', unit: 'each', default_price: 8.00, trade: 'electrical' },
  { name: 'Smoke Detector', unit: 'each', default_price: 25.00, trade: 'electrical' },
  { name: 'CO Detector', unit: 'each', default_price: 35.00, trade: 'electrical' },
];

export const roofingMaterials: MaterialData[] = [
  { name: '3-Tab Shingles', unit: 'square', default_price: 95.00, trade: 'roofing' },
  { name: 'Architectural Shingles', unit: 'square', default_price: 135.00, trade: 'roofing' },
  { name: 'Premium Architectural Shingles', unit: 'square', default_price: 185.00, trade: 'roofing' },
  { name: 'Metal Roofing Standing Seam', unit: 'square', default_price: 450.00, trade: 'roofing' },
  { name: 'Metal Roofing Corrugated', unit: 'square', default_price: 275.00, trade: 'roofing' },
  { name: 'Clay Tiles', unit: 'square', default_price: 650.00, trade: 'roofing' },
  { name: 'Concrete Tiles', unit: 'square', default_price: 425.00, trade: 'roofing' },
  { name: 'Synthetic Underlayment', unit: 'roll', default_price: 125.00, trade: 'roofing' },
  { name: 'Felt Underlayment 15#', unit: 'roll', default_price: 35.00, trade: 'roofing' },
  { name: 'Felt Underlayment 30#', unit: 'roll', default_price: 45.00, trade: 'roofing' },
  { name: 'Ice & Water Shield', unit: 'roll', default_price: 145.00, trade: 'roofing' },
  { name: 'Drip Edge', unit: 'ft', default_price: 1.25, trade: 'roofing' },
  { name: 'Flashing - Aluminum', unit: 'ft', default_price: 2.50, trade: 'roofing' },
  { name: 'Flashing - Lead', unit: 'ft', default_price: 4.50, trade: 'roofing' },
  { name: 'Step Flashing', unit: 'each', default_price: 1.50, trade: 'roofing' },
  { name: 'Ridge Vent', unit: 'ft', default_price: 4.00, trade: 'roofing' },
  { name: 'Ridge Cap Shingles', unit: 'bundle', default_price: 65.00, trade: 'roofing' },
  { name: 'Roof Vent - Box', unit: 'each', default_price: 35.00, trade: 'roofing' },
  { name: 'Roof Vent - Turbine', unit: 'each', default_price: 55.00, trade: 'roofing' },
  { name: 'Plumbing Boot', unit: 'each', default_price: 18.00, trade: 'roofing' },
  { name: 'Pipe Collar', unit: 'each', default_price: 12.00, trade: 'roofing' },
  { name: 'Roofing Nails (box)', unit: 'box', default_price: 45.00, trade: 'roofing' },
  { name: 'Roofing Cement', unit: 'gallon', default_price: 18.00, trade: 'roofing' },
  { name: 'Roofing Tar', unit: 'bucket', default_price: 35.00, trade: 'roofing' },
  { name: 'Skylight 22x46', unit: 'each', default_price: 425.00, trade: 'roofing' },
  { name: 'Skylight 30x46', unit: 'each', default_price: 525.00, trade: 'roofing' },
  { name: 'Gutter - Aluminum 5"', unit: 'ft', default_price: 6.50, trade: 'roofing' },
  { name: 'Gutter - Aluminum 6"', unit: 'ft', default_price: 8.00, trade: 'roofing' },
  { name: 'Downspout', unit: 'ft', default_price: 4.50, trade: 'roofing' },
  { name: 'Gutter Guards', unit: 'ft', default_price: 3.50, trade: 'roofing' },
  { name: 'Fascia Board', unit: 'ft', default_price: 5.00, trade: 'roofing' },
  { name: 'Soffit Panel', unit: 'sqft', default_price: 4.00, trade: 'roofing' },
  { name: 'OSB Sheathing 7/16"', unit: 'sheet', default_price: 28.00, trade: 'roofing' },
  { name: 'Plywood Sheathing 1/2"', unit: 'sheet', default_price: 42.00, trade: 'roofing' },
];

export const allMaterials: MaterialData[] = [
  ...hvacMaterials,
  ...plumbingMaterials,
  ...electricalMaterials,
  ...roofingMaterials,
];

export const getMaterialsByTrade = (trade: Trade): MaterialData[] => {
  switch (trade) {
    case 'hvac':
      return hvacMaterials;
    case 'plumbing':
      return plumbingMaterials;
    case 'electrical':
      return electricalMaterials;
    case 'roofing':
      return roofingMaterials;
    default:
      return allMaterials;
  }
};

export const tradeColors: Record<Trade, { light: string; default: string; dark: string }> = {
  hvac: { light: '#60a5fa', default: '#2563eb', dark: '#1d4ed8' },
  plumbing: { light: '#34d399', default: '#059669', dark: '#047857' },
  electrical: { light: '#fbbf24', default: '#d97706', dark: '#b45309' },
  roofing: { light: '#a78bfa', default: '#7c3aed', dark: '#6d28d9' },
};

export const tradeLabels: Record<Trade, string> = {
  hvac: 'HVAC',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  roofing: 'Roofing',
};
