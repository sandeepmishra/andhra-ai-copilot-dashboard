
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, PieChart, TrendingUp, MapPin, 
  Clock, Download, Maximize2, Settings 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line } from 'recharts';

export const VisualizationHub = () => {
  const [selectedChart, setSelectedChart] = useState('calls');

  const callData = [
    { time: '00:00', calls: 120 },
    { time: '04:00', calls: 45 },
    { time: '08:00', calls: 380 },
    { time: '12:00', calls: 520 },
    { time: '16:00', calls: 445 },
    { time: '20:00', calls: 380 },
  ];

  const anomalyData = [
    { name: 'Normal', value: 85, color: '#10B981' },
    { name: 'Suspicious', value: 12, color: '#F59E0B' },
    { name: 'Flagged', value: 3, color: '#EF4444' }
  ];

  const towerData = [
    { tower: 'T001', activity: 245 },
    { tower: 'T002', activity: 180 },
    { tower: 'T003', activity: 320 },
    { tower: 'T004', activity: 156 },
    { tower: 'T005', activity: 290 },
  ];

  const charts = [
    { id: 'calls', name: 'Call Patterns', icon: BarChart3, active: true },
    { id: 'anomalies', name: 'Anomaly Detection', icon: PieChart, active: false },
    { id: 'towers', name: 'Tower Activity', icon: MapPin, active: false },
    { id: 'timeline', name: 'Timeline View', icon: Clock, active: false },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Chart Selection */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Data Visualization Hub</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {charts.map((chart) => (
              <Button
                key={chart.id}
                onClick={() => setSelectedChart(chart.id)}
                variant={selectedChart === chart.id ? "default" : "outline"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <chart.icon className="h-4 w-4" />
                <span>{chart.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Call Pattern Analysis - Last 24 Hours</span>
              <div className="flex space-x-2">
                <Badge variant="secondary">Live Data</Badge>
                <Button size="sm" variant="ghost">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="calls" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Anomaly Detection */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Anomaly Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart data={anomalyData} cx="50%" cy="50%" outerRadius={60}>
                    {anomalyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {anomalyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-sm text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tower Activity & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Tower Activity Heatmap</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={towerData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="tower" type="category" stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="activity" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Trend Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={callData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="calls" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Export & Share</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              PNG Image
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              CSV Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              PDF Report
            </Button>
            <Button variant="outline" size="sm">
              Embed Link
            </Button>
            <Button variant="outline" size="sm">
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
