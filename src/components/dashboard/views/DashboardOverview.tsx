
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, Phone, MapPin, AlertTriangle, 
  TrendingUp, Clock, Users, Database 
} from 'lucide-react';

export const DashboardOverview = () => {
  const stats = [
    { label: 'Active Cases', value: '24', icon: FileText, color: 'text-blue-400' },
    { label: 'CDR Records', value: '125K', icon: Phone, color: 'text-green-400' },
    { label: 'Tower Locations', value: '1,247', icon: MapPin, color: 'text-purple-400' },
    { label: 'Anomalies Detected', value: '18', icon: AlertTriangle, color: 'text-red-400' },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Anomaly detected in IPDR_003.pdf',
      time: '12:45 PM',
      type: 'alert',
      details: '4-hour continuous session flagged'
    },
    {
      id: 2,
      action: 'CDR analysis completed for Case #2024-001',
      time: '11:30 AM',
      type: 'success',
      details: 'Suspect movement pattern identified'
    },
    {
      id: 3,
      action: 'New dataset uploaded: FIR_batch_07.xlsx',
      time: '10:15 AM',
      type: 'info',
      details: '245 records processed successfully'
    },
    {
      id: 4,
      action: 'Geospatial heatmap generated',
      time: '09:45 AM',
      type: 'success',
      details: 'Tower activity visualization ready'
    },
  ];

  const quickActions = [
    { label: 'Track Suspect Movement', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Detect Anomalies', color: 'bg-red-600 hover:bg-red-700' },
    { label: 'Merge FIR + CDR', color: 'bg-green-600 hover:bg-green-700' },
    { label: 'Generate Timeline', color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                className={`w-full justify-start ${action.color} text-white`}
                variant="default"
              >
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'alert' ? 'bg-red-400' :
                    activity.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-sm text-slate-400 mt-1">{activity.details}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">{activity.time}</span>
                      <Badge variant={
                        activity.type === 'alert' ? 'destructive' :
                        activity.type === 'success' ? 'default' : 'secondary'
                      }>
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Datasets */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Active Datasets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'CDR_Data_2024.csv', type: 'CDR', records: '45,231', level: 3 },
              { name: 'IPDR_Session_Log.xlsx', type: 'IPDR', records: '12,567', level: 2 },
              { name: 'FIR_Reports_Q1.pdf', type: 'FIR', records: '1,024', level: 1 },
            ].map((dataset, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium truncate">{dataset.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    Level {dataset.level}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400">Type: {dataset.type}</p>
                <p className="text-sm text-slate-400">Records: {dataset.records}</p>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Analyze
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
