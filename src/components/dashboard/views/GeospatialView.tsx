
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Navigation, Layers, Filter, 
  Play, Pause, RotateCcw, Download 
} from 'lucide-react';

export const GeospatialView = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState('towers');

  const towers = [
    { id: 'T001', name: 'Central Tower', lat: 17.3850, lng: 78.4867, activity: 'high', calls: 245 },
    { id: 'T002', name: 'North Tower', lat: 17.4126, lng: 78.4777, activity: 'medium', calls: 180 },
    { id: 'T003', name: 'South Tower', lat: 17.3616, lng: 78.4747, activity: 'high', calls: 320 },
    { id: 'T004', name: 'East Tower', lat: 17.3850, lng: 78.5126, activity: 'low', calls: 85 },
    { id: 'T005', name: 'West Tower', lat: 17.3850, lng: 78.4517, activity: 'medium', calls: 156 },
  ];

  const suspectMovements = [
    { time: '09:00', location: 'Central Tower', status: 'active' },
    { time: '09:15', location: 'North Tower', status: 'transit' },
    { time: '09:30', location: 'East Tower', status: 'active' },
    { time: '09:45', location: 'Central Tower', status: 'active' },
  ];

  const layers = [
    { id: 'towers', name: 'Cell Towers', active: true, count: 5 },
    { id: 'movements', name: 'Suspect Paths', active: false, count: 3 },
    { id: 'hotspots', name: 'Activity Hotspots', active: false, count: 12 },
    { id: 'boundaries', name: 'Jurisdictions', active: false, count: 8 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <Card className="lg:col-span-3 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Geospatial Analysis - Hyderabad Region</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for interactive map */}
            <div className="h-96 bg-slate-700 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Interactive Map View</h3>
                  <p className="text-slate-400">Geospatial visualization with tower locations and suspect movement patterns</p>
                </div>
              </div>

              {/* Simulated map markers */}
              <div className="absolute top-4 left-4 space-y-2">
                {towers.slice(0, 3).map((tower, index) => (
                  <div 
                    key={tower.id}
                    className={`w-3 h-3 rounded-full ${
                      tower.activity === 'high' ? 'bg-red-400' :
                      tower.activity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    } animate-pulse`}
                    style={{
                      marginLeft: `${index * 20}px`,
                      marginTop: `${index * 15}px`
                    }}
                  />
                ))}
              </div>

              {/* Timeline scrubber */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-800/80 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm text-white mb-2">
                    <span>Timeline: 09:00 - 18:00</span>
                    <span>Current: 12:45</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Panel */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Layers className="h-5 w-5" />
              <span>Map Layers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={layer.active}
                    onChange={() => setSelectedLayer(layer.id)}
                    className="rounded"
                  />
                  <span className="text-sm text-white">{layer.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {layer.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tower Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Navigation className="h-5 w-5" />
              <span>Tower Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {towers.map((tower) => (
                <div key={tower.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                  <div>
                    <h4 className="text-white font-medium">{tower.name}</h4>
                    <p className="text-sm text-slate-400">{tower.id} • {tower.calls} calls</p>
                  </div>
                  <Badge variant={
                    tower.activity === 'high' ? 'destructive' :
                    tower.activity === 'medium' ? 'default' : 'secondary'
                  }>
                    {tower.activity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suspect Movement */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Suspect Movement Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suspectMovements.map((movement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50">
                  <div className={`w-3 h-3 rounded-full ${
                    movement.status === 'active' ? 'bg-red-400' : 'bg-yellow-400'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{movement.time}</span>
                      <Badge variant={movement.status === 'active' ? 'destructive' : 'secondary'}>
                        {movement.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{movement.location}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-600">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Generate Movement Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
