
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface TrainInfo {
  trainNumber: string;
  coach: string;
  seat: string;
  station: string;
  deliveryTime: string;
}

interface DeliveryFormProps {
  trainInfo: TrainInfo;
  setTrainInfo: React.Dispatch<React.SetStateAction<TrainInfo>>;
  stations: { value: string; label: string }[];
  deliveryTimes: Record<string, string>;
  handleStationChange: (value: string) => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  trainInfo,
  setTrainInfo,
  stations,
  deliveryTimes,
  handleStationChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Train Number</label>
            <Input 
              placeholder="e.g. 12345" 
              value={trainInfo.trainNumber}
              onChange={(e) => setTrainInfo({...trainInfo, trainNumber: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
            <Input 
              placeholder="e.g. B1" 
              value={trainInfo.coach}
              onChange={(e) => setTrainInfo({...trainInfo, coach: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seat Number</label>
            <Input 
              placeholder="e.g. 42" 
              value={trainInfo.seat}
              onChange={(e) => setTrainInfo({...trainInfo, seat: e.target.value})}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Station</label>
          <Select
            value={trainInfo.station}
            onValueChange={handleStationChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a station" />
            </SelectTrigger>
            <SelectContent>
              {stations.map((station) => (
                <SelectItem key={station.value} value={station.value}>
                  {station.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2 flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <span>Estimated delivery time:</span>
            <Badge className="ml-2 bg-green-600">{trainInfo.deliveryTime}</Badge>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
